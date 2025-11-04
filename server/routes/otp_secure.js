const express = require("express");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

router.post("/send", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, error: "Email is required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.zoho.com',
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: false, // Use STARTTLS
        requireTLS: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        tls: {
            rejectUnauthorized: false,
            minVersion: 'TLSv1.2',
            maxVersion: 'TLSv1.3',
            ciphers: 'ECDHE-RSA-AES128-GCM-SHA256:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA'
        },
        pool: true, // Use connection pooling
        maxConnections: 1,
        maxMessages: 10,
        rateDelta: 1000,
        rateLimit: 5,
        connectionTimeout: 60000, // Increased timeout
        greetingTimeout: 30000,
        socketTimeout: 60000,
        dnsTimeout: 10000,
        debug: true,
        logger: true
    });

    const mailOptions = {
        from: `RCMJob <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Your OTP",
        text: `Your OTP is ${otp}`
    };

    try {
        console.log('Attempting to send OTP email to:', email);
        console.log('SMTP Config:', {
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === 'true',
            user: process.env.SMTP_USER ? '***configured***' : 'NOT SET'
        });

        await transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully to:', email);

        // Store hashed OTP in DB
        await User.findOneAndUpdate(
            { email },
            { otp: hashedOtp, otpExpires: Date.now() + 5 * 60 * 1000 }, // 5 minutes expiry
            { upsert: false } // Don't create new user if not exists
        );

        res.json({ success: true, message: "OTP sent to your email" });
    } catch (err) {
        console.error('SMTP Error Details:', {
            code: err.code,
            command: err.command,
            message: err.message,
            errno: err.errno,
            syscall: err.syscall
        });
        res.status(500).json({ success: false, error: "Failed to send OTP" });
    }
});

router.post("/verify", async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ success: false, error: "Email and OTP are required" });
    }

    try {
        const user = await User.findOne({ email, otpExpires: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ success: false, error: "Invalid or expired OTP" });
        }

        const isOtpValid = await bcrypt.compare(otp, user.otp);

        if (!isOtpValid) {
            return res.status(400).json({ success: false, error: "Invalid OTP" });
        }

        // Mark user as verified and clear OTP
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.json({ success: true, message: "OTP verified successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Failed to verify OTP" });
    }
});

module.exports = router;

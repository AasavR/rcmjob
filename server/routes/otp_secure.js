const express = require("express");
const nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail');
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

// SendGrid setup
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/send", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, error: "Email is required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    const transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587, // STARTTLS port
        secure: false, // Use STARTTLS
        auth: {
            user: 'apikey',
            pass: process.env.SENDGRID_API_KEY,
        },
        tls: {
            rejectUnauthorized: false,
        },
        connectionTimeout: 120000, // Increased to 2 minutes
        greetingTimeout: 60000,
        socketTimeout: 120000,
        dnsTimeout: 30000,
        debug: true,
        logger: true
    });

    const mailOptions = {
        from: 'hello@rcmjob.com',
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

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

    try {
        console.log('Attempting to send OTP email to:', email);

        await sgMail.send({
            to: email,
            from: 'hello@rcmjob.com',
            subject: 'Your OTP',
            text: `Your OTP is ${otp}`
        });

        console.log('OTP email sent successfully to:', email);

        // Store hashed OTP in DB
        await User.findOneAndUpdate(
            { email },
            { otp: hashedOtp, otpExpires: Date.now() + 5 * 60 * 1000 }, // 5 minutes expiry
            { upsert: false } // Don't create new user if not exists
        );

        res.json({ success: true, message: "OTP sent to your email" });
    } catch (err) {
        console.error('SendGrid Error Details:', err);
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

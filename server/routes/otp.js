const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/send", async (req, res) => {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000);

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

    const mailOptions = {
        from: `RCMJob <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Your OTP",
        text: `Your OTP is ${otp}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, otp });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Failed to send OTP" });
    }
});

module.exports = router;

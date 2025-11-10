const express = require("express");
const sgMail = require('@sendgrid/mail');
const router = express.Router();

// SendGrid setup
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/send", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, error: "Email is required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        console.log('Attempting to send OTP email to:', email);

        await sgMail.send({
            to: email,
            from: 'hello@rcmjob.com',
            subject: 'Your OTP',
            text: `Your OTP is ${otp}`
        });

        console.log('OTP email sent successfully to:', email);

        res.json({ success: true, message: "OTP sent to your email", otp });
    } catch (err) {
        console.error('SendGrid Error Details:', err);
        res.status(500).json({ success: false, error: "Failed to send OTP" });
    }
});

module.exports = router;

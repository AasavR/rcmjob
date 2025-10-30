const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const User = require('../models/User');

const router = express.Router();

// Twilio setup (replace with your credentials)
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Register
router.post('/register', async (req, res) => {
  const { username, name, email, phone, password, role, dob, experience, workflowPreference } = req.body;
  if (!username) {
    return res.status(400).json({ error: 'username is required' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, name, email, phone, password: hashedPassword, role, dob, experience, workflowPreference, coins: 0 });
    await user.save();

    // Award coins for registration
    user.coins += 10; // Registration bonus
    await user.save();

    // Send OTP after registration
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await User.findOneAndUpdate({ phone }, { otp, otpExpires: Date.now() + 10 * 60 * 1000 });
    await twilioClient.messages.create({
      body: `Your OTP for RCM Jobs registration is ${otp}`,
      from: process.env.TWILIO_PHONE,
      to: phone,
    });

    res.status(201).json({ message: 'User registered successfully. Please verify OTP.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    if (!user.isVerified) {
      if (!otp) {
        // Send OTP if not verified and no OTP provided
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        await User.findOneAndUpdate({ email }, { otp: newOtp, otpExpires: Date.now() + 10 * 60 * 1000 });
        await twilioClient.messages.create({
          body: `Your OTP for RCM Jobs login is ${newOtp}`,
          from: process.env.TWILIO_PHONE,
          to: user.phone,
        });
        return res.status(200).json({ message: 'OTP sent to your phone. Please verify to login.', requiresOtp: true });
      } else {
        // Verify OTP
        if (user.otp !== otp || user.otpExpires < Date.now()) {
          return res.status(400).json({ error: 'Invalid or expired OTP' });
        }
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();
      }
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Send OTP
router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  try {
    await User.findOneAndUpdate({ phone }, { otp, otpExpires: Date.now() + 10 * 60 * 1000 });
    await twilioClient.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE,
      to: phone,
    });
    res.json({ message: 'OTP sent' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;
  try {
    const user = await User.findOne({ phone, otp, otpExpires: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ error: 'Invalid OTP' });
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Return token for login after OTP verification
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ message: 'OTP verified', token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

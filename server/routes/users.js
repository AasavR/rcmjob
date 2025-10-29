const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer for profile picture uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `profile_${req.user.id}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files (jpeg, jpg, png) are allowed!'));
    }
  }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Upload profile picture
router.post('/profile-picture', auth, upload.single('profilePic'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Update user with profile picture path and add coins
    const user = await User.findById(req.user.id);
    user.profilePic = req.file.path;
    user.coins += 20; // Add 20 coins for profile picture upload
    user.profileScore = calculateProfileScore(user); // Recalculate profile score
    await user.save();

    res.json({
      message: 'Profile picture uploaded successfully! You earned 20 coins.',
      profilePic: req.file.path,
      coins: user.coins,
      profileScore: user.profileScore
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Calculate profile score based on coins and activities
function calculateProfileScore(user) {
  let score = 0;

  // Base score from coins (1 point per 10 coins)
  score += Math.floor(user.coins / 10);

  // Bonus for profile completion
  if (user.profilePic) score += 10;
  if (user.profile.resume) score += 15;
  if (user.isVerified) score += 5;

  // Quiz performance bonus
  const correctAnswers = user.quizAnswers.filter(answer => answer.isCorrect).length;
  score += correctAnswers * 2;

  // Experience level bonus
  if (user.experienceLevel === 'middle') score += 20;
  if (user.experienceLevel === 'senior') score += 40;

  return score;
}

// Get profile score
router.get('/profile-score', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const profileScore = calculateProfileScore(user);
    res.json({ profileScore });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

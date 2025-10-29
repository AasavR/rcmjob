const express = require('express');
const User = require('../models/User');
const Job = require('../models/Job');
const Resume = require('../models/Resume');
const auth = require('../middleware/auth');

const router = express.Router();

// Get dashboard stats
router.get('/stats', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });
  try {
    const totalUsers = await User.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalCandidates = await User.countDocuments({ role: 'candidate' });
    const totalEmployers = await User.countDocuments({ role: 'employer' });
    const totalResumes = await Resume.countDocuments();
    res.json({ totalUsers, totalJobs, totalCandidates, totalEmployers, totalResumes });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users with details
router.get('/users', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });
  try {
    const users = await User.find({}, '-password').populate('profile.resume');
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all resumes with details
router.get('/resumes', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });
  try {
    const resumes = await Resume.find().populate('user', 'name email');
    res.json(resumes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all jobs with details
router.get('/jobs', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });
  try {
    const jobs = await Job.find().populate('postedBy', 'name email');
    res.json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get quiz answers for a specific user (for recruiters)
router.get('/quiz-answers/:userId', auth, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'employer') return res.status(403).json({ error: 'Access denied' });
  try {
    const user = await User.findById(req.params.userId).select('name email quizAnswers rcmVerticalScores');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

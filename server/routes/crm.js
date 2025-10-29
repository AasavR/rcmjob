const express = require('express');
const User = require('../models/User');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all users (admin only)
router.get('/users', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all jobs with applicants (admin only)
router.get('/jobs', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });
  try {
    const jobs = await Job.find().populate('company applicants', 'name email');
    res.json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update user status
router.put('/users/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

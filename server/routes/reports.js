const express = require('express');
const User = require('../models/User');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user reports (candidates)
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const appliedJobs = await Job.find({ applicants: req.user.id });
    res.json({ user, appliedJobs });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get company reports (employers)
router.get('/company', auth, async (req, res) => {
  if (req.user.role !== 'employer') return res.status(403).json({ error: 'Access denied' });
  try {
    const jobs = await Job.find({ company: req.user.id }).populate('applicants', 'name email');
    res.json({ jobs });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

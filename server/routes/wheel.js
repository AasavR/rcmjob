const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// Spin the wheel
router.post('/spin', auth, async (req, res) => {
  // Simulate wheel spin
  const rewards = ['Job Match', 'Skill Boost', 'Networking Opportunity', 'Resume Review'];
  const reward = rewards[Math.floor(Math.random() * rewards.length)];
  res.json({ reward });
});

module.exports = router;

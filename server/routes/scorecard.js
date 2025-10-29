const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user scorecard
router.get('/', auth, async (req, res) => {
  // Calculate scorecard based on profile completeness, quiz results, etc.
  const scorecard = {
    profileCompleteness: 80,
    quizScore: 85,
    applicationSuccess: 70,
  };
  res.json(scorecard);
});

module.exports = router;

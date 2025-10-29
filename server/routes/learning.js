const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// Sample learning resources
const resources = [
  { id: 1, title: 'Resume Writing Tips', type: 'article', content: '...' },
  { id: 2, title: 'Interview Preparation', type: 'video', url: '...' },
];

// Get learning resources
router.get('/', auth, (req, res) => {
  res.json(resources);
});

module.exports = router;

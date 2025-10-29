const express = require('express');
const Job = require('../models/Job');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Create job (employers only)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'employer') return res.status(403).json({ error: 'Access denied' });
  const { title, description, location, salary, requirements } = req.body;
  try {
    const job = new Job({
      title,
      description,
      company: req.user.id,
      postedBy: req.user.id,
      location,
      salary,
      requirements
    });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('company', 'name');
    res.json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Apply for job
router.post('/:id/apply', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job.applicants.includes(req.user.id)) {
      job.applicants.push(req.user.id);
      await job.save();

      // Award coins for job application (for unregistered users posting resume)
      const user = await User.findById(req.user.id);
      if (user && !user.isVerified) {
        user.coins += 25; // Reward for unregistered users posting resume on job
        user.profileScore = calculateProfileScore(user);
        await User.findByIdAndUpdate(req.user.id, { coins: user.coins, profileScore: user.profileScore });
      }
    }
    res.json({ message: 'Applied successfully' });
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

module.exports = router;

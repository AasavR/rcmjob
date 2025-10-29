const express = require('express');
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const Resume = require('../models/Resume');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// Function to parse resume and extract RCM vertical scores
async function parseResume(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    const text = data.text.toLowerCase();

    // Simple keyword-based scoring for RCM verticals
    const billingKeywords = ['billing', 'claims', 'payment', 'insurance', 'reimbursement', 'coinsurance', 'deductible', 'copay', 'fee schedule', 'prior authorization'];
    const codingKeywords = ['cpt', 'icd-10', 'hcpcs', 'modifier', 'diagnosis', 'procedure', 'coding', 'medical coding'];
    const claimsKeywords = ['edi', '837', '835', '277', 'era', 'eob', 'adjudication', 'denial', 'rejection', 'timely filing'];

    let billingScore = 0;
    let codingScore = 0;
    let claimsScore = 0;

    billingKeywords.forEach(keyword => {
      const count = (text.match(new RegExp(keyword, 'g')) || []).length;
      billingScore += count;
    });

    codingKeywords.forEach(keyword => {
      const count = (text.match(new RegExp(keyword, 'g')) || []).length;
      codingScore += count;
    });

    claimsKeywords.forEach(keyword => {
      const count = (text.match(new RegExp(keyword, 'g')) || []).length;
      claimsScore += count;
    });

    // Normalize scores (max 100)
    const maxPossible = Math.max(billingScore, codingScore, claimsScore, 1);
    billingScore = Math.min((billingScore / maxPossible) * 100, 100);
    codingScore = Math.min((codingScore / maxPossible) * 100, 100);
    claimsScore = Math.min((claimsScore / maxPossible) * 100, 100);

    return {
      billing: Math.round(billingScore),
      coding: Math.round(codingScore),
      claims: Math.round(claimsScore)
    };
  } catch (error) {
    console.error('Error parsing resume:', error);
    return { billing: 0, coding: 0, claims: 0 };
  }
}

// Upload resume
router.post('/upload', auth, upload.single('resume'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let parsedData = {
      name: '',
      email: '',
      phone: '',
      skills: [],
      experience: '',
      education: '',
      rcmVerticals: { billing: 0, coding: 0, claims: 0 }
    };

    if (req.file.mimetype === 'application/pdf') {
      parsedData.rcmVerticals = await parseResume(req.file.path);
    }

    const resume = new Resume({
      user: req.user.id,
      filePath: req.file.path,
      parsedData,
    });
    await resume.save();

    // Award coins for resume upload
    user.coins += 50; // Resume upload reward

    // Update profile score after resume upload
    user.profileScore = calculateProfileScore(user);

    // Update user profile with resume path and RCM vertical scores
    await User.findByIdAndUpdate(req.user.id, {
      'profile.resume': req.file.path,
      rcmVerticalScores: parsedData.rcmVerticals,
      coins: user.coins,
      profileScore: user.profileScore
    });

    res.json({
      message: 'Resume uploaded and parsed successfully',
      rcmVerticals: parsedData.rcmVerticals,
      coinsEarned: 50
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user's resumes
router.get('/', auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id });
    res.json(resumes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

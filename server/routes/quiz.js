const express = require('express');
const auth = require('../middleware/auth');
const QuizQuestion = require('../models/QuizQuestion');
const User = require('../models/User');

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

// Get quiz questions based on user profile
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Determine question selection based on user profile
    let verticalWeights = { billing: 1, coding: 1, claims: 1 };

    // Adjust weights based on resume parsing scores
    if (user.rcmVerticalScores) {
      const totalScore = user.rcmVerticalScores.billing + user.rcmVerticalScores.coding + user.rcmVerticalScores.claims;
      if (totalScore > 0) {
        verticalWeights = {
          billing: user.rcmVerticalScores.billing / totalScore,
          coding: user.rcmVerticalScores.coding / totalScore,
          claims: user.rcmVerticalScores.claims / totalScore
        };
      }
    }

    // Adjust difficulty based on experience level
    let difficultyWeights = { easy: 1, medium: 1, hard: 1 };
    if (user.experienceLevel === 'fresh') {
      difficultyWeights = { easy: 0.7, medium: 0.2, hard: 0.1 };
    } else if (user.experienceLevel === 'middle') {
      difficultyWeights = { easy: 0.3, medium: 0.5, hard: 0.2 };
    } else if (user.experienceLevel === 'senior') {
      difficultyWeights = { easy: 0.1, medium: 0.3, hard: 0.6 };
    }

    // Select 50 questions based on weights
    const selectedQuestions = [];
    const verticals = ['billing', 'coding', 'claims'];
    const difficulties = ['easy', 'medium', 'hard'];

    for (let i = 0; i < 50; i++) {
      // Randomly select vertical based on weights
      const verticalRand = Math.random();
      let cumulativeWeight = 0;
      let selectedVertical = 'billing';
      for (const vertical of verticals) {
        cumulativeWeight += verticalWeights[vertical];
        if (verticalRand <= cumulativeWeight) {
          selectedVertical = vertical;
          break;
        }
      }

      // Randomly select difficulty based on weights
      const difficultyRand = Math.random();
      cumulativeWeight = 0;
      let selectedDifficulty = 'easy';
      for (const difficulty of difficulties) {
        cumulativeWeight += difficultyWeights[difficulty];
        if (difficultyRand <= cumulativeWeight) {
          selectedDifficulty = difficulty;
          break;
        }
      }

      // Find a question matching the criteria
      const question = await QuizQuestion.findOne({
        vertical: selectedVertical,
        difficulty: selectedDifficulty
      }).skip(Math.floor(Math.random() * await QuizQuestion.countDocuments({
        vertical: selectedVertical,
        difficulty: selectedDifficulty
      })));

      if (question) {
        selectedQuestions.push({
          id: question._id,
          question: question.question,
          options: question.options,
          category: question.category,
          vertical: question.vertical,
          difficulty: question.difficulty
        });
      }
    }

    // If we don't have enough questions, fill with random ones
    while (selectedQuestions.length < 50) {
      const randomQuestion = await QuizQuestion.findOne().skip(Math.floor(Math.random() * await QuizQuestion.countDocuments()));
      if (randomQuestion) {
        selectedQuestions.push({
          id: randomQuestion._id,
          question: randomQuestion.question,
          options: randomQuestion.options,
          category: randomQuestion.category,
          vertical: randomQuestion.vertical,
          difficulty: randomQuestion.difficulty
        });
      }
    }

    res.json(selectedQuestions.slice(0, 50));
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    res.status(500).json({ error: 'Failed to fetch quiz questions' });
  }
});

// Submit quiz answers
router.post('/submit', auth, async (req, res) => {
  try {
    const { answers } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Award coins for quiz attempt
    user.coins += 40; // Quiz attempt reward

    // Calculate scores for each vertical
    let billingScore = 0;
    let codingScore = 0;
    let claimsScore = 0;
    let totalCorrect = 0;

    // Store quiz answers for recruiter viewing
    const quizAnswers = [];

    for (const answer of answers) {
      const question = await QuizQuestion.findById(answer.questionId);
      if (question) {
        const isCorrect = answer.selectedAnswer === question.correct;
        if (isCorrect) {
          totalCorrect++;
          // Bonus coins for correct answers
          user.coins += 5; // +5 coins per correct answer
          if (question.vertical === 'billing') billingScore++;
          else if (question.vertical === 'coding') codingScore++;
          else if (question.vertical === 'claims') claimsScore++;
        }

        // Store answer for recruiter viewing
        quizAnswers.push({
          questionId: question._id,
          answer: answer.selectedAnswer,
          isCorrect: isCorrect,
          timestamp: new Date()
        });
      }
    }

    // Update user RCM vertical scores
    const updatedScores = {
      billing: Math.round((billingScore / answers.length) * 100),
      coding: Math.round((codingScore / answers.length) * 100),
      claims: Math.round((claimsScore / answers.length) * 100)
    };

    // Update profile score after quiz completion
    user.quizAnswers = quizAnswers;
    user.profileScore = calculateProfileScore(user);

    await User.findByIdAndUpdate(req.user.id, {
      rcmVerticalScores: updatedScores,
      coins: user.coins,
      quizAnswers: quizAnswers,
      profileScore: user.profileScore
    });

    // Generate recommendations based on scores
    const recommendations = [];
    if (updatedScores.billing < 70) recommendations.push('Consider focusing on billing and claims processing skills');
    if (updatedScores.coding < 70) recommendations.push('Improve medical coding knowledge, especially CPT and ICD-10');
    if (updatedScores.claims < 70) recommendations.push('Work on claims submission and adjudication processes');

    res.json({
      message: 'Quiz submitted successfully',
      score: Math.round((totalCorrect / answers.length) * 100),
      verticalScores: updatedScores,
      coinsEarned: 40 + (totalCorrect * 5), // Base 40 + 5 per correct
      recommendations
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
});

module.exports = router;

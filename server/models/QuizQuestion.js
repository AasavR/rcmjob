const mongoose = require('mongoose');

const quizQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correct: { type: String, required: true },
  category: { type: String, enum: ['billing', 'coding', 'claims', 'general'], required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  vertical: { type: String, enum: ['billing', 'coding', 'claims'], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('QuizQuestion', quizQuestionSchema);

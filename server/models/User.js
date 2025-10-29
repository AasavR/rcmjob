const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['candidate', 'employer', 'admin'], default: 'candidate' },
  profile: {
    resume: String,
    skills: [String],
    experience: String,
    education: String,
  },
  rcmVerticalScores: {
    billing: { type: Number, default: 0 },
    coding: { type: Number, default: 0 },
    claims: { type: Number, default: 0 },
  },
  experienceLevel: { type: String, enum: ['fresh', 'middle', 'senior'], default: 'fresh' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  paymentAmount: { type: Number },
  stripePaymentIntentId: String,
  otp: String,
  otpExpires: Date,
  isVerified: { type: Boolean, default: false },
  coins: { type: Number, default: 0 },
  workflowPreference: { type: String, enum: ['fun', 'growth'], default: 'fun' },
  dob: Date,
  experience: String,
  profilePic: String,
  profileScore: { type: Number, default: 0 }, // Calculated based on coins and activities
  quizAnswers: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'QuizQuestion' },
    answer: String,
    isCorrect: Boolean,
    timestamp: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);

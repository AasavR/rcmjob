const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filePath: { type: String, required: true },
  parsedData: {
    name: String,
    email: String,
    phone: String,
    skills: [String],
    experience: String,
    education: String,
    rcmVerticals: {
      billing: { type: Number, default: 0 },
      coding: { type: Number, default: 0 },
      claims: { type: Number, default: 0 },
    },
  },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Resume', resumeSchema);

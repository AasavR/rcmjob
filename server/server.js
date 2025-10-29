const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const jobRoutes = require('./routes/jobs');
const resumeRoutes = require('./routes/resumes');
const crmRoutes = require('./routes/crm');
const quizRoutes = require('./routes/quiz');
const reportRoutes = require('./routes/reports');
const scorecardRoutes = require('./routes/scorecard');
const learningRoutes = require('./routes/learning');
const wheelRoutes = require('./routes/wheel');
const adminRoutes = require('./routes/admin');
const paymentRoutes = require('./routes/payments');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function connectDB() {
  try {
    // Try to connect to local MongoDB first
    const localUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rcmjob';
    await mongoose.connect(localUri);
    console.log('Connected to local MongoDB');
  } catch (localError) {
    console.error('Error connecting to local MongoDB:', localError.message);
    console.log('Starting with in-memory MongoDB for testing...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log('Connected to in-memory MongoDB for testing');
    } catch (memoryError) {
      console.error('Error connecting to in-memory MongoDB:', memoryError.message);
      console.log('Please ensure MongoDB is installed and running locally, or check your MONGODB_URI environment variable.');
      console.log('For development, you can install MongoDB Community Server or use MongoDB Atlas.');
      process.exit(1);
    }
  }
}

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/crm', crmRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/scorecard', scorecardRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/wheel', wheelRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

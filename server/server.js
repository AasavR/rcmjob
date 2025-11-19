const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

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
const otpRoutes = require('./routes/otp_secure');

dotenv.config();

const app = express();

// Configure CORS to allow your Netlify domain and localhost for development
const allowedOrigins = [
  'http://localhost:3000',
  'https://rcmjob.com', // Replace with your actual Netlify URL if different
  process.env.FRONTEND_URL
].filter(Boolean); // Filter out undefined values

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    const trimmedOrigin = origin.replace(/\/$/, '');
    const trimmedAllowed = allowedOrigins.map(o => o.replace(/\/$/, ''));
    if (trimmedAllowed.includes(trimmedOrigin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function connectDB() {
  try {
    const mongoUri = process.env.MONGODB_URI; // Use Atlas URI

    if (!mongoUri) {
      console.error("❌ MONGODB_URI is not set. Add it in Render Environment Variables.");
      process.exit(1);
    }

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true
    });

    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
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
app.use('/api/otp', otpRoutes);

// Serve static files from the React app build directory
const clientBuildPath = path.join(__dirname, '../client/build');
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));

  // Catch all handler: send back React's index.html file for any non-API routes
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
} else {
  console.warn('⚠️  Client build directory not found. Make sure to build the client before deploying.');
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

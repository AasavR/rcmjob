const mongoose = require('mongoose');
const QuizQuestion = require('./server/models/QuizQuestion');
require('dotenv').config();

async function testPersistence() {
  try {
    // Use the same connection logic as server.js
    const localUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rcmjob';
    let connection;
    try {
      connection = await mongoose.connect(localUri);
      console.log('Connected to local MongoDB for persistence test');
    } catch (localError) {
      console.log('Local MongoDB not available, trying in-memory server...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create({ startupTimeout: 30000 });
      const mongoUri = mongoServer.getUri();
      connection = await mongoose.connect(mongoUri);
      console.log('Connected to in-memory MongoDB for persistence test');
    }

    const count = await QuizQuestion.countDocuments();
    console.log('Number of quiz questions in database:', count);
    if (count > 0) {
      console.log('Database persistence test PASSED: Questions are stored and retrievable.');
    } else {
      console.log('Database persistence test FAILED: No questions found.');
    }
    process.exit(0);
  } catch (error) {
    console.error('Error testing persistence:', error);
    process.exit(1);
  }
}

testPersistence();

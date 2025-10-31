const mongoose = require('mongoose');

async function dropIndex() {
  try {
    // Use the same connection string as production
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rcmjob';
    await mongoose.connect(mongoUri);
    const db = mongoose.connection.db;
    await db.collection('users').dropIndex('username_1');
    console.log('Index dropped successfully');
  } catch (error) {
    console.error('Error dropping index:', error);
  } finally {
    await mongoose.disconnect();
  }
}

dropIndex();

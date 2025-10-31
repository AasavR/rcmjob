const axios = require('axios');

async function testRegister() {
  try {
    const response = await axios.post('https://rcmjob.onrender.com/api/auth/register', {
      name: 'Test User',
      email: `testlocal${Date.now()}@example.com`,
      phone: '1234567890',
      password: 'password123',
      role: 'candidate',
      dob: '1990-01-01',
      experience: '2 years',
      workflowPreference: 'fun'
    });
    console.log('Status:', response.status);
    console.log('Response:', response.data);
  } catch (error) {
    console.log('Error:', error.response?.status, error.response?.data);
  }
}

testRegister();

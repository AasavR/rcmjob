const https = require('https');

const postData = JSON.stringify({
  name: 'Test User18',
  email: 'test18@example.com',
  phone: '1234567898',
  password: 'password123',
  role: 'candidate',
  dob: '1990-01-01',
  experience: '2 years',
  workflowPreference: 'fun'
});

const options = {
  hostname: 'rcmjob.onrender.com',
  port: 443,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.write(postData);
req.end();

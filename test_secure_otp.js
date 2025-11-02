const https = require('https');

const postData = JSON.stringify({
  email: 'test42@example.com'
});

const options = {
  hostname: 'rcmjob.onrender.com',
  port: 443,
  path: '/api/otp/send',
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

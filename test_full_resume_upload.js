const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function testFullResumeUpload() {
  try {
    console.log('=== Starting Full Resume Upload Test ===');

    // Step 1: Register a new user
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    const password = 'password123';

    console.log('1. Registering new user...');
    const registerResponse = await axios.post('https://rcmjob.onrender.com/api/auth/register', {
      name: 'Test User',
      email: email,
      phone: '1234567890',
      password: password,
      role: 'candidate',
      dob: '1990-01-01',
      experience: '2 years',
      workflowPreference: 'fun'
    });
    console.log('Registration Status:', registerResponse.status);
    console.log('Registration Response:', registerResponse.data);

    // Step 2: Send OTP
    console.log('2. Sending OTP...');
    const otpSendResponse = await axios.post('https://rcmjob.onrender.com/api/otp/send', {
      email: email
    });
    console.log('OTP Send Status:', otpSendResponse.status);
    console.log('OTP Send Response:', otpSendResponse.data);

    // Step 3: For testing purposes, we'll need to manually get the OTP from email
    // In a real test environment, you'd automate this
    console.log('3. Please check your email for OTP and enter it below:');
    // For now, we'll assume we have the OTP - in production testing, you'd need to retrieve it
    const otp = '123456'; // Replace with actual OTP from email
    console.log('Using OTP:', otp);

    // Step 4: Verify OTP
    console.log('4. Verifying OTP...');
    const otpVerifyResponse = await axios.post('https://rcmjob.onrender.com/api/otp/verify', {
      email: email,
      otp: otp
    });
    console.log('OTP Verify Status:', otpVerifyResponse.status);
    console.log('OTP Verify Response:', otpVerifyResponse.data);

    // Step 5: Login
    console.log('5. Logging in...');
    const loginResponse = await axios.post('https://rcmjob.onrender.com/api/auth/login', {
      email: email,
      password: password
    });
    const token = loginResponse.data.token;
    console.log('Login Status:', loginResponse.status);
    console.log('Login successful, token received');

    // Step 6: Create dummy PDF
    console.log('6. Creating dummy resume PDF...');
    const dummyPdfPath = 'test_resume.pdf';
    fs.writeFileSync(dummyPdfPath, '%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/MediaBox [0 0 612 792]\n/Contents 4 0 R\n>>\nendobj\n4 0 obj\n<<\n/Length 44\n>>\nstream\nBT\n/F1 12 Tf\n100 700 Td\n(Hello World) Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000200 00000 n \ntrailer\n<<\n/Size 5\n/Root 1 0 R\n>>\nstartxref\n284\n%%EOF');

    // Step 7: Upload resume
    console.log('7. Uploading resume...');
    const formData = new FormData();
    formData.append('resume', fs.createReadStream(dummyPdfPath), {
      filename: 'test_resume.pdf',
      contentType: 'application/pdf'
    });

    const uploadResponse = await axios.post('https://rcmjob.onrender.com/api/resumes/upload', formData, {
      headers: {
        ...formData.getHeaders(),
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('Upload Status:', uploadResponse.status);
    console.log('Upload Response:', uploadResponse.data);

    // Step 8: Get user's resumes
    console.log('8. Fetching user resumes...');
    const getResumesResponse = await axios.get('https://rcmjob.onrender.com/api/resumes', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Get Resumes Status:', getResumesResponse.status);
    console.log('User Resumes:', getResumesResponse.data);

    // Cleanup
    fs.unlinkSync(dummyPdfPath);
    console.log('=== Test completed successfully! ===');

  } catch (error) {
    console.log('Error:', error.response?.status, error.response?.data);
    console.log('Full error:', error.message);
  }
}

testFullResumeUpload();

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function testResumeUpload() {
  try {
    // Use a pre-existing verified user for testing
    const email = 'test@example.com'; // Assuming this user exists and is verified
    const password = 'password123';

    // Try to login directly (assuming user is already verified)
    const loginResponse = await axios.post('https://rcmjob.onrender.com/api/auth/login', {
      email: email,
      password: password
    });

    let token = loginResponse.data.token;
    console.log('Login successful, token:', token);

    if (!token) {
      console.log('Token is undefined, user may not be verified. Trying to register and verify...');
      // Register a new user
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
      console.log('Register response:', registerResponse.data);

      // For production testing, we need the actual OTP from email
      // Since we can't access it, let's prompt for manual OTP entry
      console.log('Please check your email for OTP and enter it below:');
      // In a real test environment, you'd automate this or use a test email service
      // For now, we'll assume the OTP is known or skip this step

      // Try login with OTP (replace 'YOUR_OTP_HERE' with actual OTP)
      const loginWithOtpResponse = await axios.post('https://rcmjob.onrender.com/api/auth/login', {
        email: email,
        password: password,
        otp: 'YOUR_OTP_HERE' // Replace with actual OTP from email
      });
      token = loginWithOtpResponse.data.token;
      console.log('Login with OTP successful, token:', token);
    }

    // Create a dummy PDF file for testing
    const dummyPdfPath = 'dummy_resume.pdf';
    fs.writeFileSync(dummyPdfPath, '%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/MediaBox [0 0 612 792]\n/Contents 4 0 R\n>>\nendobj\n4 0 obj\n<<\n/Length 44\n>>\nstream\nBT\n/F1 12 Tf\n100 700 Td\n(Hello World) Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000200 00000 n \ntrailer\n<<\n/Size 5\n/Root 1 0 R\n>>\nstartxref\n284\n%%EOF');

    // Create form data
    const formData = new FormData();
    formData.append('resume', fs.createReadStream(dummyPdfPath), {
      filename: 'test_resume.pdf',
      contentType: 'application/pdf'
    });

    // Upload resume
    const uploadResponse = await axios.post('https://rcmjob.onrender.com/api/resumes/upload', formData, {
      headers: {
        ...formData.getHeaders(),
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('Upload Status:', uploadResponse.status);
    console.log('Upload Response:', uploadResponse.data);

    // Clean up
    fs.unlinkSync(dummyPdfPath);

  } catch (error) {
    console.log('Error:', error.response?.status, error.response?.data);
    console.log('Full error:', error.message);
  }
}

testResumeUpload();

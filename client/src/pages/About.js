import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About RCM Jobs</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-lg text-gray-700 mb-6">
            RCM Jobs is a revolutionary platform designed to connect Revenue Cycle Management (RCM) professionals with top-tier opportunities. Our mission is to accelerate careers in the RCM industry by providing verified job matching, skill assessments, and gamified learning experiences.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            We believe in making the job search process fun, efficient, and rewarding. Whether you're a seasoned RCM expert or just starting your journey, RCM Jobs offers tools and resources to help you succeed.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Our Features</h2>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>Verified job matching based on skill scores</li>
            <li>Gamified quizzes and assessments</li>
            <li>Resume upload with instant rewards</li>
            <li>Workflow preferences for personalized experiences</li>
            <li>Secure OTP-based authentication</li>
          </ul>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700">
            Have questions? Reach out to us at <a href="mailto:support@rcmjobs.com" className="text-primary-blue hover:underline">support@rcmjobs.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

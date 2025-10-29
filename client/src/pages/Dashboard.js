import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link to="/resume-upload" className="bg-blue-500 text-white p-6 rounded-lg shadow-md hover:bg-blue-600">
          <h2 className="text-2xl font-bold mb-4">Resume Upload</h2>
          <p>Upload and parse your resume</p>
        </Link>
        <Link to="/jobs" className="bg-green-500 text-white p-6 rounded-lg shadow-md hover:bg-green-600">
          <h2 className="text-2xl font-bold mb-4">Jobs</h2>
          <p>Browse and apply for jobs</p>
        </Link>
        <Link to="/quiz" className="bg-purple-500 text-white p-6 rounded-lg shadow-md hover:bg-purple-600">
          <h2 className="text-2xl font-bold mb-4">Quiz</h2>
          <p>Take skill assessment quizzes</p>
        </Link>
        <Link to="/reports" className="bg-yellow-500 text-white p-6 rounded-lg shadow-md hover:bg-yellow-600">
          <h2 className="text-2xl font-bold mb-4">Reports</h2>
          <p>View your application reports</p>
        </Link>
        <Link to="/scorecard" className="bg-red-500 text-white p-6 rounded-lg shadow-md hover:bg-red-600">
          <h2 className="text-2xl font-bold mb-4">Scorecard</h2>
          <p>Check your performance scorecard</p>
        </Link>
        <Link to="/learning" className="bg-indigo-500 text-white p-6 rounded-lg shadow-md hover:bg-indigo-600">
          <h2 className="text-2xl font-bold mb-4">Learning</h2>
          <p>Access learning resources</p>
        </Link>
        <Link to="/wheel" className="bg-pink-500 text-white p-6 rounded-lg shadow-md hover:bg-pink-600">
          <h2 className="text-2xl font-bold mb-4">Spin the Wheel</h2>
          <p>Try your luck for rewards</p>
        </Link>
        <Link to="/payment" className="bg-green-500 text-white p-6 rounded-lg shadow-md hover:bg-green-600">
          <h2 className="text-2xl font-bold mb-4">Payment</h2>
          <p>Pay for placement services</p>
        </Link>
        <Link to="/admin" className="bg-gray-500 text-white p-6 rounded-lg shadow-md hover:bg-gray-600">
          <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
          <p>Admin dashboard (if admin)</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

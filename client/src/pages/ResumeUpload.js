import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [userCoins, setUserCoins] = useState(0);

  useEffect(() => {
    // Get current user coins
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserCoins(user.coins || 0);
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setMessage('');
    } else {
      setMessage('Please select a PDF file');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file first');
      return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('resume', file);

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please login first');
      setUploading(false);
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/resumes/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      setMessage(response.data.message);
      setParsedData(response.data.parsedData);
      setUserCoins(prevCoins => prevCoins + (response.data.coinsAwarded || 20));

      // Update local user data
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.coins = (user.coins || 0) + (response.data.coinsAwarded || 20);
      localStorage.setItem('user', JSON.stringify(user));

      setFile(null);
      // Reset file input
      e.target.reset();
    } catch (error) {
      setMessage(error.response?.data?.error || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Upload Your Resume</h1>

        {/* Coins Display */}
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-6 text-center">
          <span className="font-bold">💰 Your Coins: {userCoins}</span>
          <p className="text-sm mt-1">Earn 20 coins for uploading your resume!</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="resume" className="block text-gray-700 font-bold mb-2">
                Select Resume (PDF only)
              </label>
              <input
                type="file"
                id="resume"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {file && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-blue-800">Selected: {file.name}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={uploading || !file}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 mb-4"
            >
              {uploading ? 'Uploading...' : 'Upload Resume & Earn 20 Coins'}
            </button>
          </form>

          {message && (
            <div className={`mb-4 p-3 rounded ${message.includes('success') ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'}`}>
              {message}
            </div>
          )}

          {parsedData && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded">
              <h3 className="font-bold text-green-800 mb-2">Resume Parsed Successfully!</h3>
              <div className="text-sm text-green-700">
                <p><strong>Skills:</strong> {parsedData.skills?.join(', ') || 'None detected'}</p>
                <p><strong>Experience:</strong> {parsedData.experience || 'Not specified'}</p>
                <p><strong>Education:</strong> {parsedData.education || 'Not specified'}</p>
                <p><strong>Certifications:</strong> {parsedData.certifications?.join(', ') || 'None detected'}</p>
              </div>
            </div>
          )}

          <div className="text-center text-gray-600">
            <p className="mb-2">💰 Earn 20 coins for resume upload</p>
            <p className="mb-2">🎯 Earn 40 coins for quiz attempt</p>
            <p className="text-sm">Use coins to unlock premium features and get highlighted in job searches!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;

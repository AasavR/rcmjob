import React, { useState, useEffect } from 'react';

const Scorecard = () => {
  const [scorecard, setScorecard] = useState({});

  useEffect(() => {
    // Fetch user scorecard
    const fetchScorecard = async () => {
      // Mock data
      setScorecard({
        profileCompleteness: 80,
        quizScore: 85,
        applicationSuccess: 70,
      });
    };
    fetchScorecard();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">My Scorecard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Profile Completeness</h2>
          <div className="text-4xl font-bold text-blue-600 mb-2">{scorecard.profileCompleteness}%</div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${scorecard.profileCompleteness}%` }}></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Quiz Score</h2>
          <div className="text-4xl font-bold text-green-600 mb-2">{scorecard.quizScore}%</div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-green-600 h-4 rounded-full" style={{ width: `${scorecard.quizScore}%` }}></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Application Success</h2>
          <div className="text-4xl font-bold text-purple-600 mb-2">{scorecard.applicationSuccess}%</div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-purple-600 h-4 rounded-full" style={{ width: `${scorecard.applicationSuccess}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scorecard;

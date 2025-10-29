import React, { useState } from 'react';

const Wheel = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState('');

  const rewards = ['Job Match', 'Skill Boost', 'Networking Opportunity', 'Resume Review', 'Interview Prep', 'Career Advice'];

  const spinWheel = async () => {
    setSpinning(true);
    // Simulate API call
    setTimeout(() => {
      const reward = rewards[Math.floor(Math.random() * rewards.length)];
      setResult(reward);
      setSpinning(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Spin the Wheel</h1>
      <div className="max-w-md mx-auto text-center">
        <div className={`w-64 h-64 mx-auto mb-8 rounded-full border-8 border-blue-600 flex items-center justify-center ${spinning ? 'animate-spin' : ''}`}>
          <div className="text-2xl font-bold">🎡</div>
        </div>
        <button
          onClick={spinWheel}
          disabled={spinning}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg text-xl font-bold hover:bg-blue-700 disabled:opacity-50"
        >
          {spinning ? 'Spinning...' : 'Spin the Wheel!'}
        </button>
        {result && (
          <div className="mt-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
            <p className="text-lg">You won: <strong>{result}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wheel;

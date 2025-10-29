import React, { useState, useEffect } from 'react';

const Learning = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    // Fetch learning resources
    const fetchResources = async () => {
      // Mock data
      setResources([
        { id: 1, title: 'Resume Writing Tips', type: 'article', content: 'Learn how to write an effective resume...' },
        { id: 2, title: 'Interview Preparation', type: 'video', url: 'https://example.com/video' },
        { id: 3, title: 'Networking Strategies', type: 'article', content: 'Build your professional network...' },
      ]);
    };
    fetchResources();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Learning Resources</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {resources.map(resource => (
          <div key={resource.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">{resource.title}</h2>
            <p className="text-gray-600 mb-4 capitalize">{resource.type}</p>
            {resource.type === 'article' ? (
              <p className="mb-4">{resource.content}</p>
            ) : (
              <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Watch Video
              </a>
            )}
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Mark as Read
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learning;

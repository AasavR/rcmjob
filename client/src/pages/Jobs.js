import React, { useState } from 'react';

const Jobs = () => {
  const [userRole, setUserRole] = useState('Freelancer'); // Default role

  // Mock job data
  const mockJobs = [
    { id: 1, title: "US Medical Billing Specialist (AR Followup)", type: "Hourly", budget: "$20 - $25 / hr", skills: ["AR", "Denial Mgmt", "Payer Comm."], status: "Open" },
    { id: 2, title: "Certified Medical Coder (ICD-10, CPT)", type: "Fixed Price", budget: "$300 / project", skills: ["ICD-10", "CPT", "CPC"], status: "Open" },
    { id: 3, title: "RCM Data Analyst / Reporting", type: "Hourly", budget: "$35 - $45 / hr", skills: ["SQL", "BI Tools", "RCM Flow"], status: "Open" },
    { id: 4, title: "Hospital RCM Trainer (Remote)", type: "Fixed Price", budget: "$1500 / project", skills: ["Training", "HIPAA", "Client Onboarding"], status: "Open" },
    { id: 5, title: "Pre-Auth Specialist", type: "Hourly", budget: "$18 - $22 / hr", skills: ["Authorization", "Verification", "Insurance"], status: "Open" },
  ];

  const toggleRole = (role) => {
    setUserRole(role);
  };

  const JobCard = (job) => (
    <div className="bg-white p-6 shadow-lg rounded-xl border border-secondary-gray hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-semibold text-gray-800 mb-1">{job.title}</h3>
      <p className="text-sm font-medium text-primary-blue mb-4">{job.type} • {job.budget}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.map(skill => (
          <span key={skill} className="px-3 py-1 text-xs font-medium text-gray-700 bg-secondary-gray rounded-full">{skill}</span>
        ))}
      </div>
      <div className="flex justify-between items-center pt-3 border-t border-secondary-gray/50">
        <span className="text-xs text-gray-500">Posted 2 days ago</span>
        <button
          onClick={() => alert(`${userRole === 'Freelancer' ? 'Applying for' : 'Viewing proposals for'} job: ${job.title}`)}
          className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary-blue text-white hover:bg-primary-light transition-colors duration-200 shadow-md"
        >
          {userRole === 'Freelancer' ? 'Click to Apply' : 'View Proposals (4)'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Header with Background Image */}
      <header className="sticky top-0 bg-white shadow-sm z-10">
        <div className="relative py-8 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-jobs-bg bg-cover bg-center opacity-10"></div>
          <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <a href="/" className="text-2xl font-extrabold gradient-text mb-2 sm:mb-0">RCM Job Board</a>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="inline-flex rounded-xl bg-white p-1 border border-secondary-gray shadow-sm transition-all duration-300">
                <button
                  onClick={() => toggleRole('Provider')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    userRole === 'Provider' ? 'bg-primary-blue text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  I am Hiring
                </button>
                <button
                  onClick={() => toggleRole('Freelancer')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    userRole === 'Freelancer' ? 'bg-primary-blue text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  I want Work
                </button>
              </div>
              <a href="/dashboard" className="px-4 py-2 text-sm font-medium rounded-lg bg-accent-green text-white hover:bg-green-600 transition-colors duration-200 shadow-md">
                Go to Dashboard
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-col lg:flex-row gap-8 p-4 sm:p-6 lg:p-8">
        {/* Sidebar: Filters, Scorecard, and Gamification */}
        <aside className="w-full lg:w-1/4 space-y-6">
          {/* Profile Scorecard */}
          <div className="p-6 bg-white rounded-xl shadow-lg border-2 border-primary-blue/30 h-fit">
            <h3 className="text-lg font-bold mb-3 text-primary-blue">Your Profile Scorecard</h3>
            <div className="text-center mb-4">
              <div className="text-4xl font-extrabold text-accent-green">87<span className="text-xl text-gray-500">/100</span></div>
              <p className="text-sm text-gray-600">Based on Quiz Score & Resume Parse</p>
            </div>
            <button onClick={() => alert('Navigating to Medical Billing Quiz...')} className="w-full py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-200">
              Take Quiz & Boost Score
            </button>
            <ul className="mt-4 text-xs text-gray-500 space-y-1">
              <li><span className="font-bold">Impact:</span> Higher score = better job visibility.</li>
              <li><span className="font-bold">Activity:</span> Log in more (3x/week) for a score bonus!</li>
            </ul>
          </div>

          {/* Gamified Job Selector (Gamble/Rapid Fire) */}
          <div className="p-6 bg-white rounded-xl shadow-lg border border-secondary-gray h-fit">
            <h3 className="text-lg font-bold mb-3 text-gray-800">Gamble for a Job!</h3>
            <p className="text-sm text-gray-600 mb-4">Try the **Rapid Fire Job Selector** to find a great match fast.</p>
            <button onClick={() => alert('Spinning wheel and starting rapid fire quiz...')} className="w-full py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors duration-200 shadow-md">
              <span className="text-xl">🎰</span> Spin the Wheel (Quiz)
            </button>
          </div>

          {/* Filters */}
          <div className="p-6 bg-white rounded-xl shadow-lg border border-secondary-gray h-fit">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Filter Jobs</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                <select className="w-full p-2 border border-secondary-gray rounded-lg focus:ring-primary-blue focus:border-primary-blue text-sm">
                  <option>Select Skill</option>
                  <option>AR Followup</option>
                  <option>Medical Coding</option>
                  <option>HIPAA</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pay Type</label>
                <div className="flex space-x-2">
                  <button className="w-1/2 p-2 border border-primary-blue bg-primary-blue text-white rounded-lg text-sm font-medium">Hourly</button>
                  <button className="w-1/2 p-2 border border-secondary-gray bg-white text-gray-700 rounded-lg text-sm font-medium">Fixed</button>
                </div>
              </div>
              <button className="w-full py-2 bg-primary-blue text-white rounded-lg font-semibold hover:bg-primary-light transition-colors duration-200">Apply Filters</button>
            </div>
          </div>

          {/* Refer & Share */}
          <div className="p-6 bg-white rounded-xl shadow-lg border border-secondary-gray h-fit">
            <h3 className="text-lg font-bold mb-3 text-gray-800">Community & Rewards</h3>
            <p className="text-sm text-gray-600 mb-4">Refer a friend and get a reward!</p>
            <button onClick={() => alert('Sharing profile link...')} className="w-full py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 mb-2">
              Refer & Share Profile
            </button>
            <button onClick={() => alert('Get important details and resume tips...')} className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200">
              Get Resume Tips
            </button>
          </div>
        </aside>

        {/* Main Job List */}
        <div className="w-full lg:w-3/4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{mockJobs.length} RCM Jobs Available</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockJobs.map(JobCard)}
          </div>
          <div className="mt-8 text-center">
            <button className="px-6 py-3 border border-secondary-gray bg-white text-gray-700 rounded-xl font-semibold hover:bg-secondary-gray transition-colors duration-200 shadow-md">Load More Jobs</button>
          </div>

          {/* External Job Links Section (only for Freelancers) */}
          {userRole === 'Freelancer' && (
            <section className="bg-white p-8 rounded-xl shadow-xl border-4 border-accent-green/10 mt-12 max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-accent-green mb-4">Tired of our listings? Check Other RCM Platforms</h2>
              <p className="text-gray-600 mb-4">We believe in choice. Here are links to top external job boards:</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="https://www.naukri.com/" target="_blank" rel="noopener noreferrer" className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 shadow-sm flex items-center">
                  <img src="https://placehold.co/16x16/3b82f6/white?text=N" className="mr-2 rounded-full" alt="Naukri Logo" /> Naukri.com
                </a>
                <a href="https://www.shine.com/" target="_blank" rel="noopener noreferrer" className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 shadow-sm flex items-center">
                  <img src="https://placehold.co/16x16/f59e0b/white?text=S" className="mr-2 rounded-full" alt="Shine Logo" /> Shine.com
                </a>
                <a href="https://www.indeed.com/" target="_blank" rel="noopener noreferrer" className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 shadow-sm flex items-center">
                  <img src="https://placehold.co/16x16/065f46/white?text=I" className="mr-2 rounded-full" alt="Indeed Logo" /> Indeed
                </a>
              </div>
            </section>
          )}

          {/* Mock WhatsApp/Email Notification Confirmation */}
          <div className="mt-12 p-4 bg-yellow-100 border border-yellow-300 rounded-lg text-yellow-800 text-sm">
            🔔 **Notifications Active:** You will receive **WhatsApp and Email** alerts for new jobs matching your profile.
          </div>
        </div>
      </main>
    </div>
  );
};

export default Jobs;

import React, { useState } from 'react';

const Home = () => {
  const [userRole, setUserRole] = useState('Freelancer'); // Default role
  const [workflowPreference, setWorkflowPreference] = useState('fun'); // Default workflow

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

  const handleWorkflowChange = (preference) => {
    setWorkflowPreference(preference);
    if (window.setWorkflowPreference) {
      window.setWorkflowPreference(preference);
    }
  };

  const JobCard = (job) => (
    <div className="bg-white p-6 shadow-lg rounded-xl border border-secondary-gray hover:shadow-xl">
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
          className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary-blue text-white hover:bg-primary-light shadow-md"
        >
          {userRole === 'Freelancer' ? 'Click to Apply' : 'View Proposals (4)'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center bg-white shadow-sm sticky top-0 z-10">
        <div className="text-2xl font-extrabold gradient-text">RCM Jobs</div>
        <div className="flex items-center space-x-4">
          <a href="/jobs" className="text-gray-600 hover:text-primary-blue hidden sm:inline">Browse Jobs</a>
          <a href="/login" className="text-sm font-medium text-primary-blue hover:underline">Login / Register Now</a>
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <main className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center py-20 px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Tired of <span className="text-coral">Looking for Jobs</span> or <span className="text-teal">Ideal Candidates</span>?
            </h1>
            <p className="text-lg sm:text-xl mb-10 max-w-3xl mx-auto font-light opacity-90">
              Your RCM career accelerator and talent pipeline. We make the right connection, guaranteed.
            </p>

            {/* 3-Option Navigation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12 px-4">
              {/* Option 1: Employer */}
              <div
                onClick={() => toggleRole('Provider')}
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 card-hover cursor-pointer text-left"
              >
                <div className="w-16 h-16 bg-coral rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-2">I am Hiring</h3>
                <p className="text-white/80 mb-4">Post a verified requirement and receive proposals from certified billers and coders.</p>
                <span className="text-sm font-bold text-coral">Post Requirement →</span>
              </div>
              {/* Option 2: Freelancer */}
              <div
                onClick={() => toggleRole('Freelancer')}
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 card-hover cursor-pointer text-left"
              >
                <div className="w-16 h-16 bg-teal rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-2">I want Work</h3>
                <p className="text-white/80 mb-4">Find high-paying contracts, apply with your scorecard, and get gamified job selections.</p>
                <span className="text-sm font-bold text-teal">Browse Jobs →</span>
              </div>
              {/* Option 3: RCM Academy / Platforms */}
              <a href="/learning" className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 card-hover cursor-pointer text-left">
                <div className="w-16 h-16 bg-sunset rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-2">RCM Academy & More</h3>
                <p className="text-white/80 mb-4">Access crash courses, job guarantees, and different earning platforms.</p>
                <span className="text-sm font-bold text-sunset">Explore Opportunities →</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white shadow-inner">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">The RCM Jobs Advantage</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 border border-secondary-gray rounded-xl shadow-md">
            <svg className="w-10 h-10 text-primary-blue mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.003 12.003 0 002.944 12c0 4.97 1.838 9.42 4.618 12 3.834-3.712 6.5-6.977 9.438-10.985"></path>
            </svg>
            <h3 className="font-semibold text-lg mb-2">1. Verified Matching</h3>
            <p className="text-gray-600 text-sm">Candidates receive jobs matched to their **Profile Scorecard**. Employers see only HIPAA-certified profiles.</p>
          </div>
          <div className="text-center p-6 border border-secondary-gray rounded-xl shadow-md">
            <svg className="w-10 h-10 text-primary-blue mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a2 2 0 010 2.828l-3.89 3.89a2 2 0 01-2.828 0l-1.414-1.414m2.828-5.656a2 2 0 012.828 0"></path>
            </svg>
            <h3 className="font-semibold text-lg mb-2">2. Apply & Assess</h3>
            <p className="text-gray-600 text-sm">Freelancers quickly apply (resume auto-fill/skip) and providers vet candidates via **scorecard** and portfolio.</p>
          </div>
          <div className="text-center p-6 border border-secondary-gray rounded-xl shadow-md">
            <svg className="w-10 h-10 text-primary-blue mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9h-3a4 4 0 00-4 4v2m-7 0h-3a4 4 0 00-4-4v-2m7 0h-3a4 4 0 00-4 4v2"></path>
            </svg>
            <h3 className="font-semibold text-lg mb-2">3. Contract & Interview</h3>
            <p className="text-gray-600 text-sm">Provider accepts proposal to begin **interview process** or proceeds directly to a secure contract with escrow.</p>
          </div>
        </div>
      </section>

      {/* Workflow Toggle Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Choose Your Workflow</h2>
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => handleWorkflowChange('fun')}
              className={`px-6 py-3 rounded-lg font-semibold ${workflowPreference === 'fun' ? 'bg-primary-blue text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Fun, Learning and Growth
            </button>
            <button
              onClick={() => handleWorkflowChange('growth')}
              className={`px-6 py-3 rounded-lg font-semibold ${workflowPreference === 'growth' ? 'bg-primary-blue text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Only Growth
            </button>
          </div>
          <p className="text-gray-600">
            {workflowPreference === 'fun'
              ? 'Enjoy a gamified experience with learning modules, quizzes, and rewards.'
              : 'Focus on career growth with direct job matching and skill assessments.'}
          </p>
        </div>
      </section>

      {/* Resume Incentive Section for Unregistered Users */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary-gray/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Post Resume on Job and Get Reward</h2>
          <p className="text-lg text-gray-600 mb-8">
            Upload your resume now and get matched with top RCM jobs. Earn coins and boost your profile!
          </p>
          <a href="/resume-upload" className="px-6 py-3 bg-primary-blue text-white rounded-lg font-semibold hover:bg-primary-light shadow-md">
            Upload Resume & Get Rewards
          </a>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary-gray/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Featured RCM Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockJobs.slice(0, 6).map(job => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="/jobs" className="px-6 py-3 border border-secondary-gray bg-white text-gray-700 rounded-xl font-semibold hover:bg-secondary-gray shadow-md">
              View All Jobs
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        &copy; 2025 RCM Jobs Marketplace. Your RCM career accelerator.
        <p className="mt-2">Need help? <a href="/contact" className="text-primary-blue hover:underline">Help Option / Contact Us</a></p>
      </footer>
    </div>
  );
};

export default Home;

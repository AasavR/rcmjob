import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [userRole, setUserRole] = useState('Freelancer'); // Default role

  const toggleRole = (role) => {
    setUserRole(role);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-extrabold text-primary-blue">RCM Jobs</Link>

          {/* Role Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="inline-flex rounded-xl bg-white p-1 border border-secondary-gray shadow-sm ">
              <button
                onClick={() => toggleRole('Provider')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg  ${
                  userRole === 'Provider' ? 'bg-primary-blue text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                I am Hiring
              </button>
              <button
                onClick={() => toggleRole('Freelancer')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg  ${
                  userRole === 'Freelancer' ? 'bg-primary-blue text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                I want Work
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link to="/jobs" className="text-gray-600 hover:text-primary-blue  hidden sm:inline">Browse Jobs</Link>
            <Link to="/dashboard" className="px-4 py-2 text-sm font-medium rounded-lg bg-green-500 text-white hover:bg-green-600  shadow-md">
              Go to Dashboard
            </Link>
            <Link to="/login" className="text-sm font-medium text-primary-blue hover:underline">Login / Register</Link>
          </div>
        </div>

        {/* Mobile Role Toggle */}
        <div className="md:hidden flex justify-center py-2 border-t border-secondary-gray">
          <div className="inline-flex rounded-xl bg-white p-1 border border-secondary-gray shadow-sm ">
            <button
              onClick={() => toggleRole('Provider')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg  ${
                userRole === 'Provider' ? 'bg-primary-blue text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Hiring
            </button>
            <button
              onClick={() => toggleRole('Freelancer')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg  ${
                userRole === 'Freelancer' ? 'bg-primary-blue text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Seeking Work
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

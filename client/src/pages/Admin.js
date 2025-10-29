import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState('stats');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      setError('Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      setError('Failed to fetch users');
    }
  };

  const fetchResumes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/resumes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResumes(response.data);
    } catch (error) {
      setError('Failed to fetch resumes');
    }
  };

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/jobs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(response.data);
    } catch (error) {
      setError('Failed to fetch jobs');
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'users' && users.length === 0) fetchUsers();
    if (tab === 'resumes' && resumes.length === 0) fetchResumes();
    if (tab === 'jobs' && jobs.length === 0) fetchJobs();
  };

  if (loading) {
    return <div className="container mx-auto p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="mb-8">
        <nav className="flex space-x-4">
          <button
            onClick={() => handleTabChange('stats')}
            className={`px-4 py-2 rounded ${activeTab === 'stats' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Statistics
          </button>
          <button
            onClick={() => handleTabChange('users')}
            className={`px-4 py-2 rounded ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Users
          </button>
          <button
            onClick={() => handleTabChange('resumes')}
            className={`px-4 py-2 rounded ${activeTab === 'resumes' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Resumes
          </button>
          <button
            onClick={() => handleTabChange('jobs')}
            className={`px-4 py-2 rounded ${activeTab === 'jobs' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Jobs
          </button>
        </nav>
      </div>

      {/* Stats Tab */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">{stats.totalUsers}</h2>
            <p>Total Users</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">{stats.totalJobs}</h2>
            <p>Total Jobs</p>
          </div>
          <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">{stats.totalCandidates}</h2>
            <p>Candidates</p>
          </div>
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">{stats.totalEmployers}</h2>
            <p>Employers</p>
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">{stats.totalResumes}</h2>
            <p>Resumes</p>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">User Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Phone</th>
                  <th className="text-left py-2">Role</th>
                  <th className="text-left py-2">Coins</th>
                  <th className="text-left py-2">Verified</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id} className="border-b">
                    <td className="py-2">{user.name}</td>
                    <td className="py-2">{user.email}</td>
                    <td className="py-2">{user.phone}</td>
                    <td className="py-2 capitalize">{user.role}</td>
                    <td className="py-2">{user.coins || 0}</td>
                    <td className="py-2">{user.isVerified ? 'Yes' : 'No'}</td>
                    <td className="py-2">
                      <button className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 mr-2">
                        Edit
                      </button>
                      <button className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Resumes Tab */}
      {activeTab === 'resumes' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Resume Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">User</th>
                  <th className="text-left py-2">File Name</th>
                  <th className="text-left py-2">Upload Date</th>
                  <th className="text-left py-2">Parsed Data</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {resumes.map(resume => (
                  <tr key={resume._id} className="border-b">
                    <td className="py-2">{resume.user?.name || 'N/A'}</td>
                    <td className="py-2">{resume.filename}</td>
                    <td className="py-2">{new Date(resume.uploadDate).toLocaleDateString()}</td>
                    <td className="py-2">
                      {resume.parsedData ? (
                        <span className="text-green-600">Parsed</span>
                      ) : (
                        <span className="text-red-600">Not Parsed</span>
                      )}
                    </td>
                    <td className="py-2">
                      <button className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 mr-2">
                        View
                      </button>
                      <button className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Jobs Tab */}
      {activeTab === 'jobs' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Job Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Title</th>
                  <th className="text-left py-2">Company</th>
                  <th className="text-left py-2">Posted By</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(job => (
                  <tr key={job._id} className="border-b">
                    <td className="py-2">{job.title}</td>
                    <td className="py-2">{job.company}</td>
                    <td className="py-2">{job.postedBy?.name || 'N/A'}</td>
                    <td className="py-2 capitalize">{job.status || 'Active'}</td>
                    <td className="py-2">
                      <button className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 mr-2">
                        Edit
                      </button>
                      <button className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

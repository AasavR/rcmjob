import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialMode = location.pathname === '/register' ? 'register' : 'login';
  const [mode, setMode] = useState(initialMode);

  // Login state
  const [loginData, setLoginData] = useState({
    email: localStorage.getItem('email') || '',
    password: localStorage.getItem('password') || ''
  });
  const [otp, setOtp] = useState('');
  const [requiresOtp, setRequiresOtp] = useState(false);
  const [rememberMe, setRememberMe] = useState(!!localStorage.getItem('email'));

  // Register state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'candidate',
    dob: '',
    experience: '',
    workflowPreference: 'fun'
  });
  const [registerOtp, setRegisterOtp] = useState('');
  const [registerRequiresOtp, setRegisterRequiresOtp] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleRegisterOtpChange = (e) => {
    setRegisterOtp(e.target.value);
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, loginData);
      if (response.data.requiresOtp) {
        setRequiresOtp(true);
        setError('');
      } else {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        if (rememberMe) {
          localStorage.setItem('email', loginData.email);
          localStorage.setItem('password', loginData.password);
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }

        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { ...loginData, otp });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (rememberMe) {
        localStorage.setItem('email', loginData.email);
        localStorage.setItem('password', loginData.password);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }

      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.error || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, registerData);
      setSuccess('Registration successful! You earned 10 coins. Please verify OTP sent to your email.');
      setRegisterRequiresOtp(true);
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/verify-otp`, { email: registerData.email, otp: registerOtp });
      setSuccess('OTP verified! You can now login.');
      setTimeout(() => setMode('login'), 2000);
    } catch (error) {
      setError(error.response?.data?.error || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-md mx-auto">
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setMode('login')}
            className={`px-4 py-2 rounded-l-md ${mode === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Login
          </button>
          <button
            onClick={() => setMode('register')}
            className={`px-4 py-2 rounded-r-md ${mode === 'register' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Register
          </button>
        </div>
        <h1 className="text-3xl font-bold mb-8 text-center">{mode === 'login' ? 'Login' : 'Register'}</h1>
        {mode === 'login' ? (
          !requiresOtp ? (
            <form onSubmit={handleLoginSubmit} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleRememberMe}
                    className="mr-2"
                  />
                  Remember me
                </label>
              </div>
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label htmlFor="otp" className="block text-gray-700 font-bold mb-2">Enter OTP</label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  maxLength="6"
                />
              </div>
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
          )
        ) : (
          !registerRequiresOtp ? (
            <form onSubmit={handleRegisterSubmit} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={registerData.phone}
                  onChange={handleRegisterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block text-gray-700 font-bold mb-2">Role</label>
                <select
                  id="role"
                  name="role"
                  value={registerData.role}
                  onChange={handleRegisterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="candidate">Candidate</option>
                  <option value="employer">Employer</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="dob" className="block text-gray-700 font-bold mb-2">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={registerData.dob}
                  onChange={handleRegisterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="experience" className="block text-gray-700 font-bold mb-2">Experience</label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={registerData.experience}
                  onChange={handleRegisterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 2 years in RCM"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="workflowPreference" className="block text-gray-700 font-bold mb-2">Workflow Preference</label>
                <select
                  id="workflowPreference"
                  name="workflowPreference"
                  value={registerData.workflowPreference}
                  onChange={handleRegisterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="fun">Fun, Learning and Growth</option>
                  <option value="growth">Only Growth</option>
                </select>
              </div>
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                  {success}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterOtpSubmit} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label htmlFor="registerOtp" className="block text-gray-700 font-bold mb-2">Enter OTP</label>
                <input
                  type="text"
                  id="registerOtp"
                  name="registerOtp"
                  value={registerOtp}
                  onChange={handleRegisterOtpChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  maxLength="6"
                />
              </div>
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                  {success}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
          )
        )}
      </div>
    </div>
  );
};

export default Auth;

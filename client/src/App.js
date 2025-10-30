import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Founders from './pages/Founders';
import Contact from './pages/Contact';
import About from './pages/About';
import ResumeUpload from './pages/ResumeUpload';
import Jobs from './pages/Jobs';
import Quiz from './pages/Quiz';
import Reports from './pages/Reports';
import Scorecard from './pages/Scorecard';
import Learning from './pages/Learning';
import Wheel from './pages/Wheel';
import Admin from './pages/Admin';
import Payment from './pages/Payment';
import './App.css';

function App() {
  const [workflowPreference, setWorkflowPreference] = useState(localStorage.getItem('workflowPreference') || 'fun');

  useEffect(() => {
    localStorage.setItem('workflowPreference', workflowPreference);
  }, [workflowPreference]);

  // Expose setWorkflowPreference to window for Home component
  window.setWorkflowPreference = setWorkflowPreference;

  // Function to modify app flow based on workflow selection
  const getWorkflowRoutes = () => {
    if (workflowPreference === 'fun') {
      // Include learning, quiz, wheel routes
      return (
        <>
          <Route path="/learning" element={<Learning />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/wheel" element={<Wheel />} />
        </>
      );
    } else {
      // Only growth - direct job matching
      return null;
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/founders" element={<Founders />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume-upload" element={<ResumeUpload />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/scorecard" element={<Scorecard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/payment" element={<Payment />} />
          {getWorkflowRoutes()}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

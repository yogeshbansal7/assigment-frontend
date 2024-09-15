import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaFacebookF, FaInstagram, FaPinterest, FaLinkedinIn, FaFingerprint } from 'react-icons/fa'; // Import icons from react-icons
import './Login.css';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // if (userId === 'admin' && password === 'admin') {
    if (userId && password) {
      navigate('/home');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        {/* Terms and Privacy Policy Text */}
        <p className="terms-text">
          By signing in you are agreeing to our{' '}
          <a href="#terms" className="terms-link">Terms and privacy policy</a>
        </p>
        
        <div className="input-container">
          <FaEnvelope className="icon" /> {/* Email icon */}
          <input
            className="login-input"
            type="text"
            placeholder="Email Address"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        <div className="input-container">
          <FaLock className="icon" /> {/* Password icon */}
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Blue Login Button */}
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>

        <div className="social-login">
          <p>or connect with</p>
          <div className="social-icons">
            <FaFacebookF className="social-icon" />
            <FaInstagram className="social-icon" />
            <FaPinterest className="social-icon" />
            <FaLinkedinIn className="social-icon" />
          </div>
        </div>

        <FaFingerprint className="fingerprint-icon" /> {/* Fingerprint icon */}
      </div>
    </div>
  );
};

export default Login;

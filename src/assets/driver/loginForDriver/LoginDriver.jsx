// LoginDriver.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import './Login.css';

function LoginDriver({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleDriverLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7046/api/Auth/loginDriver', {
        userEmail: email,
        password: password,
      });

      const { isSuccess, result, errorMessage } = response.data;

      if (isSuccess) {
        const decoded = jwtDecode(result);
        localStorage.setItem('token', result);
        localStorage.setItem('driverId', decoded.DriverId);

        setMessage('Login successful! Redirecting...');
        setTimeout(() => navigate('/driver'), 1000);
      } else {
        setMessage(errorMessage || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Driver Login error:', error);
      setMessage('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Driver Login</h2>
      <form onSubmit={handleDriverLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <div className="message-box">{message}</div>}
    </div>
  );
}

export default LoginDriver;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7046/api/Auth/login', {
        userEmail: email,
        password: password,
      });

      const { statusCode, isSuccess, result, errorMessage } = response.data;

      if (isSuccess && result) {
        onLogin(result); // Truyền token lên App.js
        setMessage('Login successful! Redirecting...');
      } else {
        setMessage(errorMessage || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
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
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
}

export default Login;

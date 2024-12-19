import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isDriverLogin, setIsDriverLogin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiEndpoint = isDriverLogin
      ? 'https://localhost:7046/api/Auth/loginDriver'
      : 'https://localhost:7046/api/Auth/login';

    try {
      const response = await axios.post(apiEndpoint, {
        userEmail: email,
        password: password,
      });

      const { statusCode, isSuccess, result, errorMessage } = response.data;

      if (isSuccess && result) {
        if (isDriverLogin) {
          const decoded = jwtDecode(result);
          sessionStorage.setItem('token', result);
          sessionStorage.setItem('driverId', decoded.DriverId);
          sessionStorage.setItem('driverName', decoded.FullName); // Ensure this matches the key in the token
          setTimeout(() => navigate('/driver'), 1000);
        } else {
          onLogin(result);
          setTimeout(() => navigate('/'), 1000);
        }

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
      <h2>{isDriverLogin ? 'Login for Driver' : 'Login Page'}</h2>
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
        <button
          type="button"
          className="switch-role-button"
          onClick={() => setIsDriverLogin(!isDriverLogin)}
        >
          {isDriverLogin ? 'Switch to Customer Login' : 'Switch to Driver Login'}
        </button>
      </form>
      {message && <div className="message-box">{message}</div>}
      {!isDriverLogin && (
        <p>
          Don’t have an account?{' '}
          <a href="/register" className="register-link-text">
            Register here
          </a>
        </p>
      )}
    </div>
  );
}

export default Login;

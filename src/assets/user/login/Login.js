import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import LoginDriver from '../../driver/loginForDriver/LoginDriver';

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isDriverLogin, setIsDriverLogin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7046/api/Auth/login', {
        userEmail: email,
        password: password,
      });

      if (response.data.isSuccess) {
        const token = response.data.result; // Token trả về từ API
        localStorage.setItem('token', token); // Lưu token vào localStorage
        
        setMessage('Login successful!');
        setIsLoggedIn(true); // Cập nhật trạng thái đăng nhập
        setTimeout(() => navigate('/home'), 1000); // Chuyển hướng sau 1 giây
      } else {
        setMessage('Login failed: ' + (response.data.errorMessage || 'Unknown error'));
      }
    } catch (error) {
      console.error(error);
      setMessage('Error: Unable to connect to server.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      {!isDriverLogin ? (
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
      ): (
        <LoginDriver setIsLoggedIn={setIsLoggedIn}/>
      )}
      {message && <div className="message-box">{message}</div>}
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
      <button onClick={() => setIsDriverLogin(!isDriverLogin)}>  
      {isDriverLogin ? 'Login' : 'Login For Driver'}  
    </button>  
    </div>
  );
}

export default Login;

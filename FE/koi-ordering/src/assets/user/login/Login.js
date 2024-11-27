import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <form>
        <input type="text" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
}

export default Login;
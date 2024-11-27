import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <form>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

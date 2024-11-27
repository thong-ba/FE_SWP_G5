import React from 'react';
import './Register.css';

function Register() {
  return (
    <div className="register-container">
      <h2>Register Page</h2>
      <form>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <input type="email" placeholder="Email" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

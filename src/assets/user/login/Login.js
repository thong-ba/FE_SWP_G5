// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Login.css';
// import { loginUser } from '../../../api/AuthApi';

// function Login({ setIsLoggedIn }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { success, message } = await loginUser(email, password);

//     setMessage(message);
//     if (success) {
//       setIsLoggedIn(true); // Update login status
//       setTimeout(() => navigate('/home'), 1000); // Redirect after 1 second
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login Page</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//       {message && <div className="message-box">{message}</div>}
//       <p>
//         Don't have an account? <a href="/register">Register here</a>
//       </p>
//     </div>
//   );
// }

// export default Login;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7046/api/Auth/login', {
        userEmail: email,
        password: password,
      });

      const { statusCode, isSuccess, result, errorMessage } = response.data;

      if (isSuccess && result) {
        sessionStorage.setItem('token', result); // Lưu token vào sessionStorage
        setIsLoggedIn(true); // Cập nhật trạng thái đăng nhập
        setMessage('Login successful! Redirecting...');
        setTimeout(() => navigate('/home'), 1000); // Điều hướng sau 1 giây
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

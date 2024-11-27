import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Head/Header';
import Footer from './components/Foot/Footer';
import Login from './assets/user/login/Login';
import Register from './assets/user/register/Register';
import HomePage from './assets/user/home/HomePage'; // Import HomePage

function App() {
  return (
    <div>
      <Header />
      <Routes>
        {/* Đường dẫn mặc định Login */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Trang HomePage sau khi login */}
        <Route path="/home" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

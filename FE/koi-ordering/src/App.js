import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Head/Header';
import Footer from './components/Foot/Footer';
import Login from './assets/user/login/Login';
import Register from './assets/user/register/Register';
import HomePage from './assets/user/home/HomePage';
import BookingOrder from './assets/user/bookingorder/BookingOrder';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        {/* Đường dẫn mặc định HomePage */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/bookingorder" element={<BookingOrder />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Dùng Routes thay cho Switch
import Header from './components/Head/Header';
import Footer from './components/Foot/Footer';
import Login from './assets/user/login/Login';
import Register from './assets/user/register/Register';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

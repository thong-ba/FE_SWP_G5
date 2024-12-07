import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LayoutUtils from './assets/utils/LayoutUtils';
import axios from 'axios';

import HomePage from './assets/user/home/HomePage';
import Login from './assets/user/login/Login';
import Register from './assets/user/register/Register';
import BookingOrder from './assets/user/bookingorder/BookingOrder';
import Payment from './assets/user/payment/Payment';
import Service from './assets/user/services/Service';
import VerifyAccount from './assets/user/verify/VerifyAccount';

import Manager from './assets/manager/dashboard/Manager';
import Staff from './assets/staff/dashboard/Staff';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = sessionStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.post('https://localhost:7046/api/Auth/verify-token', { token });

          if (response.data.isValid) {
            setIsLoggedIn(true);
          } else {
            sessionStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          sessionStorage.removeItem('token');
        }
      }
    };

    checkToken();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Routes>
      <Route path="/" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><HomePage /></LayoutUtils>} />
      <Route path="/home" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><HomePage /></LayoutUtils>} />
      <Route path="/login" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><Login setIsLoggedIn={setIsLoggedIn} /></LayoutUtils>} />
      <Route path="/register" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><Register /></LayoutUtils>} />
      <Route path="/bookingorder" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><BookingOrder /></LayoutUtils>} />
      <Route path="/payment" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><Payment /></LayoutUtils>} />
      <Route path="/service" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><Service /></LayoutUtils>} />
      <Route path="/verify/:userId" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><VerifyAccount setIsLoggedIn={setIsLoggedIn} /></LayoutUtils>} />



      <Route path="/staff" element={<Staff />} />
      <Route path="/manager" element={<Manager />} />
    </Routes>
  );
}

export default App;

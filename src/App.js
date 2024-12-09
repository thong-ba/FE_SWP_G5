import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Không thêm dấu ngoặc nhọn
import LayoutUtils from './assets/utils/LayoutUtils';

import HomePage from './assets/user/home/HomePage';
import Login from './assets/user/login/Login';
import Register from './assets/user/register/Register';
import BookingOrder from './assets/user/bookingorder/BookingOrder';
import Payment from './assets/user/payment/Payment';
import Service from './assets/user/services/Service';
import UserInfo from './assets/user/userinfo/UserInfo';
import TrackOrder from './assets/user/trackorder/TrackOrder';

import VerifyAccount from './assets/user/verify/VerifyAccount';

import Manager from './assets/manager/dashboard/Manager';
import Staff from './assets/staff/dashboard/Staff';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = sessionStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000);

          if (decoded.exp > currentTime) {
            setIsLoggedIn(true);
            setUserRole(decoded.Role || null);
          } else {
            sessionStorage.removeItem('token');
          }
        } catch {
          sessionStorage.removeItem('token');
        }
      }
    };

    checkToken();
  }, []);

  const handleLogin = (token) => {
    try {
      const decoded = jwtDecode(token);
      sessionStorage.setItem('token', token);
      setIsLoggedIn(true);
      setUserRole(decoded.Role || null);

      // Điều hướng ngay sau khi đăng nhập
      if (decoded.Role === 'Manager') {
        navigate('/manager');
      } else if (decoded.Role === 'Staff') {
        navigate('/staff');
      } else {
        navigate('/home');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/home');
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
            <HomePage />
          </LayoutUtils>
        }
      />
      <Route
        path="/home"
        element={
          <LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
            <HomePage />
          </LayoutUtils>
        }
      />
      <Route
        path="/login"
        element={
          isLoggedIn ? (
            <Navigate
              to={userRole === 'Manager' ? '/manager' : userRole === 'Staff' ? '/staff' : '/home'}
            />
          ) : (
            <LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
              <Login onLogin={handleLogin} />
            </LayoutUtils>
          )
        }
      />
      <Route
        path="/register"
        element={
          <LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
            <Register />
          </LayoutUtils>
        }
      />
      <Route
        path="/bookingorder"
        element={
          isLoggedIn ? (
            <LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
              <BookingOrder />
            </LayoutUtils>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/trackorder"
        element={
          isLoggedIn ? (
            <LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
              <TrackOrder />
            </LayoutUtils>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
       <Route
        path="/payment"
        element={
          <LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
            <Payment />
          </LayoutUtils>
        }
      />
       <Route
        path="/service"
        element={
          <LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
            <Service />
          </LayoutUtils>
        }
      />
       <Route
        path="/userinfo"
        element={
          <LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
            <UserInfo />
          </LayoutUtils>
        }
      />
      
      <Route
        path="/manager"
        element={
          userRole === 'Manager' ? (
            <LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
              <Manager />
            </LayoutUtils>
          ) : (
            <Navigate to="/home" />
          )
        }
      />

      <Route
        path="/staff"
        element={
          userRole === 'Staff' ? (
            <LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
              <Staff />
            </LayoutUtils>
          ) : (
            <Navigate to="/home" />
          )
        }
      />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default App;

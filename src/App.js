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

import MapView from './assets/driver/currentlocation/MapView';

import Manager from './assets/manager/dashboard/Manager';
import Staff from './assets/staff/dashboard/Staff';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    accuracy: null,
  });
  
  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       async (position) => {
  //         const location = {
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //         };
  //         console.log("Location object: ", location);
  //         setLocation(location);

  //         if (location.latitude !== 0 && location.longitude !== 0) {
  //         try {
  //           const response = await axios.post("https://localhost:7046/api/Location/${id}", location);
  //           console.log("Location sent to API: ", response.data);
  //         }
  //         catch (error) {
  //           console.error("Error sending location to API:", error);
  //         }
  //       } else {
  //         console.error("Invalid latitude or longitude");
  //       }
  //       },
  //       (error) => {
  //         console.log("Error getting location: ", error);
  //       }
  //     );
  //   }
  //   else {
  //     console.error("Geolocation is not supported by this browser.");
  //   }
  // }, []);

  useEffect(() => {
        if (navigator.geolocation) {
            const id = navigator.geolocation.watchPosition(
            // navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                    });
                    console.log("Vị trí:", position.coords.latitude, position.coords.longitude);
                    console.log("Độ chính xác", position.coords.accuracy, "m");
                },
                (error) => {
                    console.error("Error getting location: ", error);
                },
                {
                  enableHighAccuracy: true, // Yêu cầu độ chính xác cao
                  maximumAge: 0,            // Không sử dụng vị trí cũ
                  timeout: 5000
                }
            );
            return () => navigator.geolocation.clearWatch(id);
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.post('https://localhost:7046/api/Auth/verify-token', { token });

          if (response.data.isValid) {
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          localStorage.removeItem('token');
        }
      }
    };

    checkToken();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
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


      <Route path="/staff" element={<Staff />} />
      <Route path="/manager" element={<Manager />} />
      <Route path="/driver" element={<MapView location={location} />} />
    </Routes>
  );
}

export default App;

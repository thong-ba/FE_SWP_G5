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

import MapView from './assets/driver/currentlocation/MapView';
import DriverLayout from './assets/driver/layout/DriverLayout';
import Manager from './assets/manager/dashboard/Manager';
import Staff from './assets/staff/dashboard/Staff';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // Lưu vai trò người dùng
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    accuracy: null,
  });
  const navigate = useNavigate();
  
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
                  // if (position.coords.accuracy < 50) {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                    });
                  // } 
                  // else {
                  //   console.warn("Location accuracy too low: ", position.coords.accuracy);
                  // }
                },
                (error) => {
                    console.error("Error getting location: ", error);
                },
                {
                  enableHighAccuracy: true, // Yêu cầu độ chính xác cao
                  maximumAge: 0,            // Không sử dụng vị trí cũ
                  timeout: 10000
                }
            );
            return () => navigator.geolocation.clearWatch(id);
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);


useEffect(() => {
  const checkToken = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded); // Logging decoded token for debugging
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp > currentTime) {
          setIsLoggedIn(true);

          // Dynamically find the Role key in the decoded token
          const roleKey = Object.keys(decoded).find((key) =>
            key.toLowerCase().includes("role")
          );
          setUserRole(decoded[roleKey] || null);

          console.log("User Role:", decoded[roleKey] || null);
        } else {
          sessionStorage.removeItem("token");

          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Token decoding failed:", error);
        sessionStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
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

      if (decoded.Role === 'Manager') {
        navigate('/manager');
      } else if (decoded.Role === 'SalesStaff' ) {
        navigate('/staff');
      } else if(decoded.Role === 'DeliveringStaff')
      {
        navigate('/staff');
      }
      
      else {
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
      
      {/* Routes cho manager và staff */}
      <Route
        path="/manager"
        element={
          isLoggedIn && userRole === "Manager" ? (
            <Manager />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Redirect nếu không phù hợp */}
      {/* <Route
        path="/staff"
        element={
          userRole === 'DeliveringStaff' ? (
            <LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
              <Staff />
            </LayoutUtils>
          ) : (
            <Navigate to="/home" />
          )
        }
      />
      <Route
        path="/staff"
        element={
          userRole === 'SalesStaff' ? (
            <LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
              <Staff />
            </LayoutUtils>
          ) : (
            <Navigate to="/home" />
          )
        }
      /> */}
      <Route path="*" element={<Navigate to="/home" />} />
      <Route path="/" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><HomePage /></LayoutUtils>} />
      <Route path="/home" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><HomePage /></LayoutUtils>} />
      <Route path="/login" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><Login setIsLoggedIn={setIsLoggedIn} /></LayoutUtils>} />
      <Route path="/register" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><Register /></LayoutUtils>} />
      <Route path="/bookingorder" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><BookingOrder /></LayoutUtils>} />
      <Route path="/payment" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><Payment /></LayoutUtils>} />
      <Route path="/service" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><Service /></LayoutUtils>} />
      
      <Route path="/staff" element={<Staff />} />
      <Route path="/manager" element={<Manager />} />

      <Route path="/driver" element={<DriverLayout isLoggedIn={isLoggedIn} handleLogout={handleLogout} ><MapView location={location} /> </DriverLayout>} />
    </Routes>
  );
}

export default App;



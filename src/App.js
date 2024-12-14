import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Không thêm dấu ngoặc nhọn
import LayoutUtils from './assets/utils/LayoutUtils';

import HomePage from './assets/user/home/HomePage';
import Login from './assets/user/login/Login';
import Register from './assets/user/register/Register';
import BookingOrder from './assets/user/bookingorder/BookingOrder';
import ShippingOption from './assets/user/shippingoption/ShippingOption';
import Payment from './assets/user/payment/Payment';
import Service from './assets/user/services/Service';
import UserInfo from './assets/user/userinfo/UserInfo';
import TrackOrder from './assets/user/trackorder/TrackOrder';
import UpdateProfile from './assets/user/updateprofile/UpdateProfile';

import VerifyAccount from './assets/user/verify/VerifyAccount';
import LoginDriver from './assets/driver/loginForDriver/LoginDriver';
import MapView from './assets/driver/currentlocation/MapView';
import DriverLayout from './assets/driver/layout/DriverLayout';
import Manager from './assets/manager/dashboard/Manager';
import Staff from './assets/staff/dashboard/Staff';
import PendingOrderTab from './assets/staff/order/PendingOrderTab/PendingOrderTab';
import PaymentSuccess from './assets/user/payment/paymentStatus/paymentSuccess';
import PaymentFail from './assets/user/payment/paymentStatus/paymentFail';

import TransportPage from './assets/user/transportservice/TransportService';

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

  const updateDriverLocation = async (driverId, latitude, longitude) => {
    try {
      const response = await fetch(
        `https://localhost:7046/api/Location/${driverId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            DriverId: driverId,
            Latitude: latitude,
            Longitude: longitude,
          }),
        }
      );

      if (!response.ok) {
        console.error("Failed to update driver location: ", await response.text());
      }
    } catch (error) {
      console.error("Error updating driver location: ", error);
    }
  };

  // useEffect(() => {
  //   const checkToken = () => {
  //     const token = sessionStorage.getItem("token");
  //     if (token) {
  //       try {
  //         const decoded = jwtDecode(token);
  //         console.log("Decoded token:", decoded);
  //         const currentTime = Math.floor(Date.now() / 1000);

  //         if (decoded.exp > currentTime) {
  //           setIsLoggedIn(true);

  //           // Dynamically find the Role key in the decoded token
  //           const roleKey = Object.keys(decoded).find((key) =>
  //             key.toLowerCase().includes("role")
  //           );
  //           setUserRole(decoded[roleKey] || null);

  //           console.log("User Role:", decoded[roleKey] || null);
  //         } else {
  //           sessionStorage.removeItem("token");
  //           setIsLoggedIn(false);
  //         }
  //       } catch (error) {
  //         console.error("Token decoding failed:", error);
  //         sessionStorage.removeItem("token");
  //         setIsLoggedIn(false);
  //       }
  //     } else {
  //       setIsLoggedIn(false);
  //     }
  //   };

  //   checkToken();
  // }, []);



  useEffect(() => {
    const checkToken = () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000);

          if (decoded.exp > currentTime) {
            setIsLoggedIn(true);
            const roleKey = Object.keys(decoded).find((key) =>
              key.toLowerCase().includes("role")
            );
            setUserRole(decoded[roleKey] || null);
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
      const decoded = jwtDecode(token);  // Decode the JWT token
      console.log("Decoded token:", decoded);  // Log the decoded token to inspect it
      sessionStorage.setItem('token', token);  // Store the token in session storage
      setIsLoggedIn(true);
      setUserRole(decoded.Role || null);  // Set the user role from the decoded token

      if (decoded.Role === 'Manager') {
        navigate('/manager');
      } else if (decoded.Role === 'SalesStaff') {
        navigate('/staff');
      } else if (decoded.Role === 'DeliveringStaff' ) {
        navigate('/driver');
      } else {
        navigate('/home');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };



  // const handleLogin = (token) => {
  //   try {
  //     const decoded = jwtDecode(token);
  //     sessionStorage.setItem('token', token);
  //     setIsLoggedIn(true);
  //     setUserRole(decoded.Role || null);

  //     if (decoded.Role === 'Manager') {
  //       navigate('/manager');
  //     } else if (decoded.Role === 'SalesStaff') {
  //       navigate('/staff');
  //     } else if (decoded.Role === 'Customer') {
  //       navigate('/home');
  //     }
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //   }
  // };




  // const handleDriverLogin = (token) => {
  //   try {
  //     const decoded = jwtDecode(token);
  //     sessionStorage.setItem('token', token);
  //     setIsLoggedIn(true);
  //     setUserRole(decoded.Role || null);

  //     if (decoded.Role === 'DeliveringStaff') {
  //       navigate('/driver');  // Ensure this part works as expected
  //     } else {
  //       console.error("Unauthorized role for driver login");
  //       setIsLoggedIn(false);
  //       sessionStorage.removeItem('token');
  //     }
  //   } catch (error) {
  //     console.error('Driver login failed:', error);
  //   }
  // };


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
              to={userRole === 'Manager' ? '/manager' : userRole === 'SalesStaff' ? '/staff' : '/home'}
            />
          ) : (
            <LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
              <Login onLogin={handleLogin} />
            </LayoutUtils>
          )
        }
      />
      {/* <Route
        path="/logindriver"
        element={
          isLoggedIn && userRole === 'DeliveringStaff' ? (
            <Navigate to="/driver" />
          ) : (
            <LoginDriver onLogin={handleDriverLogin} />
          )
        }
      /> */}
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
        path="/shippingoption"
        element={
          isLoggedIn ? (
            <LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
              <ShippingOption />
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
        path="/transport"
        element={
          <LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
            <TransportPage />
          </LayoutUtils>
        }
      />
      {/* 
      <Route
        path="/transport"
        element={
          <LayoutUtils>
            <TransportPage />
          </LayoutUtils>
        }
      /> */}

      <Route
        path="/updateprofile"
        element={
          <LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
            <UpdateProfile />
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
      {/* <Route
        path="/staff"
        element={
          isLoggedIn && userRole === 'SalesStaff' ? (
            <LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
              <Staff />
            </LayoutUtils>
          ) : (
            <Navigate to="/login" />
          )
        }
      /> */}






      {/* <Route path="*" element={<Navigate to="/home" />} />
      <Route path="/" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><HomePage /></LayoutUtils>} />
      <Route path="/home" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><HomePage /></LayoutUtils>} />
      <Route path="/login" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><Login setIsLoggedIn={setIsLoggedIn} /></LayoutUtils>} />
      <Route path="/register" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><Register /></LayoutUtils>} />
      <Route path="/bookingorder" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><BookingOrder /></LayoutUtils>} />
      <Route path="/shippingoption" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><ShippingOption /></LayoutUtils>} />
      <Route path="/payment" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><Payment /></LayoutUtils>} />
      <Route path="/service" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><Service /></LayoutUtils>} /> */}

      {/* <Route path="/staff" element={<Staff />} /> */}

      <Route path="/manager" element={<Manager />} />

      {/* <Route path="/driver" 
      element={<DriverLayout isLoggedIn={isLoggedIn}  handleLogout={handleLogout} ><MapView location={location} /> </DriverLayout>} /> */}

      <Route path="/driver"
        element={<DriverLayout isLoggedIn={isLoggedIn} handleLogout={handleLogout} ><MapView location={location} /> </DriverLayout>} /><Route
        path="/driver"
        element={
          isLoggedIn && userRole === "DeliveringStaff" ? (
            <DriverLayout isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
              <MapView location={location} />
            </DriverLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />



      <Route path="/paymentsuccess" element={<PaymentSuccess></PaymentSuccess>} />
      <Route path="/paymentfail" element={<PaymentFail></PaymentFail>} />

      <Route
        path="/pendingorder"
        element={
          isLoggedIn ? (
            <LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
              <PendingOrderTab />  {/* Đảm bảo bạn đã tạo và import trang PendingOrder */}
            </LayoutUtils>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

    </Routes>


  );
}

export default App;


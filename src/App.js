// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { LayoutUtils } from './assets/utils/LayoutUtils';
// import HomePage from './assets/user/home/HomePage';
// import Login from './assets/user/login/Login';
// import Register from './assets/user/register/Register';
// import BookingOrder from './assets/user/bookingorder/BookingOrder';
// import Payment from './assets/user/payment/Payment';
// import Maindex from './assets/manager/maindex/Maindex';
// import OrderManaged from './assets/manager/ordersmanaged/OrderManaged';
// import DetailOrderManaged from './assets/manager/detailordermanaged/DetailOrderManaged';

// // Bọc các component bằng LayoutUtils trước khi sử dụng trong JSX
// const HomePageWithLayout = LayoutUtils(HomePage);
// const LoginWithLayout = LayoutUtils(Login);
// const RegisterWithLayout = LayoutUtils(Register);
// const BookingOrderWithLayout = LayoutUtils(BookingOrder);
// const PaymentWithLayout = LayoutUtils(Payment);
// const MaindexWithLayout = LayoutUtils(Maindex);
// const OrderManagedWithLayout = LayoutUtils(OrderManaged);
// const DetailOrderManagedWithLayout = LayoutUtils(DetailOrderManaged);

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<HomePageWithLayout />} />
//       <Route path="/home" element={<HomePageWithLayout />} />
//       <Route path="/login" element={<LoginWithLayout />} />
//       <Route path="/register" element={<RegisterWithLayout />} />
//       <Route path="/bookingorder" element={<BookingOrderWithLayout />} />
//       <Route path="/payment" element={<PaymentWithLayout />} />
//       <Route path="/manager/maindex" element={<MaindexWithLayout />} />
//       <Route path="/manager/ordermanaged" element={<OrderManagedWithLayout />} />
//       <Route path="/manager/detailorder" element={<DetailOrderManagedWithLayout />} />
//     </Routes>
//   );
// }

// export default App;


/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */


import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import useStore from "./app/store";

import LayoutUtils from './assets/utils/LayoutUtils';
import HomePage from './assets/user/home/HomePage';
import Login from './assets/user/login/Login';
import Register from './assets/user/register/Register';
import BookingOrder from './assets/user/bookingorder/BookingOrder';
import Payment from './assets/user/payment/Payment';
import Maindex from './assets/manager/maindex/Maindex';
import OrderManaged from './assets/manager/ordersmanaged/OrderManaged';
import DetailOrderManaged from './assets/manager/detailordermanaged/DetailOrderManaged';

import ManagerLayout from './assets/manager/ManagerLayout';
import RouteManaged from './assets/manager/routemanaged/RouteManaged';
import UserManaged from './assets/manager/usermanaged/UserManaged';

import { jwtDecode } from 'jwt-decode';

function App() {
  const userInfo = useStore((state) => state.userInfo);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const logout = useStore((state) => state.logout);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      logout();
      return;
    }
      try {
        const decode = jwtDecode(token);
        console.log(decode);
        setIsLoggedIn(true);
        setUser(decode);

        if (decode.Role === "Manager") {
          navigate('/manager/maindex')
        }
      } 
      catch (error) {
        console.error("Invalid token", error);
        setIsLoggedIn(false);
        setUser(null);
      }
    }, [navigate, logout]);

  // const handleLogout = () => {
  //   Cookies.removeItem('token');
  //   setIsLoggedIn(false);
  //   setUser(null);
  // };

  return (
    <Routes>
      <Route path="/" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><HomePage /></LayoutUtils>} />
      <Route path="/home" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><HomePage /></LayoutUtils>} />
      <Route path="/login" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><Login setIsLoggedIn={setIsLoggedIn} /></LayoutUtils>} />
      <Route path="/register" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><Register /></LayoutUtils>} />
      <Route path="/bookingorder" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><BookingOrder /></LayoutUtils>} />
      <Route path="/payment" element={<LayoutUtils isLoggedIn={isLoggedIn} handleLogout={handleLogout}><Payment /></LayoutUtils>} />
      {user?.Role === 'Manager' && (
        <>
        <Route path="/manager/maindex" element={<ManagerLayout isLoggedIn={isLoggedIn} handleLogout={handleLogout}><Maindex /></ManagerLayout>} />
        <Route path="/manager/ordermanaged" element={<ManagerLayout isLoggedIn={isLoggedIn} handleLogout={handleLogout}><OrderManaged /></ManagerLayout>} />
        <Route path="/manager/transportmanaged" element={<ManagerLayout isLoggedIn={isLoggedIn} handleLogout={handleLogout}><DetailOrderManaged /></ManagerLayout>} />
        <Route path="/manager/usermanaged" element={<ManagerLayout isLoggedIn={isLoggedIn} handleLogout={handleLogout}><UserManaged /></ManagerLayout>} />
        <Route path="/manager/routemanaged" element={<ManagerLayout isLoggedIn={isLoggedIn} handleLogout={handleLogout}><RouteManaged /></ManagerLayout>} />
        </>
      )}
    </Routes>
  );
}

export default App;

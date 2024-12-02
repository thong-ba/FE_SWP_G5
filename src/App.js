import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './assets/user/login/Login';
import Register from './assets/user/register/Register';
import HomePage from './assets/user/home/HomePage';
import BookingOrder from './assets/user/bookingorder/BookingOrder';
import Payment from './assets/user/payment/Payment';
import Maindex from './assets/manager/maindex/Maindex';
import OrderManaged from './assets/manager/ordersmanaged/OrderManaged';
import DetailOrderManaged from './assets/manager/detailordermanaged/DetailOrderManaged';

function App() {
  return (
    <div>
      <Routes>
        {/* Đường dẫn mặc định HomePage */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/bookingorder" element={<BookingOrder />} />
        <Route path="/payment" element={<Payment />} />

        {/* Đây là phần dành cho quản lý*/}
        <Route path="/manager/maindex" element={<Maindex />} />
        <Route path="/manager/ordermanaged" element={<OrderManaged />} />
        <Route path="/manager/detailorder" element={<DetailOrderManaged />} />
      </Routes>
    </div>
  );
}

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LayoutUtils } from './assets/utils/LayoutUtils';
import HomePage from './assets/user/home/HomePage';
import Login from './assets/user/login/Login';
import Register from './assets/user/register/Register';
import BookingOrder from './assets/user/bookingorder/BookingOrder';
import Payment from './assets/user/payment/Payment';
import Maindex from './assets/manager/maindex/Maindex';
import OrderManaged from './assets/manager/ordersmanaged/OrderManaged';
import DetailOrderManaged from './assets/manager/detailordermanaged/DetailOrderManaged';

// Bọc các component bằng LayoutUtils trước khi sử dụng trong JSX
const HomePageWithLayout = LayoutUtils(HomePage);
const LoginWithLayout = LayoutUtils(Login);
const RegisterWithLayout = LayoutUtils(Register);
const BookingOrderWithLayout = LayoutUtils(BookingOrder);
const PaymentWithLayout = LayoutUtils(Payment);
const MaindexWithLayout = LayoutUtils(Maindex);
const OrderManagedWithLayout = LayoutUtils(OrderManaged);
const DetailOrderManagedWithLayout = LayoutUtils(DetailOrderManaged);

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePageWithLayout />} />
      <Route path="/home" element={<HomePageWithLayout />} />
      <Route path="/login" element={<LoginWithLayout />} />
      <Route path="/register" element={<RegisterWithLayout />} />
      <Route path="/bookingorder" element={<BookingOrderWithLayout />} />
      <Route path="/payment" element={<PaymentWithLayout />} />
      <Route path="/manager/maindex" element={<MaindexWithLayout />} />
      <Route path="/manager/ordermanaged" element={<OrderManagedWithLayout />} />
      <Route path="/manager/detailorder" element={<DetailOrderManagedWithLayout />} />
    </Routes>
  );
}

export default App;

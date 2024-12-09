import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

function UserInfo() {
  const [userDetails, setUserDetails] = useState({ email: '', fullname: '', role: '' });

  useEffect(() => {
    const token = sessionStorage.getItem('token'); // Lấy token từ sessionStorage

    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Giải mã token
        const email = decodedToken.Email; // Đọc email
        const fullname = decodedToken.FullName; // Đọc fullname
        const role = decodedToken.Role; // Đọc vai trò

        // Cập nhật state với thông tin người dùng
        setUserDetails({ email, fullname, role });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []); // Chạy khi component mount

  return (
    <div>
      <h1>Welcome, {userDetails.fullname}</h1>
      <p>Email: {userDetails.email}</p>
      <p>Role: {userDetails.role}</p>
    </div>
  );
}

export default UserInfo;

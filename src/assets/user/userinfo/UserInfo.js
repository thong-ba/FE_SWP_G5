import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserInfo.css';

function UserInfo() {
  const [userDetails, setUserDetails] = useState({
    email: '',
    fullname: '',
    role: '',
    phoneNumber: '',
    imgUrl: ''
  });
  const [loading, setLoading] = useState(true);  // State to track loading
  const [error, setError] = useState(null); // State to track error

  const navigate = useNavigate(); // Khởi tạo useNavigate

  useEffect(() => {
    const token = sessionStorage.getItem('token'); // Lấy token từ sessionStorage

    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Giải mã token
        const role = decodedToken.Role; // Đọc vai trò
        const fullname = decodedToken.FullName; // Đọc fullname

        // Lấy thông tin người dùng từ API
        axios.get('https://localhost:7046/api/UserAccount/GetUserProfile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then((response) => {
            const { firstName, lastName, email, phoneNumber, imgUrl } = response.data.result;
            setUserDetails({
              fullname: `${firstName} ${lastName}`,
              email,
              role,
              phoneNumber,
              imgUrl
            });
            setLoading(false);  // Set loading to false once data is loaded
          })
          .catch((error) => {
            setError('Error fetching user data');
            setLoading(false);  // Set loading to false even if there's an error
            console.error('Error fetching user data:', error);
          });

      } catch (error) {
        setError('Error decoding token');
        setLoading(false);
        console.error('Error decoding token:', error);
      }
    }
  }, []); // Chạy khi component mount

  const handleEditProfile = () => {
    navigate('/updateprofile'); // Điều hướng tới trang updateprofile
  };

  if (loading) {
    return <div>Loading...</div>;  // Show loading while fetching data
  }

  if (error) {
    return <div>{error}</div>;  // Show error message if there's an issue
  }

  return (
    <div className="user-info-container">
      <div className="user-info-header">
        <h1 className="user-info-title">Welcome, {userDetails.fullname}</h1>
      </div>
      <div className="user-info-body">
        <div className="user-info-avatar">
        <img
          src={`${process.env.PUBLIC_URL}/person.png`}
          alt="User Avatar"
          className="user-info-avatar-img"
        />
        </div>
        <div className="user-info-details">
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Role:</strong> {userDetails.role}</p>
          <p><strong>Phone Number:</strong> {userDetails.phoneNumber || 'Not available'}</p>
        </div>
      </div>
      <div className="user-info-footer">
        <button className="edit-profile-button" onClick={handleEditProfile}>Edit Profile</button>
      </div>
    </div>
  );
}

export default UserInfo;

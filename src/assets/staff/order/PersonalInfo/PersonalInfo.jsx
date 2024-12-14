import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import styles from './PersonalInfo.module.css'; // Assuming you're using a CSS module for styles

const PersonalInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // State for showing confirmation
  const navigate = useNavigate();

  // Function to retrieve user info from the JWT token
  const getUserInfoFromToken = () => {
    const token = localStorage.getItem('token'); // Assume JWT token is stored in localStorage
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the token
        setUserInfo({
          email: decoded.Email,
          userId: decoded.UserId,
          fullName: decoded.FullName,
          avatar: '/shipment.png', // Avatar image path from the public folder
        });
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  };

  // Logout function to remove token and clear user state
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setUserInfo(null); // Clear user info in state
    navigate('/'); // Redirect to home page after logout
  };

  const toggleLogoutConfirm = () => {
    setShowLogoutConfirm((prevState) => !prevState);
  };

  useEffect(() => {
    getUserInfoFromToken();
  }, []);

  if (!userInfo) {
    return <p>Loading user information...</p>;
  }

  return (
    <div className={styles.personalInfoContainer}>
      <h1>Personal Information</h1>
      <div className={styles.avatarContainer}>
        {/* Avatar Image */}
        <img src={userInfo.avatar} alt="Driver Avatar" className={styles.avatarImage} />
      </div>
      <p>Email: {userInfo.email}</p>
      <p>User ID: {userInfo.userId}</p>
      <p>Full Name: {userInfo.fullName}</p>

      {/* <button onClick={toggleLogoutConfirm} className={styles.logoutButton}>Logout</button>

      {showLogoutConfirm && (
        <div className={styles.logoutPopup}>
          <div className={styles.logoutPopupContent}>
            <h3 className={styles.logoutPopupText}>Are you sure you want to logout?</h3>
            <button onClick={handleLogout} className={styles.confirmButton}>Yes</button>
            <button onClick={toggleLogoutConfirm} className={styles.cancelButton}>No</button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default PersonalInfo;

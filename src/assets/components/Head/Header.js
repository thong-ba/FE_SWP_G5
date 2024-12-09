import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn, handleLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const confirmLogout = () => {
    handleLogout();
    setShowLogoutConfirm(false); // Ẩn popup sau khi đăng xuất
    navigate('/home');
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false); // Đóng popup nếu người dùng hủy
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src="koi-login.png" alt="Logo" className="logo-image" />
        <h1 className="logo">Koi Ordering</h1>
      </div>
      <nav className="navigation">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/home">Home</Link></li>
          <li
            className="nav-item services"
            onMouseEnter={toggleDropdown}
            onMouseLeave={toggleDropdown}
          >
            <Link to="/service">Services</Link>
            {isDropdownOpen && (
              <ul className="dropdown">
                <li className="dropdown-item"><Link to="/bookingorder">Booking Order</Link></li>
              </ul>
            )}
          </li>
          <li className="nav-item"><Link to="/track-order">Track Order</Link></li>
          <li className="nav-item"><Link to="/abouts">About Koi Fish</Link></li>
          <li className="nav-item"><Link to="/support">Support</Link></li>

          {!isLoggedIn ? (
            <>
              <li className="nav-item"><Link to="/register">Register</Link></li>
              <li className="nav-item"><Link to="/login">Login</Link></li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/userinfo">
                  <img className="user-avatar profile-icon" src="hacker.png" alt="Profile" />
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={() => setShowLogoutConfirm(true)} className="logout-button">Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Hiển thị popup xác nhận đăng xuất */}
      {showLogoutConfirm && (
        <div className="logout-popup">
          <div className="logout-popup-content">
            <h3>Are you sure you want to logout?</h3>
            <button onClick={confirmLogout} className="confirm">Yes</button>
            <button onClick={cancelLogout} className="cancel">No</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

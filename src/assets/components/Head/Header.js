import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    <header className="header-container">

      <div className="header-logo-container">
        <Link to="/home"  >
        <img src="koi-login.png" alt="Logo" className="header-logo-image" />
        </Link>
        <h1 className="header-logo-text">Koi Ordering</h1>
      </div>
      
      <nav className="header-navigation">
        <ul className="header-nav-list">
          <li className="header-nav-item">
            <Link to="/home" className="header-nav-link">Home</Link>
          </li>
          <li
            className="header-nav-item services-dropdown"
            onMouseEnter={toggleDropdown}
            onMouseLeave={toggleDropdown}
          >
            <Link to="/service" className="header-nav-link">Services</Link>
            {isDropdownOpen && (
              <ul className="header-dropdown-list">
                <li className="header-dropdown-item">
                  <Link to="/shippingoption" className="header-dropdown-link">Booking Order</Link>
                </li>
              </ul>
            )}
          </li>
          <li className="nav-item"><Link to="/trackorder">Track Order</Link></li>
          <li className="nav-item"><Link to="/abouts">About Koi Fish</Link></li>
          <li className="nav-item"><Link to="/support">Support</Link></li>
          <li className="nav-item"><Link to="/transport">Transport Fee</Link></li>

          {!isLoggedIn ? (
            <>
              <li className="header-nav-item">
                <Link to="/register" className="header-nav-link">Register</Link>
              </li>
              <li className="header-nav-item">
                <Link to="/login" className="header-nav-link">Login</Link>
              </li>
            </>
          ) : (
            <>
              <li className="header-nav-item">
                <Link to="/userinfo" className="header-nav-link">
                  <img className="header-user-avatar" src="hacker.png" alt="Profile" />
                </Link>
              </li>
              <li className="header-nav-item">
                <button onClick={() => setShowLogoutConfirm(true)} className="header-logout-button">Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Hiển thị popup xác nhận đăng xuất */}
      {showLogoutConfirm && (
        <div className="header-logout-popup">
          <div className="header-logout-popup-content">
            <h3 className="header-logout-popup-text">Are you sure you want to logout?</h3>
            <button onClick={confirmLogout} className="header-confirm-button">Yes</button>
            <button onClick={cancelLogout} className="header-cancel-button">No</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

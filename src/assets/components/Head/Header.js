import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn, handleLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
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
          <li className="nav-item services" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
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
                <Link to="/profile">
                  <img className="user-avatar profile-icon" src="hacker.png" alt="Profile" />
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

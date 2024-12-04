import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HeaderManager.css';

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
        <ul>
          <li  ><Link to="/home">Home</Link></li>
          <li className="services" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
            <Link to="/services">Transport Service</Link>
            {isDropdownOpen && (
              <ul className="dropdown">
                <li  ><Link to="/internationalTransport">International Transport</Link></li>
                <li  ><Link to="/localTransport">Local Transport</Link></li>
                <li  ><Link to="/domesticTransport">Domestic Transport</Link></li>
              </ul>
            )}
          </li>
          <li  ><Link to="/track-order">Track Order</Link></li>
          <li   ><Link to="/abouts">About Koi Fish</Link></li>
          <li  ><Link to="/support">Support</Link></li>

          {!isLoggedIn ? (
            <>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          ) : (
            <>
              <li>
                <Link to="/profile">
                  <img className="user-avatar profile-icon" src="hacker.png" alt="Profile" />
                </Link>
              </li>
              <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

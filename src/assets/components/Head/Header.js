// Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({ isLoggedIn, handleLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const confirmLogout = () => {
    handleLogout();
    setShowLogoutConfirm(false);
    navigate('/home');
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <Link to="/home">
          <img src="koi-login.png" alt="Logo" className={styles.logoImage} />
        </Link>
        <h1 className={styles.logoText}>Koi Ordering</h1>
      </div>

      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/home" className={styles.navLink}>Home</Link>
          </li>
          <li
            className={`${styles.navItem} ${styles.dropdown}`}
            onMouseEnter={toggleDropdown}
            onMouseLeave={toggleDropdown}
          >
            <Link to="/service" className={styles.navLink}>Services</Link>
            {isDropdownOpen && (
              <ul className={styles.dropdownList}>
                <li className={styles.dropdownItem}>
                  <Link to="/shippingoption" className={styles.dropdownLink}>Booking Order</Link>
                </li>
              </ul>
            )}
          </li>
          <li className={styles.navItem}><Link to="/trackorder" className={styles.navLink}>Track Order</Link></li>
          {/* <li className={styles.navItem}><Link to="/transport" className={styles.navLink}>Transport Fee</Link></li> */}
          <li className={styles.navItem}><Link to="/abouts" className={styles.navLink}>About Koi Fish</Link></li>
          <li className={styles.navItem}><Link to="/support" className={styles.navLink}>Support</Link></li>


          {!isLoggedIn ? (
            <>
              <li className={styles.navItem}><Link to="/register" className={styles.navLink}>Register</Link></li>
              <li className={styles.navItem}><Link to="/login" className={styles.navLink}>Login</Link></li>
            </>
          ) : (
            <>
              <li className={styles.navItem}>
                <Link to="/userinfo" className={styles.navLink}>
                  <img src="hacker.png" alt="Profile" className={styles.userAvatar} />
                </Link>
              </li>
              <li className={styles.navItem}>
                <button onClick={() => setShowLogoutConfirm(true)} className={styles.logoutButton}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>

      {showLogoutConfirm && (
        <div className={styles.logoutPopup}>
          <div className={styles.logoutPopupContent}>
            <h3 className={styles.logoutPopupText}>Are you sure you want to logout?</h3>
            <button onClick={confirmLogout} className={styles.confirmButton}>Yes</button>
            <button onClick={cancelLogout} className={styles.cancelButton}>No</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

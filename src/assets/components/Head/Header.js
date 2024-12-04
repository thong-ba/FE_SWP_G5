

// import React, { useState } from 'react';
// import './Header.css';

// const Header = () => {
//     const [showDropdown, setShowDropdown] = useState(false);

//     const handleMouseEnter = () => {
//         setShowDropdown(true);
//     };

//     const handleMouseLeave = () => {
//         setShowDropdown(false);
//     };

//     return (
//         <header className="header">
//             <div className="logo-container">
//                 <img src="koi-login.png" alt="Logo" className="logo-image" /> 
//                 <h1 className="logo">Koi Ordering</h1>
//             </div>
//             <nav className="navigation">
//                 <ul>
//                     <li><a href="/home">Home</a></li>
//                     <li
//                         onMouseEnter={handleMouseEnter}
//                         onMouseLeave={handleMouseLeave}
//                     >
//                         <a href="/services">Services</a>
//                         {showDropdown && (
//                             <ul className="dropdown">
//                                 <li><a href="/bookingorder">Booking Order</a></li>
//                                 <li><a href="/service2">Service 2</a></li>
//                             </ul>
//                         )}
//                     </li>
//                     <li><a href="/track-order">Track Order</a></li>
//                     <li><a href="/abouts">About Koi Fish</a></li>
//                     <li><a href="/support">Support</a></li>
//                     <li><a href="/register">Register</a></li>
//                     <li><a href="/login">Login</a></li>
//                 </ul>
//             </nav>
//         </header>
//     );
// };

// export default Header;


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
        <ul>
          <li  ><Link to="/home">Home</Link></li>
          <li className="services" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
            <Link to="/services">Services</Link>
            {isDropdownOpen && (
              <ul className="dropdown">
                <li  ><Link to="/bookingorder">Booking Order</Link></li>
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

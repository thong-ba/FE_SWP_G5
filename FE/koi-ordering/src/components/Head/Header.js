// import React from 'react';
// import { Link } from 'react-router-dom'; 

// function Header() {
//   return (
//     <header>
//       <nav>
//         <ul>
//           <li><Link to="/login">Login</Link></li>
//           <li><Link to="/register">Register</Link></li>
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default Header;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Header.css';

// const Header = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <header className="header">
//       <div className="header-container">
//         {/* Left section: Logo */}
//         <div className="logo">
//           <img src="koi-login.png" alt="Logo" className="site-logo" />
//         </div>

//         {/* Right section: Website name, Navigation, and Search */}
//         <div className="header-right">
//           {/* Website name */}
//           <div className="site-name">
//             <Link to="/">Koi Ordering</Link>
//           </div>

//           {/* Navigation links */}
//           <nav className="nav-links">
//             <ul>
//               <li><Link to="/home">Home</Link></li>
//               <li className="dropdown">
//                 <Link to="/services" onClick={toggleDropdown}>Services</Link>
//                 {isDropdownOpen && (
//                   <div className="dropdown-content">
//                     <Link to="/service1">Service 1</Link>
//                     <Link to="/service2">Service 2</Link>
//                     <Link to="/service3">Service 3</Link>
//                   </div>
//                 )}
//               </li>
//               <li><Link to="/track">Track Order</Link></li>
//               <li><Link to="/policies">Policies</Link></li>
//               <li><Link to="/support">Support</Link></li>
//             </ul>
//           </nav>

//           {/* Search bar */}
//           <div className="search-box">
//             <input type="text" placeholder="Search..." />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Header.css';

// const Header = ({ isLoggedIn, userName }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <header className="header">
//       <div className="header-container">
//         {/* Column 1: Logo */}
//         <div className="logo">
//           <img src="koi-login.png" alt="Logo" className="site-logo" />
//         </div>

//         {/* Column 2: Website name */}
//         <div className="site-name">
//           <Link to="/">Koi Ordering</Link>
//         </div>

//         {/* Columns 3-7: Navigation */}
//         <nav className="nav-links">
//           <ul>
//             <li><Link to="/">Home</Link></li>
//             <li className="dropdown">
//               <Link to="#" onClick={toggleDropdown}>Services</Link>
//               {isDropdownOpen && (
//                 <div className="dropdown-content">
//                   <Link to="/service1">Service 1</Link>
//                   <Link to="/service2">Service 2</Link>
//                 </div>
//               )}
//             </li>
//             <li><Link to="/track-order">Track Order</Link></li>
//             <li><Link to="/policies">Policies</Link></li>
//             <li><Link to="/support">Support</Link></li>
//           </ul>
//         </nav>

//         {/* Column 8: Register */}
//         <div className="auth-link">
//           {!isLoggedIn && <Link to="/register">Register</Link>}
//         </div>

//         {/* Columns 9-11: Login/Logout */}
//         {isLoggedIn ? (
//           <>
//             <div className="user-name">Hello, {userName}</div>
//             <div className="logout">
//               <Link to="/logout">Logout</Link>
//             </div>
//           </>
//         ) : (
//           <div className="login">
//             <Link to="/login">Login</Link>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;




import React, { useState } from 'react';
import './Header.css';

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleMouseEnter = () => {
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        setShowDropdown(false);
    };

    return (
        <header className="header">
            <div className="logo-container">
                <img src="koi-login.png" alt="Logo" className="logo-image" /> {/* Đường dẫn đến hình ảnh */}
                <h1 className="logo">Koi Ordering</h1>
            </div>
            <nav className="navigation">
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li 
                        onMouseEnter={handleMouseEnter} 
                        onMouseLeave={handleMouseLeave}
                    >
                        <a href="/services">Services</a>
                        {showDropdown && (
                            <ul className="dropdown">
                                <li><a href="/service1">Service 1</a></li>
                                <li><a href="/service2">Service 2</a></li>
                            </ul>
                        )}
                    </li>
                    <li><a href="/track-order">Track Order</a></li>
                    <li><a href="/policies">Policies</a></li>
                    <li><a href="/support">Support</a></li>
                    <li><a href="/register">Register</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;


// import React, { useState } from 'react';
// import './Header.css';

// const Header = ({ isLoggedIn, userName }) => {
//     const [showDropdown, setShowDropdown] = useState(false);

//     const handleMouseEnter = () => setShowDropdown(true);
//     const handleMouseLeave = () => setShowDropdown(false);

//     return (
//         <header className="header">
//             <div className="logo-container">
//                 <img src="koi-login.png" alt="Logo" className="logo-image" />
//                 <h1 className="logo">Koi Ordering</h1>
//             </div>

//             <nav className="navigation">
//                 <ul>
//                     <li><a href="/home">Home</a></li>
//                     <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//                         <a href="/services">Services</a>
//                         {showDropdown && (
//                             <ul className="dropdown">
//                                 <li><a href="/service1">Service 1</a></li>
//                                 <li><a href="/service2">Service 2</a></li>
//                             </ul>
//                         )}
//                     </li>
//                     <li><a href="/track-order">Track Order</a></li>
//                     <li><a href="/policies">Policies</a></li>
//                     <li><a href="/support">Support</a></li>
//                     {/* Kiểm tra trạng thái đăng nhập */}
//                     {isLoggedIn ? (
//                         <>
//                             <li className="user-icon">
//                                 <div className="circle-icon">{userName[0]}</div>
//                             </li>
//                             <li><a href="/logout" className="logout-btn">Logout</a></li>
//                         </>
//                     ) : (
//                         <>
//                             <li><a href="/register">Register</a></li>
//                             <li><a href="/login">Login</a></li>
//                         </>
//                     )}
//                 </ul>
//             </nav>
//         </header>
//     );
// };

// export default Header;

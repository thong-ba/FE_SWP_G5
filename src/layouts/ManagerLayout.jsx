import React from 'react';
import HeaderManager from '../assets/components/Head/HeadManager/HeaderManager';
import Footer from '../assets/components/Foot/Footer';

const LayoutUtils = ({ children, isLoggedIn, handleLogout }) => {
  return (
    <div className="page-container">
      <HeaderManager isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};

export default LayoutUtils;

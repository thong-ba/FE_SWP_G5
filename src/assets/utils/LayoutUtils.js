import React from 'react';
import Header from '../../assets/components/Head/Header';
import Footer from '../../assets/components/Foot/Footer';
import './LayoutUtils.css';

const LayoutUtils = ({ children, isLoggedIn, handleLogout }) => {
  return (
    <div className="page-container">
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};

export default LayoutUtils;

import React from 'react';
import Header from '../../assets/components/Head/Header';
import Footer from '../../assets/components/Foot/Footer';
import './LayoutUtils.css';

export const LayoutUtils = (Component) => {
  return () => (
    <div className="page-container">
      <Header />
      <div className="content">
        <Component />
      </div>
      <Footer />
    </div>
  );
};

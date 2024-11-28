import React from 'react';
import './LayoutUtils.css';

export const LayoutUtils = (Component) => {
  return () => (
    <div className="page-container">
      <header className="header">Header</header>
      <main className="content">
        <Component />
      </main>
      <footer className="footer">Footer</footer>
    </div>
  );
};

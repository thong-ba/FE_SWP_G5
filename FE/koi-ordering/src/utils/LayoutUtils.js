
import React from 'react';

export const LayoutUtils = (Component) => {
  return () => (
    <div className="layout">
      <div className="header">Header</div>
      <div className="content">
        <Component />
      </div>
      <div className="footer">Footer</div>
    </div>
  );
};

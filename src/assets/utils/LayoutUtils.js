import React from 'react';
import './LayoutUtils.css';

export const LayoutUtils = (Component) => {
  return () => (
    <div className="content">
      <Component />
    </div>
  );
};
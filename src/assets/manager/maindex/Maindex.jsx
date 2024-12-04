import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Maindex.css';

function Maindex() {
  const navigate = useNavigate();

  return (
    <div className="maindex-container">
      <h1 className="maindex-title">Manager Dashboard</h1>
      <div className="button-group">
        <button className="manage-button" onClick={() => navigate('/manager/ordermanaged')}>
          Order Management
        </button>
        <button className="manage-button" onClick={() => navigate('/manager/transportmanaged')}>
          Transport Management
        </button>
        <button className="manage-button" onClick={() => navigate('/manager/drivermanaged')}>
          Driver Management
        </button>
        <button className="manage-button" onClick={() => navigate('/manager/routemanaged')}>
          Route Management
        </button>
      </div>
    </div>
  );
}

export default Maindex;

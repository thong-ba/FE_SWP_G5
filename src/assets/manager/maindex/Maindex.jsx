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
          Quản lý đơn đặt hàng
        </button>
        <button className="manage-button" onClick={() => navigate('/manager/warehouse-staff')}>
          Quản lý nhân viên kho
        </button>
        <button className="manage-button" onClick={() => navigate('/manager/drivers')}>
          Quản lý tài xế vận chuyển
        </button>
      </div>
    </div>
  );
}

export default Maindex;

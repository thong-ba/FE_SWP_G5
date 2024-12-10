import React, { useState } from 'react';
import './Staff.css';

function Staff() {
  const [activeTab, setActiveTab] = useState('pendingOrders');
  const [isLogoutDialogVisible, setIsLogoutDialogVisible] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'pendingOrders':
        return <OrderTable status="Pending Orders" />;
      case 'processingOrders':
        return <OrderTable status="Processing Orders" />;
      case 'completedOrders':
        return <OrderTable status="Completed Orders" />;
      case 'personalInfo':
        return <PersonalInfo onLogout={handleLogout} />;
      default:
        return <div>Select a tab to view information</div>;
    }
  };

  const handleLogoutDialog = () => {
    setIsLogoutDialogVisible(true);
  };

  const handleLogout = () => {
    setIsLogoutDialogVisible(false);
    // Perform the actual logout operation here
    alert('Logged out successfully');
    // Redirect to home page
    window.location.href = '/';
  };

  return (
    <div className="staff-container">
      <div className="staff-sidebar">
        <h3>Staff Dashboard</h3>
        <ul>
          <li>
            <button
              onClick={() => setActiveTab('pendingOrders')}
              className={activeTab === 'pendingOrders' ? 'active' : ''}
            >
              Pending Orders
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('processingOrders')}
              className={activeTab === 'processingOrders' ? 'active' : ''}
            >
              Processing Orders
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('completedOrders')}
              className={activeTab === 'completedOrders' ? 'active' : ''}
            >
              Completed Orders
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('personalInfo')}
              className={activeTab === 'personalInfo' ? 'active' : ''}
            >
              Personal Info
            </button>
          </li>
        </ul>
      </div>
      <div className="staff-content">{renderContent()}</div>

      {isLogoutDialogVisible && (
        <div className="logout-dialog">
          <div className="logout-dialog-content">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>
            <button onClick={handleLogout} className="btn-confirm-logout">Confirm</button>
            <button onClick={() => setIsLogoutDialogVisible(false)} className="btn-cancel-logout">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

function OrderTable({ status }) {
  const orders = [
    { id: 1, code: 'ORD001', name: 'Order 1', from: 'Hanoi', to: 'HCM', status: status, driver: 'Driver A' },
    { id: 2, code: 'ORD002', name: 'Order 2', from: 'Da Nang', to: 'Hanoi', status: status, driver: 'Driver B' },
    // Add more orders as needed
  ];

  return (
    <div>
      <h2>{status}</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>MÃ ĐƠN HÀNG</th>
            <th>TÊN ĐƠN HÀNG</th>
            <th>VỊ TRÍ GIAO TỪ</th>
            <th>VỊ TRÍ NHẬN TỪ</th>
            <th>TRẠNG THÁI</th>
            <th>OTHER</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.code}</td>
              <td>{order.name}</td>
              <td>{order.from}</td>
              <td>{order.to}</td>
              <td>{order.status}</td>
              <td>
                <button className="btn-detail">Xem chi tiết</button>
                <button className="btn-confirm">Xác nhận</button>
                <button className="btn-cancel">Hủy</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PersonalInfo({ onLogout }) {
  return (
    <div className="personal-info-container">
      <div className="personal-info-image">
        <img src="person.png" alt="Profile" />
      </div>
      <div className="personal-info-details">
        <h2>Personal Info</h2>
        <p><strong>Họ và tên:</strong> John Doe</p>
        <p><strong>Mã tài xế:</strong> TX12345</p>
        <p><strong>Giới tính:</strong> Nam</p>
        <p><strong>Số điện thoại:</strong> 123-456-7890</p>
        <p><strong>Email:</strong> johndoe@example.com</p>
        <p><strong>Địa chỉ nhà:</strong> 123 Main Street, City, Country</p>
        <div className="personal-info-buttons">
          <button className="btn-edit">Edit</button>
          <button className="btn-logout" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Staff;

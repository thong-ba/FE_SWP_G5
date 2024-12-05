import React, { useState } from 'react';
import './Staff.css';

function Staff() {
  const [activeTab, setActiveTab] = useState('pendingOrders');

  const renderContent = () => {
    switch (activeTab) {
      case 'pendingOrders':
        return <PendingOrders />;
      case 'processingOrders':
        return <ProcessingOrders />;
      case 'completedOrders':
        return <CompletedOrders />;
      case 'personalInfo':
        return <PersonalInfo />;
      default:
        return <div>Select a tab to view information</div>;
    }
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
    </div>
  );
}

function PendingOrders() {
  return (
    <div>
      <h2>Pending Orders</h2>
      <p>List of pending orders...</p>
    </div>
  );
}

function ProcessingOrders() {
  return (
    <div>
      <h2>Processing Orders</h2>
      <p>List of orders being processed...</p>
    </div>
  );
}

function CompletedOrders() {
  return (
    <div>
      <h2>Completed Orders</h2>
      <p>List of completed orders...</p>
    </div>
  );
}

function PersonalInfo() {
  return (
    <div>
      <h2>Personal Info</h2>
      <p>Name: John Doe</p>
      <p>Email: johndoe@example.com</p>
      <p>Phone: 123-456-7890</p>
    </div>
  );
}

export default Staff;

import React, { useState } from 'react';
import TransportService from '../transportservice/TransportService.jsx';
import AccountManagement from '../accountmanage/AccountManager.jsx';
// import AddtionalService from '../additionalservice/AdditionalService.jsx';
import OrderManagement from '../order/OrderManagement.jsx';
import Profile from '../profile/Profile.jsx';
// import RouteManagement from '../route/RouteManagement.jsx';
import { Modal } from 'antd'; // Import Modal from antd
import NewDriver from '../newdriver/NewDriver.jsx';
import './Manager.css';


function Manager() {
  const [activeComponent, setActiveComponent] = useState('profile');
  const [selectedTransportId, setSelectedTransportId] = useState(null);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [selectedAdditionalServiceId, setSelectedAdditionalServiceId] = useState(null);
  // const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleAccountClick = (accountId) => {
    setSelectedAccountId(accountId);
    setActiveComponent('accountManagement'); // Ensure it sets the correct active component
  };

  const handleDetailClick = (transportId) => {
    setSelectedTransportId(transportId);
    setActiveComponent('transportServiceDetails');
  };

  const renderContent = () => {
    switch (activeComponent) {
      case 'transportService':
        return <TransportService onDetailClick={handleDetailClick} />;
      case 'accountManagement':
        return <AccountManagement selectedAccountId={selectedAccountId} />;
      // case 'additionalserviceManagement':
      //   return <AddtionalService selectedAdditionalServiceId={selectedAdditionalServiceId} />;
      case 'profile':
        return <Profile />;
      case 'orderManagement':
        return <OrderManagement selectedOrderId={selectedOrderId} />;
      case 'newdriver':
        return <NewDriver />;
      default:
        return (
          <div>
            <h2>Welcome to Your Account</h2>
            <p>Select an option from the sidebar to view details.</p>
          </div>
        );
    }
  };

  const handleLogout = () => {
    Modal.confirm({
      className: 'custom-modal',
      title: 'Confirm Logout',
      content: 'Are you sure you want to log out?',
      onOk() {
        sessionStorage.clear();
        window.location.href = '/login'; // Change '/login' to your desired redirect URL
      },
      okButtonProps: {
        className: 'custom-ok-button',
      },
      cancelButtonProps: {
        className: 'custom-cancel-button',
      },
    });
  };

  return (
    <div className="account-management">
      <div className="sidebar">
        <h3>Manager</h3>
        <ul>
          <li>
            <button onClick={() => setActiveComponent('analytics')} className={activeComponent === 'analytics' ? 'active' : ''}>
              Analytics
            </button>
          </li>
          <li>
            <button onClick={() => setActiveComponent('profile')} className={activeComponent === 'profile' ? 'active' : ''}>
              Profile
            </button>
          </li>
          <li>
            <button onClick={() => setActiveComponent('newdriver')} className={activeComponent === 'newdriver' ? 'active' : ''}>
              New Driver
            </button>
          </li>
          <li>
            <button onClick={() => setActiveComponent('orderManagement')} className={activeComponent === 'orderManagement' ? 'active' : ''}>
              Manage Orders
            </button>
          </li>
          <li>
            <button onClick={() => setActiveComponent('transportService')} className={activeComponent === 'transportService' ? 'active' : ''}>
              Manage Transport Service
            </button>
          </li>
          <li>
            <button onClick={() => handleAccountClick('accountManagement')} className={activeComponent === 'accountManagement' ? 'active' : ''}>
              Manage Accounts
            </button>
          </li>
          {/* <li>
            <button onClick={() => handleAccountClick('additionalserviceManagement')} className={activeComponent === 'additionalserviceManagement' ? 'active' : ''}>
              Manage Additional Service
            </button>
          </li> */}
          {/* <li>
            <button onClick={() => setActiveComponent('managerRoute')} className={activeComponent === 'manageRoute' ? 'active' : ''}>
              Manage Route
            </button>
          </li> */}
          <li>
            <button onClick={handleLogout} className={activeComponent === 'logout' ? 'active' : ''}>
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div className="content-manager">
        {renderContent()}
      </div>
    </div>
  );
}

export default Manager;
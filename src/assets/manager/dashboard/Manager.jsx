import React, { useState } from 'react';
// import ProfilePage from '../profilepage';
import TransportService from '../transportservice/TransportService.jsx';
import AccountManagement from '../accountmanage/AccountManager.jsx';
import AddtionalService from '../additionalservice/AdditionalService.jsx'
import OrderManagement from '../order/OrderManagement.jsx'
// import ManageRoute from './manageroute';
// import Analytics from './analytics';
import './Manager.css';
import { Modal } from 'antd'; // Import Modal from antd
function Manager() {
  const [activeComponent, setActiveComponent] = useState('profile');
  const [selectedTransportId, setSelectedTransportId] = useState(null);
  const [selectedAccountId, setSelectedAccountId] = useState(null); // New state for selected account
  const [selectedAdditionalServiceId, setSelectedAdditionalServiceId] = useState(null); // New state for selected account
  // const [selectedRouteId, setSelectedRouteId] = useState(null); // New state for selected route 
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleAccountClick = (accountId) => { // Updated function for account management
    setSelectedAccountId(accountId);
    setActiveComponent(accountId);
  };

  const handleDetailClick = (transportId) => { // Added function to handle detail clicks
    setSelectedTransportId(transportId);
    setActiveComponent('transportServiceDetails'); // Update active component to show details
  };

  const renderContent = () => {
    switch (activeComponent) {
      // case 'profile':
      //   return <ProfilePage />;
      case 'transportService':
        return <TransportService onDetailClick={handleDetailClick} />;
      case 'accountManagement': // New case for account management
        return <AccountManagement selectedAccountId={selectedAccountId} />;
      case 'additionalserviceManagement': // Updated case for additional service management
        return <AddtionalService selectedAdditionalServiceId={selectedAdditionalServiceId} />; // Pass the selected ID to the component
      // case 'manageRoute':
      //   return <ManageRoute />;
      case 'orderManagement':
        return <OrderManagement selectedOrderId={selectedAccountId} />
      // case 'analytics':
      //   return <Analytics />;
      default:
        return (
          <div>
            <h2>Welcome to Your Account</h2>
            <p>Select an option from the sidebar to view details.</p>
          </div>
        );
    }
  };

  return (
    <div>
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
            <li>
              <button onClick={() => handleAccountClick('additionalserviceManagement')} className={activeComponent === 'additionalserviceManagement' ? 'active' : ''}>
                Manage Additional Service
              </button>
            </li>
            <li>
              <button onClick={() => setActiveComponent('manageRoute')} className={activeComponent === 'manageRoute' ? 'active' : ''}>
                Manage Route
              </button>
            </li>
            <li>
              <button onClick={() => {
                Modal.confirm({
                  className: 'custom-modal', // Custom modal class
                  title: 'Confirm Logout',
                  content: 'Are you sure you want to log out?',
                  onOk() {
                    // Call the logout logic directly
                    sessionStorage.clear(); // Clear session storage
                    window.location.href = '/login'; // Change '/login' to your desired redirect URL
                  },
                  okButtonProps: {
                    className: 'custom-ok-button', // Custom class for OK button
                  },
                  cancelButtonProps: {
                    className: 'custom-cancel-button', // Custom class for Cancel button
                  },
                });
              }} className={activeComponent === 'logout' ? 'active' : ''}>
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="content-manager">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Manager;
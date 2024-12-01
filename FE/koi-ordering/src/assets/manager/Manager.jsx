import React, { useState } from 'react';
// import ProfilePage from '../profilepage';
// import TransportService from './transportservice';
import AccountManagement from './accounts/AccountManager.jsx';
import AddtionalService from './additionalservices/AdditionalServices.jsx'
// import ManageRoute from './manageroute';
// import Analytics from './analytics';
import './Manager.css';
import { Modal } from 'antd'; // Import Modal from antd
function Manager() {
  const [activeComponent, setActiveComponent] = useState('profile');
  // const [selectedTransportId,   setSelectedTransportId] = useState(null);
  const [selectedAccountId, setSelectedAccountId] = useState(null); // New state for selected account
  const [selectedAdditionalServiceId, setSelectedAdditionalServiceId] = useState(null); // New state for selected account
  // const [selectedRouteId, setSelectedRouteId] = useState(null); // New state for selected route 

  const handleAccountClick = (accountId) => { // Updated function for account management
    setSelectedAccountId(accountId);
    setActiveComponent(accountId);
  };



  const renderContent = () => {
    switch (activeComponent) {
      // case 'profile':
      //   return <ProfilePage />;
      // case 'transportService':
      //   return <TransportService onDetailClick={handleDetailClick} />;
      case 'accountManagement': // New case for account management
        return <AccountManagement selectedAccountId={selectedAccountId} />;
      case 'additionalserviceManagement': // Updated case for additional service management
        return <AddtionalService selectedAdditionalServiceId={selectedAdditionalServiceId} />; // Pass the selected ID to the component
      // case 'manageRoute':
      //   return <ManageRoute />;
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
                  title: 'Confirm Logout',
                  content: 'Are you sure you want to log out?',
                  onOk() {
                    // Call the logout logic directly
                    sessionStorage.clear(); // Clear session storage
                    window.location.href = '/login'; // Change '/login' to your desired redirect URL
                  },
                });
              }} className={activeComponent === 'logout' ? 'active' : ''}>
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Manager;
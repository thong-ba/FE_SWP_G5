import React, { useState } from "react";
import "./Staff.css";
import PendingOrderTab from "../order/PendingOrderTab/PendingOrderTab";
import StaffProfile from "./StaffProfile";  
import CompletedOrderTab from "../order/CompletedOrderTab/CompletedOrderTab";  // Import the CompletedOrderTab component

function Staff() {
  const [activeTab, setActiveTab] = useState("pendingOrders");
  const [isLogoutDialogVisible, setIsLogoutDialogVisible] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "pendingOrders":
        return <PendingOrderTab />;
      case "staffProfile":
        return <StaffProfile />;
      case "completedOrders":  // Add case for "completedOrders"
        return <CompletedOrderTab />;
      default:
        return <div>Select a tab to view information</div>;
    }
  };

  const handleLogoutDialog = () => {
    setIsLogoutDialogVisible(true);
  };

  const handleLogout = () => {
    setIsLogoutDialogVisible(false);
    alert("Logged out successfully");
    window.location.href = "/";
  };

  return (
    <div className="staff-container">
      <div className="staff-sidebar">
        <h3>Staff Dashboard</h3>
        <ul>
          <li>
            <button
              onClick={() => setActiveTab("pendingOrders")}
              className={activeTab === "pendingOrders" ? "active" : ""}
            >
              Pending Orders
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("completedOrders")}  // Add "Complete Order" tab
              className={activeTab === "completedOrders" ? "active" : ""}
            >
              Complete Orders
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("staffProfile")}
              className={activeTab === "staffProfile" ? "active" : ""}
            >
              Staff Profile
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
            <button onClick={handleLogout} className="btn-confirm-logout">
              Confirm
            </button>
            <button
              onClick={() => setIsLogoutDialogVisible(false)}
              className="btn-cancel-logout"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Staff;

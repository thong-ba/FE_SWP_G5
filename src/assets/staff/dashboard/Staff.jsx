import React, { useEffect, useState } from "react";
import "./Staff.css";
import getPendingOrder from "../order/getOrder/getOrder";
import axios from "axios";
import Route from "../route/Route";
import PendingOrderTab from "../order/PendingOrderTab/PendingOrderTab";
import PendingPickUpOrderTab from "../order/PendingPickUpOrderTab/PendingPickUpOrderTab";
import CompletedOrderTab from "../order/CompletedOrderTab/CompletedOrderTab";
import CancelOrderTab from "../order/CancelOrderTab/CancelOrderTab";

function Staff() {
  const [activeTab, setActiveTab] = useState("pendingOrders");
  const [isLogoutDialogVisible, setIsLogoutDialogVisible] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "pendingOrders":
        return <PendingOrderTab />;
      case "pendingPickUpOrders":
        return <PendingPickUpOrderTab />;
      case "completedOrders":
        return <CompletedOrderTab />;
      case "cancelOrders":
        return <CancelOrderTab />;
      case "personalInfo":
        return <PersonalInfo onLogout={handleLogout} />;
      case "createRouteAndRouteStop":
        return <Route />;
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
    alert("Logged out successfully");
    // Redirect to home page
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
              onClick={() => setActiveTab("pendingPickUpOrders")}
              className={activeTab === "processingOrders" ? "active" : ""}
            >
              Pending Pick Up Orders
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("completedOrders")}
              className={activeTab === "completedOrders" ? "active" : ""}
            >
              Completed Orders
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("cancelOrders")}
              className={activeTab === "cancelOrders" ? "active" : ""}
            >
              Cancel Orders
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("createRouteAndRouteStop")}
              className={activeTab === "createRouteAndRouteStop" ? "active" : ""}
            >
              Create Route And Route Stop
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("personalInfo")}
              className={activeTab === "personalInfo" ? "active" : ""}
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

function PersonalInfo({ onLogout }) {
  return (
    <div className="personal-info-container">
      <div className="personal-info-image">
        <img src="person.png" alt="Profile" />
      </div>
      <div className="personal-info-details">
        <h2>Personal Info</h2>
        <p>
          <strong>Họ và tên:</strong> John Doe
        </p>
        <p>
          <strong>Mã tài xế:</strong> TX12345
        </p>
        <p>
          <strong>Giới tính:</strong> Nam
        </p>
        <p>
          <strong>Số điện thoại:</strong> 123-456-7890
        </p>
        <p>
          <strong>Email:</strong> johndoe@example.com
        </p>
        <p>
          <strong>Địa chỉ nhà:</strong> 123 Main Street, City, Country
        </p>
        <div className="personal-info-buttons">
          <button className="btn-edit">Edit</button>
          <button className="btn-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Staff;

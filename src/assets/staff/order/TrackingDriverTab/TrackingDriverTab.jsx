import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TrackingDriverTab.css";

function TrackingDriverTab() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get("https://localhost:7046/api/Driver/GetAllDrivers");
        if (response.data && response.data.result) {
          const formattedDrivers = response.data.result.map((driver) => {
            const { id, firstName, lastName, email, phoneNumber } = driver.userProfile;
            return {
              id,
              firstName,
              lastName,
              email,
              phoneNumber,
              status: driver.status,
            };
          });
          setDrivers(formattedDrivers);
        } else {
          setError("No data found");
        }
      } catch (error) {
        console.error("Error fetching drivers:", error);
        setError("Failed to fetch drivers");
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const getStatusLabel = (status) => {
    switch (status) {
      case 1:
        return "Available";
      case 2:
        return "On Route";
      case 3:
        return "Inactive";
      default:
        return "Unknown";
    }
  };

  if (loading) return <div className="tracking-driver-loading">Loading drivers...</div>;
  if (error) return <div className="tracking-driver-error">Error: {error}</div>;

  return (
    <div className="tracking-driver-container">
      <h2 className="tracking-driver-title">Tracking Driver</h2>
      <table className="tracking-driver-table">
        <thead className="tracking-driver-header">
          <tr className="tracking-driver-header-row">
            <th className="tracking-driver-header-cell">DRIVER ID</th>
            <th className="tracking-driver-header-cell">First Name</th>
            <th className="tracking-driver-header-cell">Last Name</th>
            <th className="tracking-driver-header-cell">Email</th>
            <th className="tracking-driver-header-cell">Phone Number</th>
            <th className="tracking-driver-header-cell">Status</th>
          </tr>
        </thead>
        <tbody className="tracking-driver-body">
          {drivers.map((driver) => (
            <tr key={driver.id} className="tracking-driver-row">
              <td className="tracking-driver-cell">{driver.id}</td>
              <td className="tracking-driver-cell">{driver.firstName}</td>
              <td className="tracking-driver-cell">{driver.lastName}</td>
              <td className="tracking-driver-cell">{driver.email}</td>
              <td className="tracking-driver-cell">{driver.phoneNumber}</td>
              <td className="tracking-driver-cell">{getStatusLabel(driver.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrackingDriverTab;

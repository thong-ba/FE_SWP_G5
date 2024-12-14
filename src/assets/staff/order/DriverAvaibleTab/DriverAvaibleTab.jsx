import React, { useEffect, useState } from "react";
import styles from './DriverAvaibleTab.module.css';
import axios from "axios";

function DriverAvaibleTab() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://localhost:7046/api/Driver/GetAllDrivers");
      const { result } = response.data;
      if (Array.isArray(result)) {
        const formattedDrivers = result.map((driver) => ({
          id: driver.userProfile.id,
          firstName: driver.userProfile.firstName,
          lastName: driver.userProfile.lastName,
          email: driver.userProfile.email,
          phoneNumber: driver.userProfile.phoneNumber,
          status: driver.status === 1 ? "Available" : driver.status === 2 ? "On Route" : "Inactive",
        }));
        setDrivers(formattedDrivers);
      } else {
        setError("Invalid data format received");
      }
    } catch (err) {
      console.error("Error fetching drivers:", err);
      setError("Failed to fetch drivers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  if (loading) return <div>Loading drivers...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Driver List</h2>
      <table className={styles['driver-table']}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.id}</td>
              <td>{driver.firstName}</td>
              <td>{driver.lastName}</td>
              <td>{driver.email}</td>
              <td>{driver.phoneNumber}</td>
              <td>{driver.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DriverAvaibleTab;

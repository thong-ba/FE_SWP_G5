import { useState } from "react";
import axios from "axios";
import "./Route.css";

const Route = () => {
  const [routeRequest, setRouteRequest] = useState({
    notes: "",
    driverId: 0,
  });

  const [routeStopRequests, setRouteStopRequests] = useState([
    {
      stopOrder: 0,
      address: "",
      orderId: 0,
    },
  ]);

  const handleAddRouteStop = () => {
    setRouteStopRequests((prev) => [
      ...prev,
      {
        stopOrder: prev.length + 1,
        address: "",
        orderId: 0,
      },
    ]);
  };

  const handleUpdateRouteStop = (index, field, value) => {
    setRouteStopRequests((prev) =>
      prev.map((stop, i) => (i === index ? { ...stop, [field]: value } : stop))
    );
  };

  const handleSubmit = async () => {
    const requestBody = {
      routeRequest,
      routeStopRequests,
    };

    try {
      const response = await axios.post(
        "https://localhost:7046/api/Route",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      alert("Route created successfully");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create route.");
    }
  };

  return (
    <div className="route-container">
      <h2 className="route-title">Create Route</h2>

      <div className="route-field">
        <label className="route-label">Notes:</label>
        <input
          type="text"
          className="route-input"
          value={routeRequest.notes}
          onChange={(e) =>
            setRouteRequest((prev) => ({ ...prev, notes: e.target.value }))
          }
        />
      </div>

      <div className="route-field">
        <label className="route-label">Driver ID:</label>
        <input
          type="number"
          className="route-input"
          value={routeRequest.driverId}
          onChange={(e) =>
            setRouteRequest((prev) => ({ ...prev, driverId: +e.target.value }))
          }
        />
      </div>

      <h3 className="route-subtitle">Route Stops</h3>
      {routeStopRequests.map((stop, index) => (
        <div key={index} className="route-stop">
          <label className="route-label">Stop Order:</label>
          <input
            type="number"
            className="route-input"
            value={stop.stopOrder}
            onChange={(e) =>
              handleUpdateRouteStop(index, "stopOrder", +e.target.value)
            }
          />

          <label className="route-label">Address:</label>
          <input
            type="text"
            className="route-input"
            value={stop.address}
            onChange={(e) =>
              handleUpdateRouteStop(index, "address", e.target.value)
            }
          />

          <label className="route-label">Order ID:</label>
          <input
            type="number"
            className="route-input"
            value={stop.orderId}
            onChange={(e) =>
              handleUpdateRouteStop(index, "orderId", +e.target.value)
            }
          />
        </div>
      ))}

      <div className="route-buttons">
        <button className="route-button add-button" onClick={handleAddRouteStop}>
          Add Stop
        </button>
        <button className="route-button submit-button" onClick={handleSubmit}>
          Submit Route
        </button>
      </div>
    </div>
  );
};

export default Route;

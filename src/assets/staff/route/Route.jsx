import axios from "axios";
import { useState } from "react";

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
      { stopOrder: prev.length + 1, address: "", orderId: 0 },
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
    <div>
      <h2>Create Route</h2>

      <div>
        <label>Notes:</label>
        <input
          type="text"
          value={routeRequest.notes}
          onChange={(e) =>
            setRouteRequest((prev) => ({ ...prev, notes: e.target.value }))
          }
        />
      </div>

      <div>
        <label>Driver ID:</label>
        <input
          type="number"
          value={routeRequest.driverId}
          onChange={(e) =>
            setRouteRequest((prev) => ({ ...prev, driverId: +e.target.value }))
          }
        />
      </div>

      <h3>Route Stops</h3>
      {routeStopRequests.map((stop, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <label>Stop Order:</label>
          <input
            type="number"
            value={stop.stopOrder}
            onChange={(e) =>
              handleUpdateRouteStop(index, "stopOrder", +e.target.value)
            }
          />

          <label>Address:</label>
          <input
            type="text"
            value={stop.address}
            onChange={(e) =>
              handleUpdateRouteStop(index, "address", e.target.value)
            }
          />

          <label>Order ID:</label>
          <input
            type="number"
            value={stop.orderId}
            onChange={(e) =>
              handleUpdateRouteStop(index, "orderId", + e.target.value)
            }
          />
        </div>
      ))}

      <button onClick={handleAddRouteStop}>Add Stop</button>
      <button onClick={handleSubmit}>Submit Route</button>
    </div>
  );
};

export default Route;

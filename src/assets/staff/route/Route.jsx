import { useState, useEffect } from "react";
import axios from "axios";
import "./Route.css";

const Route = () => {
  const [routeRequest, setRouteRequest] = useState({
    notes: "",
    driverId: 0,
  });

  const [drivers, setDrivers] = useState([]); // To store drivers list
  const [orders, setOrders] = useState([]); // To store orders list
  const [routeStopRequests, setRouteStopRequests] = useState([
    {
      stopOrder: 1,
      address: "",
      orderId: 0,
      routeStopType: "pickup",
    },
  ]);

  // Fetch drivers from API
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7046/api/Driver/GetAllDrivers"
        );
        const { result } = response.data;
        if (Array.isArray(result)) {
          const filteredDrivers = result
            .filter((driver) => driver.status === 1) // Only include drivers with status 1
            .map((driver) => ({
              id: driver.userProfile.id,
              status: driver.status,
            }));
          setDrivers(filteredDrivers);
        }
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDrivers();
  }, []);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7046/api/Order/GetAllProccessingOrder"
        );
        const { result } = response.data;
        if (Array.isArray(result)) {
          const processedOrders = result.map((order) => ({
            id: order.id,
            fromAddress: order.fromAddress,
            toAddress: order.toAddress,
          }));
          setOrders(processedOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleAddRouteStop = () => {
    setRouteStopRequests((prev) => [
      ...prev,
      {
        stopOrder: prev.length + 1,
        address: "",
        orderId: 0,
        routeStopType: "pickup",
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
        <select
          className="route-select"
          value={routeRequest.driverId}
          onChange={(e) =>
            setRouteRequest((prev) => ({ ...prev, driverId: +e.target.value }))
          }
        >
          <option value={0} disabled>
            Select Driver
          </option>
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.id}
            </option>
          ))}
        </select>
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
          <select
            className="route-select"
            value={stop.orderId}
            onChange={(e) =>
              handleUpdateRouteStop(index, "orderId", +e.target.value)
            }
          >
            <option value={0} disabled>
              Select Order
            </option>
            {orders.map((order) => (
              <option key={order.id} value={order.id}>
                {order.id} - {order.fromAddress} → {order.toAddress}
              </option>
            ))}
          </select>

          <label className="route-label">Route Stop Type:</label>
          <select
            className="route-select"
            value={stop.routeStopType}
            onChange={(e) =>
              handleUpdateRouteStop(index, "routeStopType", e.target.value)
            }
          >
            <option value="pickup">Pick up Point</option>
            <option value="delivery">Delivery Point</option>
          </select>
        </div>
      ))}

      <button onClick={handleAddRouteStop}>Add Stop</button>
      <button onClick={handleSubmit}>Submit Route</button>
    </div>
  );
};

export default Route;
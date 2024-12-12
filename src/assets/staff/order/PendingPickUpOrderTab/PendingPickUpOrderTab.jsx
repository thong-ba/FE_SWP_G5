import axios from "axios";
import { getPendingPickUpOrder } from "../getOrder/getOrder";
import React, { useEffect, useState } from "react";

function PendingPickUpOrderTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cancelOrder = async (orderId) => {
    try {
      const response = await axios.put(
        `https://localhost:7046/api/Order/Update-Order-Status-Canceled?OrderId=${orderId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.isSuccess) {
        alert("Order canceled successfully");

        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderId)
        );
      } else alert("Failed to cancel the order");
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("Error canceling the order");
    }
  };

  const pendingPickUpOrder = async (orderId) => {
    try {
      const response = await axios.put(
        `https://localhost:7046/api/Order/Update-Order-Status-PendingPickUp?OrderId=${orderId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.isSuccess) {
        alert("Order pending pick up successfully");

        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderId)
        );
      } else alert("Failed to pending pick up the order");
    } catch (error) {
      console.error("Error pending pick up order:", error);
      alert("Error pending pick up the order");
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getPendingPickUpOrder();
        console.log("Fetched data: ", data);
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
          setError("No data found");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch pending orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading pending orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Pending Pick Up Orders</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>From Address</th>
            <th>To Address</th>
            <th>Receiver Name</th>
            <th>Receiver Phone</th>
            <th>Notes</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.fromAddress}</td>
              <td>{order.toAddress}</td>
              <td>{order.receiverName}</td>
              <td>{order.receiverPhone}</td>
              <td>{order.notes}</td>
              <td>{order.totalPrice}</td>
              <td>
                <button className="btn-detail">View Details</button>
                {/* <button
                  className="btn-confirm"
                  onClick={() => pendingPickUpOrder(order.id)}
                >
                  Confirm
                </button> */}
                <button
                  className="btn-cancel"
                  onClick={() => cancelOrder(order.id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PendingPickUpOrderTab;

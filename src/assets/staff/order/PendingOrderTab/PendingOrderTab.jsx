import React, { useEffect, useState } from "react";
import axios from "axios";
import './PendingOrderTab.css';


const PendingOrderTab = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://localhost:7046/api/Order");
        if (response.data.isSuccess) {
          setOrders(response.data.result);
        } else {
          console.error("Error fetching orders:", response.data.errorMessage);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pending-orders">
      <h2>Pending Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>From Address</th>
            <th>To Address</th>
            <th>Status</th>
            <th>Receiver Name</th>
            <th>Receiver Phone</th>
            <th>Total Price</th>
            <th>Transport Service</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.fromAddress}</td>
              <td>{order.toAddress}</td>
              <td>{order.orderStatus}</td>
              <td>{order.receiverName}</td>
              <td>{order.receiverPhone}</td>
              <td>{order.totalPrice}</td>
              <td>{order.transportService.name}</td>
              <td>{order.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingOrderTab;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CompletedOrder.css";

const CompletedOrderTab = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://localhost:7046/api/Order");  // API endpoint cho các đơn hàng

        if (response.data.isSuccess) {
          // Lọc các đơn hàng có status = 4
          const completedOrders = response.data.result.filter(order => order.orderStatus === 4);
          setOrders(completedOrders);
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

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleUpdate = (orderId) => {
    console.log(`Updating completed order with ID: ${orderId}`);
  };

  const handleDelete = (orderId) => {
    console.log(`Deleting completed order with ID: ${orderId}`);
  };

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="completed-orders-container">
      <h2 className="completed-orders-title">Completed Orders</h2>
      <table className="completed-orders-table">
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
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
              <td>
                <button onClick={() => handleUpdate(order.id)} className="action-button">
                  Update
                </button>
                <button onClick={() => handleDelete(order.id)} className="action-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-container">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CompletedOrderTab;

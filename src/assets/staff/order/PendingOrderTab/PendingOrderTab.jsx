import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PendingOrderTab.css";

const PendingOrderTab = () => {
  const [orders, setOrders] = useState([]);  // Tất cả đơn hàng
  const [currentPage, setCurrentPage] = useState(1);  // Trang hiện tại
  const [ordersPerPage] = useState(5);  // Số đơn hàng mỗi trang
  const [loading, setLoading] = useState(true);  // Trạng thái tải dữ liệu

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://localhost:7046/api/Order");

        if (response.data.isSuccess) {
          // Lọc các đơn hàng có status = 2
          const pendingOrders = response.data.result.filter(order => order.orderStatus === 2);
          setOrders(pendingOrders);  // Lưu các đơn hàng có status = 2
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

  // Tính toán các đơn hàng cần hiển thị trên trang hiện tại
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Tính tổng số trang
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleUpdate = (orderId) => {
    // Logic để xử lý cập nhật đơn hàng
    console.log(`Updating order with ID: ${orderId}`);
  };

  const handleDelete = (orderId) => {
    // Logic để xử lý xóa đơn hàng
    console.log(`Deleting order with ID: ${orderId}`);
  };

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="pending-orders-container">
      <h2 className="pending-orders-title">Pending Orders</h2>
      <table className="pending-orders-table">
        <thead className="pending-orders-header">
          <tr>
            <th className="pending-orders-header-cell">Order ID</th>
            <th className="pending-orders-header-cell">From Address</th>
            <th className="pending-orders-header-cell">To Address</th>
            <th className="pending-orders-header-cell">Status</th>
            <th className="pending-orders-header-cell">Receiver Name</th>
            <th className="pending-orders-header-cell">Receiver Phone</th>
            <th className="pending-orders-header-cell">Total Price</th>
            <th className="pending-orders-header-cell">Transport Service</th>
            <th className="pending-orders-header-cell">Notes</th>
            <th className="pending-orders-header-cell">Others</th> {/* Cột "OTHERS" */}
          </tr>
        </thead>
        <tbody className="pending-orders-body">
          {currentOrders.map((order) => (
            <tr key={order.id} className="pending-orders-row">
              <td className="pending-orders-cell">{order.id}</td>
              <td className="pending-orders-cell">{order.fromAddress}</td>
              <td className="pending-orders-cell">{order.toAddress}</td>
              <td className="pending-orders-cell">{order.orderStatus}</td>
              <td className="pending-orders-cell">{order.receiverName}</td>
              <td className="pending-orders-cell">{order.receiverPhone}</td>
              <td className="pending-orders-cell">{order.totalPrice}</td>
              <td className="pending-orders-cell">{order.transportService.name}</td>
              <td className="pending-orders-cell">{order.notes}</td>
              <td className="pending-orders-cell">
                {/* Các nút Update và Delete */}
                <button
                  onClick={() => handleUpdate(order.id)}
                  className="action-button"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(order.id)}
                  className='action-button'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination-container">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
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

export default PendingOrderTab;

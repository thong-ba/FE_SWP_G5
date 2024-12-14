import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom';
import './UserInfo.css';

function UserInfo() {
  const [userDetails, setUserDetails] = useState({
    email: '',
    fullname: '',
    role: '',
    phoneNumber: '',
    imgUrl: ''
  });
  const [orders, setOrders] = useState([]); // State để lưu danh sách đơn hàng
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 7; // Số lượng phần tử mỗi trang

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const role = decodedToken.Role;
        const fullname = decodedToken.FullName;

        // Lấy thông tin người dùng
        axios.get('https://localhost:7046/api/UserAccount/GetUserProfile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then((response) => {
            const { firstName, lastName, email, phoneNumber, imgUrl } = response.data.result;
            setUserDetails({
              fullname: `${firstName} ${lastName}`,
              email,
              role,
              phoneNumber,
              imgUrl
            });
            setLoading(false);
          })
          .catch((error) => {
            setError('Error fetching user data');
            setLoading(false);
          });

        // Lấy danh sách đơn hàng
        axios.get('https://localhost:7046/api/Order/Customer', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then((response) => {
            const data = response.data.result.map(order => {
              const { id, fromAddress, toAddress, transportService, paymentMethod, distance, orderStatus } = order;
              const totalPrice = (distance * transportService.pricePerKm) + 
                                 (order.orderFishes.reduce((sum, fish) => sum + fish.weight, 0) * transportService.pricePerKg) + 
                                 transportService.transportPrice;

              const statusText = ['Processing', 'Pickup', 'Delivering', 'Completed'][orderStatus];

              return {
                id,
                fromAddress,
                toAddress,
                transportServiceId: transportService.id,
                transportServiceName: transportService.name,
                paymentMethod: paymentMethod === 1 ? 'Cash' : 'Online',
                totalPrice,
                orderStatus: statusText
              };
            });
            setOrders(data);
          })
          .catch((error) => {
            setError('Error fetching order data');
          });
      } catch (error) {
        setError('Error decoding token');
      }
    }
  }, []);

  const handleEditProfile = () => {
    navigate('/updateprofile');
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const currentOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="user-info-container">
      <div className="user-info-header">
        <h1 className="user-info-title">Welcome, {userDetails.fullname}</h1>
      </div>
      <div className="user-info-body">
        <div className="user-info-avatar">
          <img
            src={`${process.env.PUBLIC_URL}/person.png`}
            alt="User Avatar"
            className="user-info-avatar-img"
          />
        </div>
        <div className="user-info-details">
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Role:</strong> {userDetails.role}</p>
          <p><strong>Phone Number:</strong> {userDetails.phoneNumber || 'Not available'}</p>
        </div>
      </div>
      <div className="user-info-footer">
        <button className="edit-profile-button" onClick={handleEditProfile}>Edit Profile</button>
      </div>

      {/* Hiển thị danh sách đơn hàng */}
      <div className="order-list">
        <h2>Your Orders</h2>
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>From Address</th>
              <th>To Address</th>
              <th>Transport Service</th>
              <th>Payment Method</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.fromAddress}</td>
                <td>{order.toAddress}</td>
                <td>{`${order.transportServiceId} - ${order.transportServiceName}`}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.totalPrice.toLocaleString()} VND</td>
                <td>{order.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button
            className="page-button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span className="page-info">Page {currentPage} of {totalPages}</span>
          <button
            className="page-button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;

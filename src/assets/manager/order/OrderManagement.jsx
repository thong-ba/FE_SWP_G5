import React, { useState, useEffect } from 'react';
import { Table, Modal } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetAllOrderService } from '../../../api/OrderApi';
import './OrderManagement.css';

function TransportService() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Move fetchData outside useEffect so it can be reused
  const fetchData = async () => {
    try {
      const apiResponse = await GetAllOrderService();
      console.log("API Response:", apiResponse); // Log the entire response

      if (apiResponse.isSuccess) {
        const apiData = apiResponse.result; // Access the result array
        setData(apiData);
        console.log("Fetched Data:", apiData);
      } else {
        toast.error("Error: " + apiResponse.errorMessage || "Failed to fetch data");
      }

      setLoading(false);
    } catch (error) {
      toast.error("Error fetching transport services: " + error.message);
      setLoading(false); // Ensure loading is set to false on error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleRowClick = (record) => {
    setSelectedOrder(record);
  };

  const handleModalClose = () => {
    setSelectedOrder(null);
  };
  const columns = [
    { title: 'Order ID', dataIndex: 'id' },
    { title: 'Distance', dataIndex: 'distance', render: (distance) => ` ${distance.toLocaleString()} Km` },
    { title: 'Total Price', dataIndex: 'totalPrice', render: (totalPrice) => ` ${totalPrice.toLocaleString()} VND` },
    { title: 'From', dataIndex: 'fromAddress' },
    { title: 'To', dataIndex: 'toAddress' },
    {
      title: 'Status',
      dataIndex: 'orderStatus',
      render: (orderStatus) => {
        switch (orderStatus) {
          case 0:
            return 'Processing';
          case 1:
            return 'Delivering';
          case 2:
            return 'Canceled';
          case 3:
            return 'Completed';
          case 4:
            return 'PendingPickUp';
          default:
            return 'Unknown';
        }
      },
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      render: (paymentMethod) => {
        switch (paymentMethod) {
          case 0:
            return 'CASH';
          case 1:
            return 'VNPAY';
          default:
            return 'Unknown';
        }
      },
    },
  ];

  const renderStars = (stars) => {
    return (
      <span>
        {'★'.repeat(stars).split('').map((star, index) => (
          <span key={index} className="star filled">★</span>
        ))}
        {'☆'.repeat(5 - stars).split('').map((star, index) => (
          <span key={index + stars} className="star empty">☆</span>
        ))}
      </span>
    ); // Display filled and empty stars
  };

  return (
    <>
      <ToastContainer />
      <div>
        <h1 className='section-title'>Order Management</h1>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          rowKey="id"
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
          }}
        />

        <Modal
          title="Order Details"
          open={!!selectedOrder}
          onCancel={handleModalClose}
          footer={null}
        >
          {selectedOrder && (
            <div>
              <p><strong>Order ID:</strong> {selectedOrder.id}</p>
              <p><strong>From Address:</strong> {selectedOrder.fromAddress}</p>
              <p><strong>To Address:</strong> {selectedOrder.toAddress}</p>
              <p><strong>Distance:</strong> {selectedOrder.distance} Km</p>
              <p><strong>Total Price:</strong> {selectedOrder.totalPrice} VND</p>
              <p><strong>Status:</strong> {columns[5].render(selectedOrder.orderStatus)}</p>
              <p><strong>Feedback Star:</strong> {renderStars(selectedOrder.feedbackStars)}</p>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
}

export default TransportService;

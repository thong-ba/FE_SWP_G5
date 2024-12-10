import React, { useState } from 'react';
import './TrackOrder.css';

function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [orderInfo, setOrderInfo] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    // Simulated database search
    const mockDatabase = {
      '12345': { status: 'Delivered', date: '2024-12-01', location: 'Hanoi' },
      '67890': { status: 'In Transit', date: '2024-12-03', location: 'Ho Chi Minh City' },
    };

    if (mockDatabase[orderId]) {
      setOrderInfo(mockDatabase[orderId]);
      setError('');
    } else {
      setOrderInfo(null);
      setError('Order ID not found. Please check and try again.');
    }
  };

  return (
    <div className="trackorder-container">
      <h1 className="trackorder-title">Track Your Order</h1>
      <div className="trackorder-input-container">
        <input
          type="text"
          placeholder="Enter your order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="trackorder-input"
        />
        <button onClick={handleSearch} className="trackorder-button">
          Search
        </button>
      </div>
      {error && <p className="trackorder-error">{error}</p>}
      {orderInfo && (
        <div className="trackorder-result">
          <h2>Order Details</h2>
          <p><strong>Status:</strong> {orderInfo.status}</p>
          <p><strong>Date:</strong> {orderInfo.date}</p>
          <p><strong>Location:</strong> {orderInfo.location}</p>
        </div>
      )}
    </div>
  );
}

export default TrackOrder;

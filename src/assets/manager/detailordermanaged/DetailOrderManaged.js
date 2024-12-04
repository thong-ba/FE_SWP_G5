import React, { useState } from 'react';
import './DetailOrderManaged.css';

function DetailOrderManaged() {
  const driversList = ['Nguyễn Văn A', 'Trần Văn B', 'Lê Thị C', 'Phạm Quốc D', 'Đặng Hoàng E'];
  const [selectedDriver, setSelectedDriver] = useState('');

  const orderDetails = {
    code: 'ORD123456',
    name: 'Cá koi đen',
    weight: '5kg',
    price: '2,000,000 VND',
    shippingType: 'Hoả Tốc',
    total: '2,500,000 VND',
  };

  const customerInfo = {
    sender: { name: 'Nguyễn Văn Giao', phone: '0901234567', email: 'giao@example.com', address: '123 Nguyễn Văn Cừ, Q5' },
    receiver: { name: 'Trần Thị Nhận', phone: '0912345678', email: 'nhan@example.com', address: '456 Lê Lợi, Q1' },
  };

  return (
    <div className="detail-order-container">
      <h1>Chi tiết đơn hàng</h1>
      <div className="order-details">
        {/* Column Left - Sender Info */}
        <div className="column">
          <h2>Thông tin khách gửi</h2>
          <p className= "p-detail" ><strong>Họ và tên:</strong> {customerInfo.sender.name}</p>
          <p className= "p-detail"  ><strong>Số điện thoại:</strong> {customerInfo.sender.phone}</p>
          <p className="p-detail" ><strong>Email:</strong> {customerInfo.sender.email}</p>
          <p className="p-detail" ><strong>Địa chỉ:</strong> {customerInfo.sender.address}</p>
        </div>

        {/* Column Middle - Receiver Info */}
        <div className="column">
          <h2>Thông tin khách nhận</h2>
          <p className="p-detail" ><strong>Họ và tên:</strong> {customerInfo.receiver.name}</p>
          <p className="p-detail" ><strong>Số điện thoại:</strong> {customerInfo.receiver.phone}</p>
          <p className="p-detail"><strong>Email:</strong> {customerInfo.receiver.email}</p>
          <p className="p-detail"><strong>Địa chỉ:</strong> {customerInfo.receiver.address}</p>
        </div>

        {/* Column Right - Order Details */}
        <div className="column">
          <h2>Chi tiết đơn hàng</h2>
          <p className="p-detail"><strong>Mã đơn hàng:</strong> {orderDetails.code}</p>
          <p className="p-detail"><strong>Tên đơn hàng:</strong> {orderDetails.name}</p>
          <p className="p-detail"><strong>Khối lượng:</strong> {orderDetails.weight}</p>
          <p className="p-detail"><strong>Tiền đơn hàng:</strong> {orderDetails.price}</p>
          <p className="p-detail"><strong>Hình thức vận chuyển:</strong> {orderDetails.shippingType}</p>
          <p className="p-detail"><strong>Tổng tiền:</strong> {orderDetails.total}</p>
          <label>
            <strong>Tài xế nhận hàng:</strong>
            <select
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(e.target.value)}
              className="driver-select"
            >
              <option value="">Chọn tài xế</option>
              {driversList.map((driver, index) => (
                <option key={index} value={driver}>{driver}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="actions">
        <button className="confirm-button">Xác nhận</button>
        <button className="cancel-button">Hủy đơn hàng</button>
      </div>
    </div>
  );
}

export default DetailOrderManaged;

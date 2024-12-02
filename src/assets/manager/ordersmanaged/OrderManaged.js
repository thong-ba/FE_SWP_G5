import React, { useState } from 'react';
import './OrderManaged.css';
import { useNavigate } from 'react-router-dom';

function OrderManaged() {
    const navigate = useNavigate(); // Sử dụng useNavigate
    const driversList = ['Nguyễn Văn A', 'Trần Văn B', 'Lê Thị C', 'Phạm Quốc D', 'Đặng Hoàng E'];
  
  const [orders, setOrders] = useState([
    { id: 1, code: 'ORD123456', name: 'Cá koi đen', shippingType: 'Hoả Tốc', total: '2.000.000 VND', driver: '' },
    { id: 2, code: 'ORD654321', name: 'Cá Koi Trắng Ngà', shippingType: 'Tiêu chuẩn', total: '500.000 VND', driver: '' },
    { id: 3, code: 'ORD1424', name: 'Cá Koi Nâu', shippingType: 'Nhanh', total: '5.000.000 VND', driver: '' },
    { id: 4, code: 'ORD1542', name: 'Cá Koi Phong Thuỷ', shippingType: 'Hoả Tốc', total: '15.000.000 VND', driver: '' },
  ]);

  const handleDriverChange = (id, driver) => {
    setOrders(orders.map(order => order.id === id ? { ...order, driver } : order));
  };

  return (
    <div className="order-managed-container">
      <h1>Quản lý đơn hàng vận chuyển</h1>
      <table className="order-table">
        <thead>
          <tr>
            <th>Số thứ tự</th>
            <th>Mã đơn vận chuyển</th>
            <th>Tên đơn hàng</th>
            <th>Hình thức vận chuyển</th>
            <th>Tổng tiền vận chuyển</th>
            <th>Tài xế vận chuyển</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.code}</td>
              <td>{order.name}</td>
              <td>{order.shippingType}</td>
              <td>{order.total}</td>
              <td>
                <select
                  className="driver-select"
                  value={order.driver}
                  onChange={(e) => handleDriverChange(order.id, e.target.value)}
                >
                  <option value="">Chọn tài xế</option>
                  {driversList.map((driver, index) => (
                    <option key={index} value={driver}>
                      {driver}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button className="action-button view" onClick={() => navigate('/manager/detailorder')}>Xem chi tiết</button>
                <button className="action-button edit">Chỉnh sửa nhanh</button>
                <button className="action-button confirm">Xác nhận</button>
                <button className="action-button delete">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderManaged;

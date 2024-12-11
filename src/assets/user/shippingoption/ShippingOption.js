import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ShippingOption.module.css';

const ShippingOption = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const navigate = useNavigate();

  const exportRoutes = [
    { id: 1, name: 'Chuyến A', from: 'Hà Nội', to: 'Tokyo', price: '500,000 VND' },
    { id: 2, name: 'Chuyến B', from: 'Hồ Chí Minh', to: 'Seoul', price: '600,000 VND' },
    { id: 3, name: 'Chuyến C', from: 'Đà Nẵng', to: 'Singapore', price: '700,000 VND' },
  ];

  const innerCityRoutes = [
    { id: 4, name: 'Chuyến 1', from: 'Quận 1', to: 'Quận 3', price: '200,000 VND' },
    { id: 5, name: 'Chuyến 2', from: 'Quận 2', to: 'Quận 7', price: '250,000 VND' },
    { id: 6, name: 'Chuyến 3', from: 'Quận 5', to: 'Quận 10', price: '300,000 VND' },
  ];

  const areaRoutes = [
    { id: 7, name: 'Chuyến X', from: 'Bắc Giang', to: 'Hà Nội', price: '350,000 VND' },
    { id: 8, name: 'Chuyến Y', from: 'Hải Phòng', to: 'Quảng Ninh', price: '400,000 VND' },
    { id: 9, name: 'Chuyến Z', from: 'Thanh Hóa', to: 'Nghệ An', price: '450,000 VND' },
  ];

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setSelectedRoute(null); // Reset selected route when option changes
  };

  const handleRouteSelection = (routeId) => {
    setSelectedRoute(routeId);
  };



  const handleNext = () => {
    // Tìm chi tiết tuyến đường dựa trên lựa chọn của người dùng
    const selectedRouteDetails =
      selectedOption === 'export'
        ? exportRoutes.find((route) => route.id === selectedRoute)
        : selectedOption === 'innerCity'
        ? innerCityRoutes.find((route) => route.id === selectedRoute)
        : areaRoutes.find((route) => route.id === selectedRoute);

    // Kiểm tra nếu tìm thấy chi tiết tuyến đường
    if (selectedRouteDetails) {
        // Navigate đến trang BookingOrder với state chứa routeId và shippingType
        navigate('/bookingorder', {
            state: {
                routeId: selectedRouteDetails.id,  // Truyền routeId từ chi tiết tuyến đường
                shippingType: selectedOption       // Truyền shippingType
            }
        });
    } else {
        console.warn('Không tìm thấy tuyến đường phù hợp');
    }
};

  const renderTable = (routes) => (
    <table className={styles.routeTable}>
      <thead>
        <tr>
          <th>Chọn</th>
          <th>Mã số</th>
          <th>Tên chuyến</th>
          <th>Vị trí từ</th>
          <th>Vị trí đến</th>
          <th>Giá cả</th>
        </tr>
      </thead>
      <tbody>
        {routes.map((route) => (
          <tr key={route.id}>
            <td>
              <input
                type="radio"
                name="route"
                checked={selectedRoute === route.id}
                onChange={() => handleRouteSelection(route.id)}
              />
            </td>
            <td>{route.id}</td>
            <td>{route.name}</td>
            <td>{route.from}</td>
            <td>{route.to}</td>
            <td>{route.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className={styles.container}>
      <h2>Chọn hình thức vận chuyển</h2>

      <div className={styles.buttonContainer}>
        <button
          className={styles.optionButton}
          onClick={() => handleOptionChange('export')}
        >
          Quốc Tế
        </button>
        <button
          className={styles.optionButton}
          onClick={() => handleOptionChange('innerCity')}
        >
          Nội Thành
        </button>
        <button
          className={styles.optionButton}
          onClick={() => handleOptionChange('area')}
        >
          Khu Vực
        </button>
      </div>

      {selectedOption === 'export' && renderTable(exportRoutes)}
      {selectedOption === 'innerCity' && renderTable(innerCityRoutes)}
      {selectedOption === 'area' && renderTable(areaRoutes)}

      {selectedRoute && (
        <div className={styles.nextButtonContainer}>
          <button
            onClick={handleNext}
            className={styles.nextButton}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ShippingOption;

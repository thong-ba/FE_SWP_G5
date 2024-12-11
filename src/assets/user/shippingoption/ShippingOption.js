import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ShippingOption.module.css';

const ShippingOption = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [innerCityRoutes, setInnerCityRoutes] = useState([]);  // State cho dữ liệu innerCity
  const [localRoutes, setLocalRoutes] = useState([]);  // State cho dữ liệu local
  const [internationalRoutes, setInternationalRoutes] = useState([]);  // State cho dữ liệu international
  const navigate = useNavigate();

  // Lấy dữ liệu từ API cho "innerCity"
  useEffect(() => {
    if (selectedOption === 'innerCity') {
      fetch('https://localhost:7046/api/TransportService/Domestic')  // API cho "innerCity"
        .then((response) => response.json())
        .then((data) => {
          if (data.isSuccess) {
            setInnerCityRoutes(data.result);  // Lưu dữ liệu vào state
          } else {
            console.error('Lỗi khi lấy dữ liệu từ API');
          }
        })
        .catch((error) => {
          console.error('Có lỗi xảy ra khi gọi API:', error);
        });
    }
  }, [selectedOption]);  // Chỉ gọi API khi chọn "innerCity"

  // Lấy dữ liệu từ API cho "local"
  useEffect(() => {
    if (selectedOption === 'local') {
      fetch('https://localhost:7046/api/TransportService/Local')  // API cho "local"
        .then((response) => response.json())
        .then((data) => {
          if (data.isSuccess) {
            setLocalRoutes(data.result);  // Lưu dữ liệu vào state
          } else {
            console.error('Lỗi khi lấy dữ liệu từ API');
          }
        })
        .catch((error) => {
          console.error('Có lỗi xảy ra khi gọi API:', error);
        });
    }
  }, [selectedOption]);  // Chỉ gọi API khi chọn "local"

  // Lấy dữ liệu từ API cho "international"
  useEffect(() => {
    if (selectedOption === 'international') {
      fetch('https://localhost:7046/api/TransportService/International')  // API cho "international"
        .then((response) => response.json())
        .then((data) => {
          if (data.isSuccess) {
            setInternationalRoutes(data.result);  // Lưu dữ liệu vào state
          } else {
            console.error('Lỗi khi lấy dữ liệu từ API');
          }
        })
        .catch((error) => {
          console.error('Có lỗi xảy ra khi gọi API:', error);
        });
    }
  }, [selectedOption]);  // Chỉ gọi API khi chọn "international"

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
      selectedOption === 'international'
        ? internationalRoutes.find((route) => route.id === selectedRoute)
        : selectedOption === 'innerCity'
        ? innerCityRoutes.find((route) => route.id === selectedRoute)
        : selectedOption === 'local'
        ? localRoutes.find((route) => route.id === selectedRoute)
        : null;

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
          <th>Loại vận chuyển</th>
          <th>Giới thiệu</th>
          <th>Giá theo Km</th>
          <th>Giá theo Kg</th>
          <th>Giá theo đơn vị</th>
          <th>Tỉnh đi</th>
          <th>Tỉnh đến</th>
          <th>Tình trạng</th>
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
            <td>{route.transportType === 0 ? 'Nội Địa' : route.transportType === 1 ? 'Quốc Tế' : 'Quốc Tế - International'}</td>
            <td>{route.description}</td>
            <td>{route.pricePerKm ? route.pricePerKm + ' VND' : '-'}</td> 
            <td>{route.pricePerKg ? route.pricePerKg + ' VND' : '-'}</td>
            <td>{route.pricePerAmount ? route.pricePerAmount + ' VND' : '-'}</td> 
            <td>{route.fromProvince}</td>
            <td>{route.toProvince}</td>
            <td>{route.isActive ? 'Hoạt động' : 'Không hoạt động'}</td> {/* Tình trạng */}
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
          onClick={() => handleOptionChange('international')}
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
          onClick={() => handleOptionChange('local')}
        >
          Vận Chuyển Nội Địa
        </button>
      </div>

      {selectedOption === 'international' && renderTable(internationalRoutes)}  {/* Hiển thị bảng cho "international" */}
      {selectedOption === 'innerCity' && renderTable(innerCityRoutes)}  {/* Hiển thị bảng cho "innerCity" */}
      {selectedOption === 'local' && renderTable(localRoutes)}  {/* Hiển thị bảng cho "local" */}

      {selectedRoute && (
        <div className={styles.nextButtonContainer}>
          <button
            onClick={handleNext}
            className={styles.nextButton}
          >
            Tiếp theo
          </button>
        </div>
      )}
    </div>
  );
};

export default ShippingOption;

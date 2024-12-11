// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Thêm import để sử dụng navigate
// import styles from './ShippingOption.module.css'; // Đảm bảo bạn đã tạo file CSS cho styling

// const ShippingOption = () => {
//   const [selectedOption, setSelectedOption] = useState('');
//   const [selectedRoute, setSelectedRoute] = useState('');
//   const navigate = useNavigate(); // Khởi tạo useNavigate

//   const exportRoutes = [
//     { route: 'Tuyến đường 1', price: '500,000 VND' },
//     { route: 'Tuyến đường 2', price: '600,000 VND' },
//     { route: 'Tuyến đường 3', price: '700,000 VND' },
//   ];

//   const innerCityRoutes = [
//     { route: 'Tuyến đường A', price: '200,000 VND' },
//     { route: 'Tuyến đường B', price: '250,000 VND' },
//     { route: 'Tuyến đường C', price: '300,000 VND' },
//   ];

//   const areaRoutes = [
//     { route: 'Tuyến đường X', price: '350,000 VND' },
//     { route: 'Tuyến đường Y', price: '400,000 VND' },
//     { route: 'Tuyến đường Z', price: '450,000 VND' },
//   ];

//   const handleOptionChange = (option) => {
//     setSelectedOption(option);
//     setSelectedRoute(''); // Reset selected route when changing shipping option
//   };

//   const handleRouteChange = (event) => {
//     setSelectedRoute(event.target.value);
//   };

//   const handleNext = () => {
//     // Chuyển hướng đến trang bookingorder khi nhấn nút Next
//     navigate('/bookingorder');
//   };

//   return (
//     <div className={styles.container}>
//       <h2>Chọn hình thức vận chuyển</h2>

//       <div className={styles.buttonContainer}>
//         <button
//           className={styles.optionButton}
//           onClick={() => handleOptionChange('export')}
//         >
//           Xuất khẩu
//         </button>
//         <button
//           className={styles.optionButton}
//           onClick={() => handleOptionChange('innerCity')}
//         >
//           Nội thành
//         </button>
//         <button
//           className={styles.optionButton}
//           onClick={() => handleOptionChange('area')}
//         >
//           Khu vực
//         </button>
//       </div>

//       {selectedOption && (
//         <div className={styles.dropdownContainer}>
//           <label>Chọn tuyến đường:</label>
//           <select
//             value={selectedRoute}
//             onChange={handleRouteChange}
//             className={styles.routeDropdown}
//           >
//             <option value="">Chọn tuyến</option>
//             {selectedOption === 'export' &&
//               exportRoutes.map((route, index) => (
//                 <option key={index} value={route.route}>
//                   {route.route} - {route.price}
//                 </option>
//               ))}
//             {selectedOption === 'innerCity' &&
//               innerCityRoutes.map((route, index) => (
//                 <option key={index} value={route.route}>
//                   {route.route} - {route.price}
//                 </option>
//               ))}
//             {selectedOption === 'area' &&
//               areaRoutes.map((route, index) => (
//                 <option key={index} value={route.route}>
//                   {route.route} - {route.price}
//                 </option>
//               ))}
//           </select>
//         </div>
//       )}

//       {selectedRoute && (
//         <div className={styles.nextButtonContainer}>
//           <button
//             onClick={handleNext} // Thay vì alert, sử dụng handleNext để chuyển trang
//             className={styles.nextButton}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShippingOption;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './ShippingOption.module.css'; 

const ShippingOption = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');
  const navigate = useNavigate(); 

  const exportRoutes = [
    { route: 'Tuyến đường 1', price: '500,000 VND' },
    { route: 'Tuyến đường 2', price: '600,000 VND' },
    { route: 'Tuyến đường 3', price: '700,000 VND' },
  ];

  const innerCityRoutes = [
    { route: 'Tuyến đường A', price: '200,000 VND' },
    { route: 'Tuyến đường B', price: '250,000 VND' },
    { route: 'Tuyến đường C', price: '300,000 VND' },
  ];

  const areaRoutes = [
    { route: 'Tuyến đường X', price: '350,000 VND' },
    { route: 'Tuyến đường Y', price: '400,000 VND' },
    { route: 'Tuyến đường Z', price: '450,000 VND' },
  ];

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setSelectedRoute(''); // Reset selected route when option changes
  };

  const handleRouteChange = (event) => {
    setSelectedRoute(event.target.value);
  };

  const handleNext = () => {
    navigate('/bookingorder', { state: { shippingType: selectedOption, route: selectedRoute } });
  };

  let routes = [];
  if (selectedOption === 'export') {
    routes = exportRoutes;
  } else if (selectedOption === 'innerCity') {
    routes = innerCityRoutes;
  } else if (selectedOption === 'area') {
    routes = areaRoutes;
  }

  return (
    <div className={styles.container}>
      <h2>Chọn hình thức vận chuyển</h2>

      <div className={styles.buttonContainer}>
        <button
          className={styles.optionButton}
          onClick={() => handleOptionChange('export')}
        >
          Xuất khẩu
        </button>
        <button
          className={styles.optionButton}
          onClick={() => handleOptionChange('innerCity')}
        >
          Nội thành
        </button>
        <button
          className={styles.optionButton}
          onClick={() => handleOptionChange('area')}
        >
          Khu vực
        </button>
      </div>

      {selectedOption && (
        <div className={styles.dropdownContainer}>
          <label htmlFor="route">Chọn tuyến đường:</label>
          <select id="route" value={selectedRoute} onChange={handleRouteChange} className={styles.dropdown}>
            <option value="">Chọn tuyến</option>
            {routes.map((route, index) => (
              <option key={index} value={route.route}>
                {route.route} - {route.price}
              </option>
            ))}
          </select>
        </div>
      )}

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

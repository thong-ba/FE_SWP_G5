import React, { useState, useEffect } from 'react';  
import { useNavigate } from 'react-router-dom';  
import styles from './ShippingOption.module.css';  

const ShippingOption = () => {  
  const [selectedOption, setSelectedOption] = useState('');  
  const [selectedRoute, setSelectedRoute] = useState(null);  
  const [innerCityRoutes, setInnerCityRoutes] = useState([]);  
  const [localRoutes, setLocalRoutes] = useState([]);  
  const [internationalRoutes, setInternationalRoutes] = useState([]);  
  const navigate = useNavigate();  

  // Fetch data for "innerCity"  
  useEffect(() => {  
    if (selectedOption === 'innerCity') {  
      fetch('https://localhost:7046/api/TransportService/Domestic')  
        .then((response) => response.json())  
        .then((data) => {  
          if (data.isSuccess) {  
            setInnerCityRoutes(data.result);  
          } else {  
            console.error('Error occurred when receiving data from API');  
          }  
        })  
        .catch((error) => {  
          console.error('Error occurred when calling API:', error);  
        });  
    }  
  }, [selectedOption]);  

  // Fetch data for "local"  
  useEffect(() => {  
    if (selectedOption === 'local') {  
      fetch('https://localhost:7046/api/TransportService/Local')  
        .then((response) => response.json())  
        .then((data) => {  
          if (data.isSuccess) {  
            setLocalRoutes(data.result);  
          } else {  
            console.error('Error in fetching data from API');  
          }  
        })  
        .catch((error) => {  
          console.error('Error occurred when calling API:', error);  
        });  
    }  
  }, [selectedOption]);  

  // Fetch data for "international"  
  useEffect(() => {  
    if (selectedOption === 'International') {  
      fetch('https://localhost:7046/api/TransportService/International')  
        .then((response) => response.json())  
        .then((data) => {  
          if (data.isSuccess) {  
            setInternationalRoutes(data.result);  
          } else {  
            console.error('Error in fetching data from API');  
          }  
        })  
        .catch((error) => {  
          console.error('Error occurred when calling API:', error);  
        });  
    }  
  }, [selectedOption]);  

  const handleOptionChange = (option) => {  
    setSelectedOption(option);  
    setSelectedRoute(null);  
  };  

  const handleRouteSelection = (routeId) => {  
    setSelectedRoute(routeId);  
  };  

  const handleNext = () => {  
    const selectedRouteDetails =  
      selectedOption === 'International'  
        ? internationalRoutes.find((route) => route.id === selectedRoute)  
        : selectedOption === 'innerCity'  
        ? innerCityRoutes.find((route) => route.id === selectedRoute)  
        : selectedOption === 'local'  
        ? localRoutes.find((route) => route.id === selectedRoute)  
        : null;  

    if (selectedRouteDetails) {  
      navigate('/bookingorder', {  
        state: {  
          routeId: selectedRouteDetails.id,  
          shippingType: selectedOption  
        }  
      });  
    } else {  
      console.warn('Cannot find suitable route for selected option and route');  
    }  
  };  

  const renderTable = (routes) => (  
    <table className={styles.routeTable}>  
      <thead>  
        <tr>  
          <th>Select</th>  
          <th>Id</th>  
          <th>Transport Name</th>  
          <th>Transport Type</th>  
          <th>Description</th>  
          <th>Price Per Km</th>  
          <th>Price Per Kg</th>  
          <th>Price Per Units</th>  
          <th>From</th>  
          <th>To</th>  
          <th>Status</th>  
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
            <td>{route.transportType === 0 ? 'Local' : 'International'}</td>  
            <td>{route.description}</td>  
            <td>{route.pricePerKm ? route.pricePerKm + ' VND' : '-'}</td>   
            <td>{route.pricePerKg ? route.pricePerKg + ' VND' : '-'}</td>  
            <td>{route.pricePerAmount ? route.pricePerAmount + ' VND' : '-'}</td>   
            <td>{route.fromProvince}</td>  
            <td>{route.toProvince}</td>  
            <td>{route.isActive ? 'Active' : 'Inactive'}</td>   
          </tr>  
        ))}  
      </tbody>  
    </table>  
  );  

  return (  
    <div className={styles.container}>  
      <h2>Select Transport Service</h2>  

      <div className={styles.buttonContainer}>  
        <button  
          className={styles.optionButton}  
          onClick={() => handleOptionChange('International')}  
        >  
          International Transport Services  
        </button>  
        <button  
          className={styles.optionButton}  
          onClick={() => handleOptionChange('innerCity')}  
        >  
          Domestic Transport Services  
        </button>  
        <button  
          className={styles.optionButton}  
          onClick={() => handleOptionChange('local')}  
        >  
          Local Transport Services  
        </button>  
      </div>  

      {selectedOption === 'International' && renderTable(internationalRoutes)}  
      {selectedOption === 'innerCity' && renderTable(innerCityRoutes)}  
      {selectedOption === 'local' && renderTable(localRoutes)}  

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
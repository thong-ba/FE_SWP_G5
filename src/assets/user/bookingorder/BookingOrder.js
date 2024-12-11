import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './BookingOrder.module.css'; // Importing CSS module
import { useNavigate, useLocation } from 'react-router-dom';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const BookingOrder = () => {
    const [step, setStep] = useState(1); // Start with Step 1
    const [senderInfo, setSenderInfo] = useState({ fullName: '', phone: '', address: '' });
    const [receiverInfo, setReceiverInfo] = useState({ fullName: '', phone: '', address: '' });
    const [newFish, setNewFish] = useState({ name: '', age: '', image: null, weight: '', quantity: 1 });
    const [newFishQualification, setNewFishQualification] = useState({ name: '', certificateImage: null });
    const [shippingType, setShippingType] = useState('');
    const [routeId, setRouteId] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedIndexes, setSelectedIndexes] = useState([]);
    const [senderCoordinates, setSenderCoordinates] = useState(null);
    const [receiverCoordinates, setReceiverCoordinates] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [distance, setDistance] = useState(null);
    const [shippingCost, setShippingCost] = useState(null);
    const [totalFishCost, setTotalFishCost] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const handleAddFish = () => {
        setSelectedProducts([...selectedProducts, newFish]);
        setNewFish({ name: '', age: '', image: null, weight: '', quantity: 1 });
    };

    const handleGoToAddFishQualification = () => {
        if (selectedIndexes.length > 0) {
            setStep(3);
        }
    };
    // const handleInputChange = (e, field) => {
    //     const { name, value } = e.target;
    //     setNewFish(prevFish => ({ ...prevFish, [name]: value }));
    // };
    const handleInputChange = (e, setStateFunction) => {
        const { name, value } = e.target;
        setStateFunction((prev) => ({ ...prev, [name]: value }));
    };
    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        setNewFish(prevFish => ({ ...prevFish, [field]: file }));
    };

    const handleNextStep = () => setStep(prev => prev + 1);
    const handlePrevStep = () => setStep(prev => prev - 1);

    const handleCheckboxChange = (index) => {
        if (selectedIndexes.includes(index)) {
            setSelectedIndexes(selectedIndexes.filter(i => i !== index));
        } else {
            setSelectedIndexes([...selectedIndexes, index]);
        }
    };

    const handleDeleteSelected = () => {
        const updatedProducts = selectedProducts.filter((_, index) => !selectedIndexes.includes(index));
        setSelectedProducts(updatedProducts);
        setSelectedIndexes([]);
    };
    const handleAddProduct = (e) => {
        const product = e.target.value;
        if (product && !selectedProducts.includes(product)) {
            setSelectedProducts([...selectedProducts, product]);
        }
    };
    const handleAddQualificationSelected = () => {
        const updatedProducts = [...selectedProducts];
        selectedIndexes.forEach((index) => {
            updatedProducts[index].qualification = newFishQualification;
        });
        setSelectedProducts(updatedProducts);
        setNewFishQualification({ name: '', certificateImage: null });
        setStep(3);
    };

    const geocodeAddress = async (address) => {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
    
            if (data.length > 0) {
                return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
            } else {
                console.error(`No coordinates found for the address: ${address}`);
                alert('Unable to find coordinates for the given address.');
                return null;
            }
        } catch (error) {
            console.error('Geocoding error:', error);
            alert('An error occurred while retrieving coordinates.');
            return null;
        }
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    };

    // useEffect(() => {
    //     const fetchCoordinates = async () => {
    //         if (senderInfo.address && receiverInfo.address) {
    //             const senderCoords = await geocodeAddress(senderInfo.address);
    //             const receiverCoords = await geocodeAddress(receiverInfo.address);

    //             if (senderCoords) setSenderCoordinates(senderCoords);
    //             if (receiverCoords) setReceiverCoordinates(receiverCoords);

    //             if (senderCoords && receiverCoords) {
    //                 const distance = calculateDistance(
    //                     senderCoords[0], senderCoords[1],
    //                     receiverCoords[0], receiverCoords[1]
    //                 );
    //                 setDistance(distance);
    //             }
    //         }
    //     };
    //     fetchCoordinates();
    // }, [senderInfo.address, receiverInfo.address]);

    useEffect(() => {
        if (navigator.permissions) {
            navigator.permissions.query({ name: 'geolocation' }).then((result) => {
                if (result.state === 'denied') {
                    alert('Location permission is denied. Please allow location access.');
                }
            });
        }

        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log('Location fetched:', latitude, longitude);
                    setSenderCoordinates([latitude, longitude]);
                },
                (error) => {
                    handleGeolocationError(error);
                    setSenderCoordinates([10.8231, 106.6297]); // Default fallback location
                },
                {
                    enableHighAccuracy: true,
                    timeout: 20000,  // Increase timeout duration
                }
            );

            return () => {
                navigator.geolocation.clearWatch(watchId);
            };
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    const handleGeolocationError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                console.error('User denied the request for Geolocation.');
                break;
            case error.POSITION_UNAVAILABLE:
                console.error('Location information is unavailable.');
                break;
            case error.TIMEOUT:
                console.error('The request to get user location timed out.');
                break;
            case error.UNKNOWN_ERROR:
                console.error('An unknown error occurred.');
                break;
            default:
                console.error('Error getting location:', error);
                break;
        }
    };

    useEffect(() => {
        const fetchCoordinates = async () => {
            if (senderInfo.address && receiverInfo.address) {
                const senderCoords = await geocodeAddress(senderInfo.address);
                const receiverCoords = await geocodeAddress(receiverInfo.address);

                if (senderCoords) setSenderCoordinates(senderCoords);
                if (receiverCoords) setReceiverCoordinates(receiverCoords);

                if (senderCoords && receiverCoords) {
                    const distance = calculateDistance(
                        senderCoords[0], senderCoords[1],
                        receiverCoords[0], receiverCoords[1]
                    );
                    setDistance(distance);
                }
                else {
                    alert('Unable to fetch coordinates for one or both addresses');
                }
            } else {
                console.error('Sender or receiver address is empty');
            }
        };
        fetchCoordinates();
    }, [senderInfo.address, receiverInfo.address]);
    useEffect(() => {
        if (location.state && location.state.shippingType) {
            setShippingType(location.state.shippingType); // Lấy shippingType từ state
        }
    }, [location]);

    useEffect(() => {
        if (distance !== null && shippingType) {
            let cost = 0;
            if (shippingType === 'express') {
                cost = distance * 2;
            } else if (shippingType === 'fast') {
                cost = distance * 1.5;
            } else if (shippingType === 'standard') {
                cost = distance * 1;
            }
            setShippingCost(cost);
        }
    }, [shippingType, distance]);

    useEffect(() => {
        setTotalFishCost(selectedProducts.length * 100000); // 100000 VND per fish
    }, [selectedProducts]);

    useEffect(() => {
        setTotalAmount(totalFishCost + (shippingCost || 0));
    }, [totalFishCost, shippingCost]);


    useEffect(() => {
        if (location.state && location.state.routeId) {
            setRouteId(location.state.routeId); // Lấy routeId từ state
        }
    }, [location]);
    useEffect(() => {
        console.log(location.state);  // In ra để kiểm tra dữ liệu
        if (location.state && location.state.routeId) {
            setRouteId(location.state.routeId);
        }
    }, [location]);


    const handleSubmit = () => {
        const orderData = {
            senderInfo,
            receiverInfo,
            shippingType,
            selectedProducts,
            newFish,
            newFishQualification,
        };

        // Save to sessionStorage
        sessionStorage.setItem('orderData', JSON.stringify(orderData));

        // Navigate to payment page
        navigate('/payment');
    };

    return (
        <div className={styles.bookingOrderContainer}>
            <div className={styles.formContainer}>
                {/* Step 1: Sender, Receiver, and Shipping */}
                {step === 1 && (
                    <div className={styles.step}>
                        <h2>Sender Information</h2>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Sender's Full Name"
                            value={senderInfo.fullName}
                            onChange={(e) => handleInputChange(e, setSenderInfo)}
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Sender's Phone"
                            value={senderInfo.phone}
                            onChange={(e) => handleInputChange(e, setSenderInfo)}
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Sender's Address"
                            value={senderInfo.address}
                            onChange={(e) => handleInputChange(e, setSenderInfo)}
                        />

                        <h2>Receiver Information</h2>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Receiver's Full Name"
                            value={receiverInfo.fullName}
                            onChange={(e) => handleInputChange(e, setReceiverInfo)}
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Receiver's Phone"
                            value={receiverInfo.phone}
                            onChange={(e) => handleInputChange(e, setReceiverInfo)}
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Receiver's Address"
                            value={receiverInfo.address}
                            onChange={(e) => handleInputChange(e, setReceiverInfo)}
                        />

                        {/* Display the Shipping Type Information */}
                        <h2>Shipping Information</h2>
                        <div className={styles.shippingInfo}>
                            <p><strong>Shipping Type:</strong> {shippingType}</p>
                            <p><strong>Id tuyến đường:</strong> {routeId || 'Không có dữ liệu'}</p>
                        </div>
                        {distance !== null && shippingCost !== null && (
                            <div className={styles.shippingInfo}>
                                <p><strong>Tổng số km:</strong> {distance.toFixed(2)} km</p>
                                <p><strong>Số tiền vận chuyển:</strong> {shippingCost.toFixed(2)} VND</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Step 2: Add Products */}
                {step === 2 && (
                    <div className={styles.step}>
                        <h2>Thêm Thông Tin Cá</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Tên cá"
                            value={newFish.name}
                            onChange={(e) => handleInputChange(e, setNewFish)}
                        />
                        <input
                            type="number"
                            name="age"
                            placeholder="Tuổi cá"
                            value={newFish.age}
                            onChange={(e) => handleInputChange(e, setNewFish)}
                        />
                        <input
                            type="file"
                            name="image"
                            onChange={(e) => handleFileChange(e, 'image')}
                        />
                        <input
                            type="number"
                            name="weight"
                            placeholder="Cân nặng cá"
                            value={newFish.weight}
                            onChange={(e) => handleInputChange(e, setNewFish)}
                        />
                        {/* <input
                            type="file"
                            name="certificateImage"
                            onChange={(e) => handleFileChange(e, 'certificateImage')}
                        /> */}

                        <button onClick={handleAddFish}>Thêm Cá</button>

                        {/* Hiển thị danh sách sản phẩm đã chọn */}
                        <div>
                            <h3>Sản phẩm đã chọn:</h3>
                            <ul className={styles.fishList}>
                                {selectedProducts.map((fish, index) => (
                                    <li key={index} className={styles.fishItem}>
                                        <input
                                            type="checkbox"
                                            checked={selectedIndexes.includes(index)}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                        <span>
                                            {fish.name} - {fish.age} tuổi - {fish.weight}kg
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={handleDeleteSelected}
                                className={styles.deleteSelectedButton}
                                disabled={selectedIndexes.length === 0}
                            >
                                Xóa mục đã chọn
                            </button>
                            <button
                                onClick={handleAddQualificationSelected}
                                className={styles.deleteSelectedButton}
                                disabled={selectedIndexes.length === 0}
                            >
                                Thêm chứng nhận cho mục đã chọn
                            </button>
                        </div>
                    </div>

                )}
                {/* Continue Button */}
                {/* <div className={styles.navigationButtons}>
                    <button onClick={handleNextStep}>Tiếp theo</button>
                </div> */}
                {/* Step 3: Add Fish Qualification */}
                {step === 3 && (
                    <div className={styles.step}>
                        <h2>Thêm Thông Tin Chứng Nhận Cá</h2>

                        {/* Fish Qualification Name */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="qualificationName">Tên Chứng Nhận</label>
                            <input
                                id="qualificationName"
                                name="name"
                                type="text"
                                value={newFishQualification.name}
                                onChange={(e) => handleInputChange(e, setNewFishQualification)}
                                placeholder="Nhập tên chứng nhận"
                            />
                        </div>


                        {/* Certificate Image Upload */}
                        <div className={styles.fileInputGroup}>
                            <label htmlFor="certificateImage">Tải lên chứng nhận cá</label>
                            <input
                                type="file"
                                name="certificateImage"
                                onChange={(e) => handleFileChange(e, 'certificateImage')}
                            />
                        </div>

                        {/* Display the Selected Qualification */}
                        {newFishQualification.name && (
                            <div className={styles.selectedQualification}>
                                <h3>Thông tin chứng nhận đã nhập:</h3>
                                <p>{newFishQualification.name}</p>
                                {newFishQualification.certificateImage && (
                                    <img
                                        src={URL.createObjectURL(newFishQualification.certificateImage)}
                                        alt="Certificate"
                                        className={styles.certificateImage}
                                    />
                                )}
                            </div>
                        )}


                    </div>
                )}
                {/* Navigation */}
                <div className={styles.navigationButtons}>
                    {step > 1 && <button onClick={handlePrevStep}>Back</button>}
                    {step < 2 && <button onClick={handleNextStep}>Next</button>}
                    {step === 2 && <button onClick={handleSubmit}>Submit</button>}
                    {step === 3 && <button onClick={handleSubmit}>Submit</button>}
                </div>
            </div>

            {/* Map Section */}
            <div className={styles.mapContainer}>
                <MapContainer center={senderCoordinates || [10.8231, 106.6297]} zoom={12} style={{ width: '100%', height: '80vh' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {senderCoordinates && <Marker position={senderCoordinates} />}
                    {receiverCoordinates && <Marker position={receiverCoordinates} />}
                </MapContainer>
            </div>
        </div>
    );
};

export default BookingOrder;


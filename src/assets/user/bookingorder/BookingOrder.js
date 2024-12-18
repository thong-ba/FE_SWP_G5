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
    const [senderfishInfo, setSenderFishInfo] = useState({ Name: '', Age: '', Weight: '', Length: '' });
    const [fishQualification, setSenderFishQualificationInfo] = useState({ name: '', file: null });
    const [shippingType, setShippingType] = useState('');
    const [routeId, setRouteId] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedFish, setSelectedFish] = useState([]);
    const [senderCoordinates, setSenderCoordinates] = useState(null);
    const [receiverCoordinates, setReceiverCoordinates] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [distance, setDistance] = useState(null);
    const [selectedIndexes, setSelectedIndexes] = useState([]);
    const [shippingCost, setShippingCost] = useState(null);
    const [totalFishCost, setTotalFishCost] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const handleAddFish = () => {
        setSelectedProducts([...selectedProducts, newFish]);
        setNewFish({ name: '', age: '', image: null, weight: '', certificateImage: null });
    };

    // const handleInputChange = (e, field) => {
    //     const { name, value } = e.target;
    //     setNewFish(prevFish => ({ ...prevFish, [name]: value }));
    // };
    const handleInputChange = (e, setStateFunction) => {
        const { name, value } = e.target;
        setInfo(prevInfo => ({ ...prevInfo, [name]: value }));
    };

    const handleNextStep = () => {
        sessionStorage.setItem('senderInfo', JSON.stringify(senderInfo));
        sessionStorage.setItem('receiverInfo', JSON.stringify(receiverInfo));
        sessionStorage.setItem('shippingType', shippingType);
        sessionStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
        sessionStorage.setItem('totalAmount', totalAmount);
        setStep(prev => prev + 1);
    };

    const handlePrevStep = () => setStep(prev => prev - 1);

    const handleOptional = () => setStep(prev => prev + 1);

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

    const handleAddFish = (e) => {
        const fish = e.target.value;
        if (fish && !selectedFish.includes(fish)) {
            setSelectedFish([...selectedFish, fish]);
        }
    };

    const geocodeAddress = async (address) => {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.length > 0) {
                return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
            } else {
                console.error('No coordinates found for the address.');
                return null;
            }
        } catch (error) {
            console.error('Geocoding error:', error);
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
            senderfishInfo,
            fishQualification,
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
                {/* Step 2: Add OrderFish */}
                {step === 2 && (
                    <div className={styles.step}>
                        <h2>Order Information</h2>

                        {/* Sender Fish Information */}
                        <input
                            type="text"
                            name="Name"
                            placeholder="Fish Name"
                            value={senderfishInfo.Name}
                            onChange={(e) => handleInputChange(e, setSenderFishInfo)}
                        />
                        <input
                            type="text"
                            name="Age"
                            placeholder="Fish Age"
                            value={senderfishInfo.Age}
                            onChange={(e) => handleInputChange(e, setSenderFishInfo)}
                        />
                        <input
                            type="text"
                            name="Weight"
                            placeholder="Fish Weight"
                            value={senderfishInfo.Weight}
                            onChange={(e) => handleInputChange(e, setSenderFishInfo)}
                        />
                        <input
                            type="text"
                            name="Length"
                            placeholder="Fish Length"
                            value={senderfishInfo.Length}
                            onChange={(e) => handleInputChange(e, setSenderFishInfo)}
                        />
                    </div>
                )}

                {step === 3 && (
                    <div className={styles.step}>
                        <h2>Fish Qualification (Optional)</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Fish Name"
                            value={fishQualification.name}
                            onChange={(e) => handleInputChange(e, setSenderFishQualificationInfo)}
                        />
                        <input
                            type="file"
                            accept="*"
                            onChange={(e) => handleInputChange(e, setSenderFishQualificationInfo)}
                        />
                        <p>{fishQualification.file ? fishQualification.file.name : "No file selected"}</p>
                    </div>
                )}

                {/* Step 2: Add Products */}
                {step === 4 && (
                    <div className={styles.addProductsStep}>
                        <h2 className={styles.addProductsTitle}>Add Products</h2>
                        <select className={styles.productSelect} onChange={handleAddProduct}>
                            <option value="">Select a product</option>
                            <option value="Koi 1">Koi 1</option>
                            <option value="Koi 2">Koi 2</option>
                            <option value="Koi 3">Koi 3</option>
                        </select>
                        <ul className={styles.productList}>
                            {selectedProducts.map((product, index) => (
                                <li key={index} className={styles.productListItem}>{product}</li>
                            ))}
                        </ul>

                        <div className={styles.costInfo}>
                            <p><strong>Tổng tiền cá koi:</strong> {totalFishCost.toFixed(2)} VND</p>
                            <p><strong>Tổng tiền vận chuyển:</strong> {shippingCost ? shippingCost.toFixed(2) : 0} VND</p>
                            <p><strong>Tổng số tiền:</strong> {totalAmount.toFixed(2)} VND</p>
                        </div>
                    </div>
                )}


                {/* Navigation */}
                <div className={styles.navigationButtons}>
                    {step > 1 && <button onClick={handlePrevStep}>Back</button>}
                    {step === 2 && <button onClick={handleSubmit}>Submit</button>}
                    {step > 3 && <button onClick={handleOptional}>FishQualification</button>}
                    {step < 3 && <button onClick={handleNextStep}>Next</button>}


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


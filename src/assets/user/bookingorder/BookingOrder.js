import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './BookingOrder.module.css'; // Importing CSS module
import { useNavigate, useLocation } from 'react-router-dom';
import { CreateOrderFishService } from '../../../api/OrderFishApi';
import { CreateFishQualificationService } from '../../../api/FishQualification';
import { CreateOrderService } from '../../../api/OrderApi';
import axios from 'axios';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const BookingOrder = () => {
    const [step, setStep] = useState(1); // Start with Step 1
    // const [senderInfo, setSenderInfo] = useState({ fullName: '', phone: '', address: '' });
    // const [receiverInfo, setReceiverInfo] = useState({ fullName: '', phone: '', address: '' });
    const [orderInfo, setOrderInfo] = useState({ fromAddress: '', toAddress: '', receiverPhone: '', receiverName: '', notes: '', });
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
    const [file, setFile] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [name, setName] = useState(null);
    const [age, setAge] = useState(null);
    const [weight, setWeight] = useState(null);
    const [length, setLength] = useState(null);

    const [qname, setQName] = useState(null);
    const [qfile, setQFile] = useState(null);
    const [orderfishId, setOrderFishId] = useState(null);



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
    // const handleFileChange = (e, field) => {
    //     const file = e.target.files[0];
    //     setNewFish(prevFish => ({ ...prevFish, [field]: file }));
    // };

    // const handleNextStep = async () => {
    //     try {
    //         // Create the order data to be sent
    //         const token = sessionStorage.getItem('token');
    //         console.log("Token:", token);
    //         if (!token) {
    //             alert('Bạn cần đăng nhập để thực hiện hành động này.');
    //         return;
    //         }

    //         const orderData = {
    //             fromAddress: orderInfo.fromAddress, // Sender's address
    //             toAddress: orderInfo.toAddress,    // Receiver's address
    //             receiverPhone: orderInfo.receiverPhone, // Receiver's phone
    //             receiverName: orderInfo.receiverName,   // Receiver's name
    //             notes: orderInfo.notes,
    //             transportServiceId: routeId,
    //         };

    //         const response = await axios.post('https://localhost:7046/api/Order/create-order', orderData, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${token}`, // Gửi token trong Authorization header
    //             },
    //         });

    //         if (response.data && response.data.orderId) {
    //             console.log('Order created successfully:', response.data);
    //             setStep(prevStep => prevStep + 1);
    //         }
    //     } catch (error) {
    //         console.error('Error creating order:', error);
    //         alert('An error occurred while creating the order. Please try again.');
    //     }
    // }



    const handleNextStep = async () => {
        try {
            // Create the order data to be sent
            const token = sessionStorage.getItem('token');
            console.log("Token:", token);

            if (!token) {
                alert('You need to login as customer first!!!!');
                return; // Return early if no token is found
            }

            const orderData = {
                fromAddress: orderInfo.fromAddress, // Sender's address
                toAddress: orderInfo.toAddress,     // Receiver's address
                receiverPhone: orderInfo.receiverPhone, // Receiver's phone
                receiverName: orderInfo.receiverName,  // Receiver's name
                notes: orderInfo.notes,
                transportServiceId: routeId,
            };

            // Make the API call to create the order
            const response = await axios.post('https://localhost:7046/api/Order/create-order', orderData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("response", response);

            setStep(prevStep => prevStep + 1);

            console.log("id", response.data.result);
            if (response.data.result) {
                setOrderId(response.data.result);
            }

            

            // } else {
            //     alert('Failed to create the order. Please try again.');
            // }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('An error occurred while creating the order. Please try again.');
        }
    };
    

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
                // } else {
                //     console.error(`No coordinates found for the address: ${address}`);
                //     alert('Unable to find coordinates for the given address.');
                //     return null;
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
            if (orderInfo.fromAddress && orderInfo.toAddress) {
                const senderCoords = await geocodeAddress(orderInfo.fromAddress);
                const receiverCoords = await geocodeAddress(orderInfo.toAddress);

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
    }, [orderInfo.fromAddress, orderInfo.toAddress]);
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
        setTotalAmount(totalFishCost /*+ (shippingCost || 0) */ );
    }, [totalFishCost   /* , shippingCost */] );


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


    // const handleSubmit = async () => {
    //     const orderData = {
    //         orderInfo,
    //         shippingType,
    //         selectedProducts,
    //         newFish,
    //         newFishQualification,
    //     };

    //     // Log the selected fish for debugging
    //     console.log("Selected Fish:", selectedProducts.filter((fish, index) => selectedIndexes.includes(index)));

    //     // Save the order data to sessionStorage
    //     sessionStorage.setItem("orderData", JSON.stringify(orderData));

    //     try {
    //         // Create the new fish order in the database
    //         const orderResponse = await CreateOrderFishService({
    //             orderInfo,
    //             shippingType,
    //             selectedProducts: selectedProducts.filter((fish, index) => selectedIndexes.includes(index)), // Only include selected fish
    //         });

    //         if (orderResponse && orderResponse.id) {
    //             const orderId = orderResponse.id;
    //             console.log("Order created successfully. Order ID:", orderId);

    //             // Save new fish qualifications if any
    //             if (newFishQualification && newFishQualification.name) {
    //                 const qualificationPayload = {
    //                     orderId,  // Link qualification to the created order
    //                     name: newFishQualification.name,
    //                     certificateImage: newFishQualification.certificateImage,
    //                 };

    //                 await CreateFishQualificationService(qualificationPayload);
    //                 console.log("Fish qualification saved successfully.");
    //             }

    //             // Save new fish if any
    //             if (newFish && newFish.name) {
    //                 const { name, age, image, weight } = newFish; // Exclude quantity from the payload
    //                 const fishPayload = {
    //                     orderId, // Link new fish to the created order
    //                     name,
    //                     age,
    //                     image,
    //                     weight,
    //                 };

    //                 await CreateOrderFishService(fishPayload); // Use CreateFishService for saving fish
    //                 console.log("New fish saved successfully.");
    //             }

    //             // Now add the selected fish to the database
    //             const selectedFishPayload = selectedProducts.filter((fish, index) => selectedIndexes.includes(index)).map(fish => ({
    //                 orderId,  // Link fish to the created order
    //                 name: fish.name,
    //                 age: fish.age,
    //                 weight: fish.weight,
    //                 length: fish.length, // Include length if applicable
    //             }));

    //             for (const fishPayload of selectedFishPayload) {
    //                 await CreateOrderFishService(fishPayload); // Add each selected fish to the database
    //                 console.log("Selected fish saved successfully.");
    //             }

    //             // Navigate to payment page
    //             navigate("/payment");
    //         } else {
    //             alert("Failed to create the order. Please try again.");
    //         }
    //     } catch (error) {
    //         console.error("Error submitting order and data:", error);
    //         alert("An error occurred while submitting the order. Please try again.");
    //     }
    // };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setQFile(e.target.files[0])
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("Name", name);
        formData.append("Age", age);
        formData.append("Weight", weight);
        formData.append("Length", length);
        formData.append("OrderId", orderId);
        if (file) formData.append("File", file);

        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }


        try {
            const response = await axios.post("https://localhost:7046/api/OrderFish/GetCreateOrderFish", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Success", response.data);



            if (response.data.result) {
                const orderFishId = response.data.result; // Ensure the ID is saved correctly
                console.log("Fish Order ID:", orderFishId);
    
                const formQualification = new FormData();
                formQualification.append("Name", qname); // Qualification name
                formQualification.append("OrderFishId", orderFishId); // Use the correct orderFishId here
                if (qfile) formQualification.append("File", qfile); // Qualification file if available
    
                // Log the qualification FormData to ensure it's populated
                for (let pair of formQualification.entries()) {
                    console.log(pair[0], pair[1]);
                }
    
                // Send qualification data after the order creation is successful
                const qualificationResponse = await axios.post(
                    "https://localhost:7046/api/FishQualification/create-fishQualification", // Adjust endpoint if necessary
                    formQualification,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
    
                console.log("Qualification Success:", qualificationResponse.data);
    
                // Navigate to the payment page upon success
                navigate(`/payment?orderId=${orderId}`);
            } else {
                console.error("Order creation failed, no order ID returned.");
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
        }


    };


    return (
        <div className={styles.bookingOrderContainer}>
            <div className={styles.formContainer}>
                {/* Step 1: Sender, Receiver, and Shipping */}
                {step === 1 && (
                    <div className={styles.step}>

                        {/* New input fields for the additional details */}
                        <h2>Order Information</h2>
                        <input
                            type="text"
                            name="fromAddress"
                            placeholder="Sender's From Address"
                            value={orderInfo.fromAddress}
                            onChange={(e) => handleInputChange(e, setOrderInfo)}
                        />
                        <input
                            type="text"
                            name="toAddress"
                            placeholder="Receiver's To Address"
                            value={orderInfo.toAddress}
                            onChange={(e) => handleInputChange(e, setOrderInfo)}
                        />
                        <input
                            type="text"
                            name="receiverPhone"
                            placeholder="Receiver's Phone"
                            value={orderInfo.receiverPhone}
                            onChange={(e) => handleInputChange(e, setOrderInfo)}
                        />
                        <input
                            type="text"
                            name="receiverName"
                            placeholder="Receiver's Name"
                            value={orderInfo.receiverName}
                            onChange={(e) => handleInputChange(e, setOrderInfo)}
                        />
                        <textarea
                            className='add-note'
                            name="notes"
                            placeholder="Additional Notes"
                            value={orderInfo.notes}
                            onChange={(e) => handleInputChange(e, setOrderInfo)}
                        />

                        {/* Display the Shipping Type Information */}
                        <h2>Shipping Information</h2>
                        <div className={styles.shippingInfo}>
                            <p><strong>Shipping Type:</strong> {shippingType}</p>
                            <p><strong>Transport ID:</strong> {routeId || 'Không có dữ liệu'}</p>
                        </div>
                        {distance !== null  /*&& shippingCost !== null */ && (
                            <div className={styles.shippingInfo}>
                                <p><strong>Total Distance:</strong> {distance.toFixed(2)} km</p>
                                {/* <p><strong>Transport Feed:</strong> {shippingCost.toFixed(2)} VND</p> */}
                            </div>
                        )}
                    </div>
                )}

                {/* Step 2: Add Products */}
                {step === 2 && (
                    <div className={styles.step}>
                        <h2>Adding Fish Information</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Fish Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                            <input
                                type="number"
                                name="age"
                                placeholder="Fish Age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                            <input
                                type="number"
                                name="weight"
                                placeholder="Fish Weight"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                            <input
                                type="number"
                                name="length"
                                placeholder="Fish Length"
                                value={length}
                                onChange={(e) => setLength(e.target.value)}
                            />
                            <input type="file" onChange={handleFileChange} />
                            {/* <input
                            type="file"
                            name="certificateImage"
                            onChange={(e) => handleFileChange(e, 'certificateImage')}
                        /> */}
                            <button type="submit">Submit</button>
                        </form>

                        <button onClick={handleAddFish}>Add Fish</button>

                        {/* Hiển thị danh sách sản phẩm đã chọn */}
                        <div>
                            <h3>Selected Fish:</h3>
                            <ul className={styles.fishList}>
                                {selectedProducts.map((fish, index) => (
                                    <li key={index} className={styles.fishItem}>
                                        <input
                                            type="checkbox"
                                            checked={selectedIndexes.includes(index)}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                        <span>
                                            {fish.name} - {fish.age} Age - {fish.weight}kg - {fish.length}cm
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={handleDeleteSelected}
                                className={styles.deleteSelectedButton}
                                disabled={selectedIndexes.length === 0}
                            >
                                Delete Selected
                            </button>
                            <button
                                onClick={handleAddQualificationSelected}
                                className={styles.deleteSelectedButton}
                                disabled={selectedIndexes.length === 0}
                            >
                                Adding Fish Certificated
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
                        <h2>Adding Fish Certificated</h2>
                        {/* Fish Qualification Name */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="qualificationName">Certificate's Name</label>
                            <form onSubmit={handleSubmit}>
                                {/* Name input */}
                                <input
                                    type="text"  // Use type "text" instead of "string"
                                    name="Name"
                                    placeholder="Certificate's Name"
                                    value={qname}
                                    onChange={(e) => setQName(e.target.value)}
                                />

                                {/* File input */}
                                <input
                                    type="file"
                                    onChange={handleFileChange}  // Ensure this function updates the file state
                                    required  // This ensures the file input is required before submitting
                                />

                                <button type="submit">Submit</button>
                            </form>
                        </div>
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


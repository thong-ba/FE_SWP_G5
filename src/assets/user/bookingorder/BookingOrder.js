import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './BookingOrder.css';

// Cấu hình lại icon cho marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const BookingOrder = () => {
    const [step, setStep] = useState(1);
    const [senderInfo, setSenderInfo] = useState({ fullName: '', phone: '', address: '' });
    const [receiverInfo, setReceiverInfo] = useState({ fullName: '', phone: '', address: '' });
    const [shippingType, setShippingType] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [senderCoordinates, setSenderCoordinates] = useState(null);
    const [receiverCoordinates, setReceiverCoordinates] = useState(null);
    const [distance, setDistance] = useState(null);  // Thêm trạng thái lưu trữ tổng số km
    const [shippingCost, setShippingCost] = useState(null);  // Thêm trạng thái lưu trữ số tiền vận chuyển

    const handleInputChange = (e, setInfo) => {
        const { name, value } = e.target;
        setInfo(prevInfo => ({ ...prevInfo, [name]: value }));
    };

    const handleNextStep = () => setStep(prev => prev + 1);
    const handlePrevStep = () => setStep(prev => prev - 1);

    const handleAddProduct = (e) => {
        const product = e.target.value;
        if (product && !selectedProducts.includes(product)) {
            setSelectedProducts([...selectedProducts, product]);
        }
    };

    // Geocoding function using Nominatim API
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

    // Tính toán khoảng cách giữa 2 điểm (đơn giản bằng Haversine Formula hoặc API sau này)
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of Earth in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in km
        return distance;
    };

    // Cập nhật tọa độ và tính toán khoảng cách
    useEffect(() => {
        const fetchCoordinates = async () => {
            if (senderInfo.address && receiverInfo.address) {
                const senderCoords = await geocodeAddress(senderInfo.address);
                const receiverCoords = await geocodeAddress(receiverInfo.address);

                console.log('Sender Coordinates:', senderCoords); // Kiểm tra tọa độ người gửi
                console.log('Receiver Coordinates:', receiverCoords); // Kiểm tra tọa độ người nhận

                if (senderCoords) setSenderCoordinates(senderCoords);
                if (receiverCoords) setReceiverCoordinates(receiverCoords);

                // Tính toán khoảng cách giữa sender và receiver
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


    // Cập nhật giá trị tiền vận chuyển khi thay đổi hình thức vận chuyển
    useEffect(() => {
        if (distance !== null && shippingType) {
            let cost = 0;
            // Giả lập giá trị tiền vận chuyển theo loại hình thức
            if (shippingType === 'express') {
                cost = distance * 2; // Giả sử 2 VND/km
            } else if (shippingType === 'fast') {
                cost = distance * 1.5; // Giả sử 1.5 VND/km
            } else if (shippingType === 'standard') {
                cost = distance * 1; // Giả sử 1 VND/km
            }
            setShippingCost(cost);
        }
    }, [shippingType, distance]);

    return (
        <div className="booking-order-container">
            <div className="form-container">
                {step === 1 && (
                    <div className="step">
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
                    </div>
                )}

                {step === 2 && (
                    <div className="step">
                        <h2>Shipping Options</h2>
                        <div className="option-buttons">
                            <div
                                className={`option-button ${shippingType === 'express' ? 'selected' : ''}`}
                                onClick={() => setShippingType('express')}
                            >
                                Hoả tốc
                            </div>
                            <div
                                className={`option-button ${shippingType === 'fast' ? 'selected' : ''}`}
                                onClick={() => setShippingType('fast')}
                            >
                                Nhanh
                            </div>
                            <div
                                className={`option-button ${shippingType === 'standard' ? 'selected' : ''}`}
                                onClick={() => setShippingType('standard')}
                            >
                                Tiêu chuẩn
                            </div>
                        </div>

                        {distance !== null && shippingCost !== null && (
                            <div className="shipping-info">
                                <p><strong>Tổng số km:</strong> {distance.toFixed(2)} km</p>
                                <p><strong>Số tiền vận chuyển:</strong> {shippingCost.toFixed(2)} VND</p>
                            </div>
                        )}
                    </div>
                )}

                {step === 3 && (
                    <div className="step">
                        <h2>Add Products</h2>
                        <select onChange={handleAddProduct}>
                            <option value="">Select a product</option>
                            <option value="Koi 1">Koi 1</option>
                            <option value="Koi 2">Koi 2</option>
                            <option value="Koi 3">Koi 3</option>
                        </select>
                        <ul>
                            {selectedProducts.map((product, index) => (
                                <li key={index}>{product}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="button-group">
                    {step > 1 && <button onClick={handlePrevStep}>Back</button>}
                    {step < 3 && <button onClick={handleNextStep}>Next</button>}
                </div>
            </div>

            {/* Bản đồ luôn hiển thị ở bên phải */}
            <div className="map-container">
                <MapContainer center={[10.8231, 106.6297]} zoom={10} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {senderCoordinates && <Marker position={senderCoordinates} />}
                    {receiverCoordinates && <Marker position={receiverCoordinates} />}
                </MapContainer>

            </div>
        </div>
    );
};

export default BookingOrder;

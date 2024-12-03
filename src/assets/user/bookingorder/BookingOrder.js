import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngLiteral } from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Add Leaflet CSS for map styling
import './BookingOrder.css';

const BookingOrder = () => {
    const [senderInfo, setSenderInfo] = useState({
        fullName: '',
        phone: '',
        email: '',
        city: '',
        district: '',
        ward: '',
        street: '',
        houseNumber: ''
    });

    const [receiverInfo, setReceiverInfo] = useState({
        fullName: '',
        phone: '',
        email: '',
        city: '',
        district: '',
        ward: '',
        street: '',
        houseNumber: ''
    });

    const [koiInfo, setKoiInfo] = useState({
        koiName: '',
        koiImage: null,
        quantity: 0,
        weight: 0,
        type: 'quantity' 
    });

    const [shippingInfo, setShippingInfo] = useState('standard'); 
    const [totalCost, setTotalCost] = useState(0);

    const [mapCenter] = useState({ lat: 14.0583, lng: 108.2772 });

    const handleInputChange = (e, setInfo) => {
        const { name, value } = e.target;
        setInfo(prevInfo => ({ ...prevInfo, [name]: value }));
    };

    const handleImageChange = (e) => {
        setKoiInfo(prevInfo => ({ ...prevInfo, koiImage: e.target.files[0] }));
    };

    useEffect(() => {
        // Calculate koi cost
        let koiCost = koiInfo.type === 'quantity'
            ? koiInfo.quantity * 1000000
            : koiInfo.weight * 1000000;

        // Calculate shipping cost
        let shippingRate = shippingInfo === 'express' ? 0.3 
                        : shippingInfo === 'fast' ? 0.25 
                        : 0.15;
        let shippingCost = koiCost * shippingRate;

        setTotalCost(koiCost + shippingCost);
    }, [koiInfo, shippingInfo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Total cost is: ${totalCost.toLocaleString('vi-VN')} VND`);
        window.location.href = '/payment'; // Redirect to payment page
    };

    return (
        <div className="booking-order-container">
            <div className="form-container">
                <h2>Sender Information</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="fullName" placeholder="Full Name" value={senderInfo.fullName} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
                    <input type="text" name="phone" placeholder="Phone Number" value={senderInfo.phone} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
                    <input type="email" name="email" placeholder="Email" value={senderInfo.email} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
                    <input type='text' name="city" placeholder='City' value={senderInfo.city} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
                    <input type='text' name="district" placeholder='District' value={senderInfo.district} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
                    <input type='text' name="ward" placeholder='Ward' value={senderInfo.ward} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
                    <input type='text' name="street" placeholder='Street' value={senderInfo.street} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
                    <input type='text' name="houseNumber" placeholder='House Number' value={senderInfo.houseNumber} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
                    

                    <h2>Receiver Information</h2>
                    <input type="text" name="fullName" placeholder="Full Name" value={receiverInfo.fullName} onChange={(e) => handleInputChange(e, setReceiverInfo)} required />
                    <input type="text" name="phone" placeholder="Phone Number" value={receiverInfo.phone} onChange={(e) => handleInputChange(e, setReceiverInfo)} required />
                    <input type="email" name="email" placeholder="Email" value={receiverInfo.email} onChange={(e) => handleInputChange(e, setReceiverInfo)} required />
                    <input type='text' name="city" placeholder='City' value={receiverInfo.city} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
                    <input type='text' name="district" placeholder='District' value={receiverInfo.district} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
                    <input type='text' name="ward" placeholder='Ward' value={receiverInfo.ward} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
                    <input type='text' name="street" placeholder='Street' value={receiverInfo.street} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
                    <input type='text' name="houseNumber" placeholder='House Number' value={receiverInfo.houseNumber} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
                    
                    <h2>Koi Fish Information</h2>
                    <input type="text" name="koiName" placeholder="Koi Fish Name" value={koiInfo.koiName} onChange={(e) => handleInputChange(e, setKoiInfo)} required />
                    <input type="file" name="koiImage" onChange={handleImageChange} required />

                    <div className="option-buttons">
                        <div className={`option-button ${koiInfo.type === 'quantity' ? 'selected' : ''}`} onClick={() => setKoiInfo({ ...koiInfo, type: 'quantity', quantity: 0, weight: 0 })}>
                            By Quantity (fish)
                        </div>
                        <div className={`option-button ${koiInfo.type === 'weight' ? 'selected' : ''}`} onClick={() => setKoiInfo({ ...koiInfo, type: 'weight', quantity: 0, weight: 0 })}>
                            By Weight (kg)
                        </div>
                    </div>

                    {koiInfo.type === 'quantity' ? (
                        <input type="number" name="quantity" placeholder="Quantity (pieces)" value={koiInfo.quantity} onChange={(e) => handleInputChange(e, setKoiInfo)} min="1" required />
                    ) : (
                        <input type="number" name="weight" placeholder="Weight (kg)" value={koiInfo.weight} onChange={(e) => handleInputChange(e, setKoiInfo)} step="0.1" min="0.1" required />
                    )}

                    <h2>Shipping Information</h2>
                    <div className="option-buttons">
                        {['express', 'fast', 'standard'].map(option => (
                            <div key={option} className={`option-button ${shippingInfo === option ? 'selected' : ''}`} onClick={() => setShippingInfo(option)}>
                                {option === 'express' ? 'Express (1-2 days)' : option === 'fast' ? 'Fast (3-4 days)' : 'Standard (4-7 days)'}
                            </div>
                        ))}
                    </div>

                    <h2>Total Cost</h2>
                    <p className="total-cost">Total Cost: {totalCost.toLocaleString('vi-VN')} VND</p>

                    <button type="submit">Place Order</button>
                </form>
            </div>

            <div className="map-container">
                <h2>Map of Vietnam</h2>
                <MapContainer center={mapCenter} zoom={6} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={mapCenter}>
                        <Popup>
                            Center of Vietnam.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default BookingOrder;

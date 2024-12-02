import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './BookingOrder.css';

const BookingOrder = () => {
    const [senderInfo, setSenderInfo] = useState({
        fullName: '',
        phone: '',
        email: '',
        houseNumber: '',
        ward: '',
        district: '',
        city: ''
    });

    const [receiverInfo, setReceiverInfo] = useState({
        fullName: '',
        phone: '',
        email: '',
        houseNumber: '',
        ward: '',
        district: '',
        city: ''
    });

    const [koiInfo, setKoiInfo] = useState({
        koiName: '',
        koiImage: null,
        quantity: 0,
        isByFish: true,
    });

    const [shippingMethod, setShippingMethod] = useState('');
    const [mapCenter, setMapCenter] = useState({ lat: 14.0583, lng: 108.2772 });

    const handleInputChange = (e, setInfo) => {
        const { name, value } = e.target;
        setInfo(prevInfo => ({ ...prevInfo, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ senderInfo, receiverInfo, koiInfo, shippingMethod });
    };

    const handleDeleteOrder = () => {
        console.log("Order Deleted");
    };

    return (
        <div className="booking-order-container">
            <div className="form-container">
                <h2>Sender Information</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="fullName" placeholder="Full Name" value={senderInfo.fullName} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
                    <input type="text" name="phone" placeholder="Phone Number" value={senderInfo.phone} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
                    <input type="email" name="email" placeholder="Email" value={senderInfo.email} onChange={(e) => handleInputChange(e, setSenderInfo)} required />

                    <h3>Sender Address</h3>
                    <input type="text" name="houseNumber" placeholder="House Number" value={senderInfo.houseNumber} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
                    <input type="text" name="ward" placeholder="Ward" value={senderInfo.ward} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
                    <input type="text" name="district" placeholder="District" value={senderInfo.district} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
                    <input type="text" name="city" placeholder="City" value={senderInfo.city} onChange={(e) => handleInputChange(e, setSenderInfo)} required />

                    <h2>Receiver Information</h2>
                    <input type="text" name="fullName" placeholder="Full Name" value={receiverInfo.fullName} onChange={(e) => handleInputChange(e, setReceiverInfo)} required />
                    <input type="text" name="phone" placeholder="Phone Number" value={receiverInfo.phone} onChange={(e) => handleInputChange(e, setReceiverInfo)} required />
                    <input type="email" name="email" placeholder="Email" value={receiverInfo.email} onChange={(e) => handleInputChange(e, setReceiverInfo)} required />

                    <h3>Receiver Address</h3>
                    <input type="text" name="houseNumber" placeholder="House Number" value={receiverInfo.houseNumber} onChange={(e) => handleInputChange(e, setReceiverInfo)} required />
                    <input type="text" name="ward" placeholder="Ward" value={receiverInfo.ward} onChange={(e) => handleInputChange(e, setReceiverInfo)} required />
                    <input type="text" name="district" placeholder="District" value={receiverInfo.district} onChange={(e) => handleInputChange(e, setReceiverInfo)} required />
                    <input type="text" name="city" placeholder="City" value={receiverInfo.city} onChange={(e) => handleInputChange(e, setReceiverInfo)} required />

                    <h2>Koi Fish Information</h2>
                    <input type="text" name="koiName" placeholder="Koi Fish Name" value={koiInfo.koiName} onChange={(e) => handleInputChange(e, setKoiInfo)} required />
                    <input type="file" name="koiImage" onChange={(e) => setKoiInfo(prevInfo => ({ ...prevInfo, koiImage: e.target.files[0] }))} required />

                    {/* Buttons to choose between "By Fish" or "By Kilogram" */}
                    <div className="quantity-selection">
                        <button
                            type="button"
                            className={`quantity-btn ${koiInfo.isByFish ? 'selected' : ''}`}
                            onClick={() => setKoiInfo(prev => ({ ...prev, isByFish: true }))}>
                            By Fish
                        </button>
                        <button
                            type="button"
                            className={`quantity-btn ${!koiInfo.isByFish ? 'selected' : ''}`}
                            onClick={() => setKoiInfo(prev => ({ ...prev, isByFish: false }))}>
                            By Kilogram
                        </button>
                    </div>

                    {/* Input for quantity */}
                    <input
                        type={koiInfo.isByFish ? 'number' : 'text'}
                        name="quantity"
                        placeholder={koiInfo.isByFish ? "Quantity (pcs)" : "Quantity (kg)"}
                        value={koiInfo.quantity}
                        onChange={(e) => setKoiInfo(prevInfo => ({ ...prevInfo, quantity: e.target.value }))}
                        required />

                    <h2>Shipping Method</h2>
                    <div className="shipping-methods">
                        <button
                            type="button"
                            className={`shipping-button ${shippingMethod === 'express' ? 'selected' : ''}`}
                            onClick={() => setShippingMethod('express')}>
                            Express
                        </button>
                        <button
                            type="button"
                            className={`shipping-button ${shippingMethod === 'fast' ? 'selected' : ''}`}
                            onClick={() => setShippingMethod('fast')}>
                            Fast
                        </button>
                        <button
                            type="button"
                            className={`shipping-button ${shippingMethod === 'standard' ? 'selected' : ''}`}
                            onClick={() => setShippingMethod('standard')}>
                            Standard
                        </button>
                    </div>

                    <div className="order-buttons">
                        <button type="submit" className="place-order-btn">Place Order</button>
                        <button type="button" className="delete-order-btn" onClick={handleDeleteOrder}>Delete Order</button>
                    </div>
                </form>
            </div>

            <div className="map-container">
                <h2>Map of Vietnam</h2>
                <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                    <GoogleMap
                        mapContainerStyle={{ height: "100%", width: "100%" }}
                        center={mapCenter}
                        zoom={6}>
                        <Marker position={mapCenter} />
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );
};

export default BookingOrder;

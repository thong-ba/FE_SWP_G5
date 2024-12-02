

import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './BookingOrder.css';

const BookingOrder = () => {
    const [senderInfo, setSenderInfo] = useState({
        fullName: '',
        phone: '',
        email: '',
        address: ''
    });

    const [receiverInfo, setReceiverInfo] = useState({
        fullName: '',
        phone: '',
        email: '',
        address: ''
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
        // Tính chi phí cá
        let koiCost = koiInfo.type === 'quantity'
            ? koiInfo.quantity * 1000000
            : koiInfo.weight * 1000000;

        // Tính chi phí vận chuyển
        let shippingRate = shippingInfo === 'express' ? 0.3 
                        : shippingInfo === 'fast' ? 0.25 
                        : 0.15;
        let shippingCost = koiCost * shippingRate;

        setTotalCost(koiCost + shippingCost);
    }, [koiInfo, shippingInfo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Tổng chi phí là: ${totalCost.toLocaleString('vi-VN')} VND`);
        window.location.href = '/payment'; // Chuyển hướng trang thanh toán
    };

    return (
        <div className="booking-order-container">
            <div className="form-container">
                <h2>Thông Tin Người Giao Hàng</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="fullName" placeholder="Họ và Tên" value={senderInfo.fullName} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
                    <input type="text" name="phone" placeholder="Số Điện Thoại" value={senderInfo.phone} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
                    <input type="email" name="email" placeholder="Email" value={senderInfo.email} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
                    <input type="text" name="address" placeholder="Địa Chỉ" value={senderInfo.address} onChange={(e) => handleInputChange(e, setSenderInfo)} required />

                    <h2>Thông Tin Người Nhận Hàng</h2>
                    <input type="text" name="fullName" placeholder="Họ và Tên" value={receiverInfo.fullName} onChange={(e) => handleInputChange(e, setReceiverInfo)} required />
                    <input type="text" name="phone" placeholder="Số Điện Thoại" value={receiverInfo.phone} onChange={(e) => handleInputChange(e, setReceiverInfo)} required />
                    <input type="email" name="email" placeholder="Email" value={receiverInfo.email} onChange={(e) => handleInputChange(e, setReceiverInfo)} required />
                    <input type="text" name="address" placeholder="Địa Chỉ" value={receiverInfo.address} onChange={(e) => handleInputChange(e, setReceiverInfo)} required />

                    <h2>Thông Tin Về Cá Koi</h2>
                    <input type="text" name="koiName" placeholder="Tên Cá" value={koiInfo.koiName} onChange={(e) => handleInputChange(e, setKoiInfo)} required />
                    <input type="file" name="koiImage" onChange={handleImageChange} required />

                    <div className="option-buttons">
                        <div className={`option-button ${koiInfo.type === 'quantity' ? 'selected' : ''}`} onClick={() => setKoiInfo({ ...koiInfo, type: 'quantity', quantity: 0, weight: 0 })}>
                            Theo số lượng (con)
                        </div>
                        <div className={`option-button ${koiInfo.type === 'weight' ? 'selected' : ''}`} onClick={() => setKoiInfo({ ...koiInfo, type: 'weight', quantity: 0, weight: 0 })}>
                            Theo khối lượng (kg)
                        </div>
                    </div>

                    {koiInfo.type === 'quantity' ? (
                        <input type="number" name="quantity" placeholder="Số Lượng (con)" value={koiInfo.quantity} onChange={(e) => handleInputChange(e, setKoiInfo)} min="1" required />
                    ) : (
                        <input type="number" name="weight" placeholder="Khối Lượng (kg)" value={koiInfo.weight} onChange={(e) => handleInputChange(e, setKoiInfo)} step="0.1" min="0.1" required />
                    )}

                    <h2>Thông Tin Vận Chuyển</h2>
                    <div className="option-buttons">
                        {['express', 'fast', 'standard'].map(option => (
                            <div key={option} className={`option-button ${shippingInfo === option ? 'selected' : ''}`} onClick={() => setShippingInfo(option)}>
                                {option === 'express' ? 'Hỏa tốc (1-2 ngày)' : option === 'fast' ? 'Nhanh (3-4 ngày)' : 'Tiêu chuẩn (4-7 ngày)'}
                            </div>
                        ))}
                    </div>

                    <h2>Tổng Chi Phí</h2>
                    <p className="total-cost">Tổng chi phí: {totalCost.toLocaleString('vi-VN')} VND</p>

                    <button type="submit">Đặt Hàng</button>
                </form>
            </div>

            <div className="map-container">
                <h2>Bản Đồ Việt Nam</h2>
                <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                    <GoogleMap
                        mapContainerStyle={{ height: "100%", width: "100%" }}
                        center={mapCenter}
                        zoom={6}
                    >
                        <Marker position={mapCenter} />
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );
};

export default BookingOrder;

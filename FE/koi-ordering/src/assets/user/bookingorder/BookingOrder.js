import React, { useState } from 'react';
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
        quantity: 0
    });

    const [mapCenter, setMapCenter] = useState({ lat: 14.0583, lng: 108.2772 }); // Vị trí trung tâm bản đồ (Việt Nam)

    const handleInputChange = (e, setInfo) => {
        const { name, value } = e.target;
        setInfo(prevInfo => ({ ...prevInfo, [name]: value }));
    };

    const handleImageChange = (e) => {
        setKoiInfo(prevInfo => ({ ...prevInfo, koiImage: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý gửi thông tin ở đây
        console.log({ senderInfo, receiverInfo, koiInfo });
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
                    <input type="number" name="quantity" placeholder="Số Lượng (con hoặc kg)" value={koiInfo.quantity} onChange={(e) => handleInputChange(e, setKoiInfo)} required />

                    <button type="submit">Đặt Hàng</button>
                </form>
            </div>
            <div className="map-container">
                <h2>Bản Đồ Việt Nam</h2>
                <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"> {/* Thay thế bằng API Key của bạn */}
                    <GoogleMap
                        mapContainerStyle={{ height: "100%", width: "100%" }} // Chiều rộng và chiều cao đầy đủ
                        center={mapCenter} // Vị trí trung tâm bản đồ
                        zoom={6} // Đặt mức zoom phù hợp để hiển thị toàn bộ Việt Nam
                    >
                        <Marker position={mapCenter} />
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );
};

export default BookingOrder;

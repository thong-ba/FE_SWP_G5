// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css'; // Add Leaflet CSS for map styling
// import './BookingOrder.css';

// const BookingOrder = () => {
//     const [senderInfo, setSenderInfo] = useState({
//         fullName: '',
//         phone: '',
//         email: '',
//         city: '',
//         district: '',
//         ward: '',
//         street: '',
//         houseNumber: ''
//     });

//     const [receiverInfo, setReceiverInfo] = useState({
//         fullName: '',
//         phone: '',
//         email: '',
//         city: '',
//         district: '',
//         ward: '',
//         street: '',
//         houseNumber: ''
//     });

//     const [koiInfo, setKoiInfo] = useState({
//         koiName: '',
//         koiImage: null,
//         quantity: 0,
//         weight: 0,
//         type: 'quantity' 
//     });

//     const [shippingInfo, setShippingInfo] = useState('standard'); 
//     const [totalCost, setTotalCost] = useState(0);

//     // Cập nhật vị trí mặc định là TP.HCM
//     const [mapCenter] = useState({ lat: 10.8231, lng: 106.6297 });

//     const handleInputChange = (e, setInfo) => {
//         const { name, value } = e.target;
//         setInfo(prevInfo => ({ ...prevInfo, [name]: value }));
//     };

//     const handleImageChange = (e) => {
//         setKoiInfo(prevInfo => ({ ...prevInfo, koiImage: e.target.files[0] }));
//     };

//     useEffect(() => {
//         // Tính toán chi phí koi
//         let koiCost = koiInfo.type === 'quantity'
//             ? koiInfo.quantity * 1000000
//             : koiInfo.weight * 1000000;

//         // Tính toán chi phí vận chuyển
//         let shippingRate = shippingInfo === 'express' ? 0.3 
//                         : shippingInfo === 'fast' ? 0.25 
//                         : 0.15;
//         let shippingCost = koiCost * shippingRate;

//         setTotalCost(koiCost + shippingCost);
//     }, [koiInfo, shippingInfo]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         alert(`Total cost is: ${totalCost.toLocaleString('vi-VN')} VND`);
//         window.location.href = '/payment'; // Redirect to payment page
//     };

//     return (
//         <div className="booking-order-container">
//             <div className="form-container">
//                 <h2>Sender Information</h2>
//                 <form onSubmit={handleSubmit}>
//                     <input type="text" name="fullName" placeholder="Full Name" value={senderInfo.fullName} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
//                     <input type="text" name="phone" placeholder="Phone Number" value={senderInfo.phone} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
//                     <input type="email" name="email" placeholder="Email" value={senderInfo.email} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
//                     <input type='text' name="city" placeholder='City' value={senderInfo.city} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
//                     <input type='text' name="district" placeholder='District' value={senderInfo.district} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
//                     <input type='text' name="ward" placeholder='Ward' value={senderInfo.ward} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
//                     <input type='text' name="street" placeholder='Street' value={senderInfo.street} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
//                     <input type='text' name="houseNumber" placeholder='House Number' value={senderInfo.houseNumber} onChange={(e) => handleInputChange(e, setSenderInfo)} required />

//                     <h2>Receiver Information</h2>
//                     <input type="text" name="fullName" placeholder="Full Name" value={receiverInfo.fullName} onChange={(e) => handleInputChange(e, setReceiverInfo)} required />
//                     <input type="text" name="phone" placeholder="Phone Number" value={receiverInfo.phone} onChange={(e) => handleInputChange(e, setReceiverInfo)} required />
//                     <input type="email" name="email" placeholder="Email" value={receiverInfo.email} onChange={(e) => handleInputChange(e, setReceiverInfo)} required />
//                     <input type='text' name="city" placeholder='City' value={receiverInfo.city} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
//                     <input type='text' name="district" placeholder='District' value={receiverInfo.district} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
//                     <input type='text' name="ward" placeholder='Ward' value={receiverInfo.ward} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
//                     <input type='text' name="street" placeholder='Street' value={receiverInfo.street} onChange={(e) => handleInputChange(e, setSenderInfo)} required />
//                     <input type='text' name="houseNumber" placeholder='House Number' value={receiverInfo.houseNumber} onChange={(e) => handleInputChange(e, setSenderInfo)} required />

//                     <h2>Koi Fish Information</h2>
//                     <input type="text" name="koiName" placeholder="Koi Fish Name" value={koiInfo.koiName} onChange={(e) => handleInputChange(e, setKoiInfo)} required />
//                     <input type="file" name="koiImage" onChange={handleImageChange} required />

//                     <div className="option-buttons">
//                         <div className={`option-button ${koiInfo.type === 'quantity' ? 'selected' : ''}`} onClick={() => setKoiInfo({ ...koiInfo, type: 'quantity', quantity: 0, weight: 0 })}>
//                             By Quantity (fish)
//                         </div>
//                         <div className={`option-button ${koiInfo.type === 'weight' ? 'selected' : ''}`} onClick={() => setKoiInfo({ ...koiInfo, type: 'weight', quantity: 0, weight: 0 })}>
//                             By Weight (kg)
//                         </div>
//                     </div>

//                     {koiInfo.type === 'quantity' ? (
//                         <input type="number" name="quantity" placeholder="Quantity (pieces)" value={koiInfo.quantity} onChange={(e) => handleInputChange(e, setKoiInfo)} min="1" required />
//                     ) : (
//                         <input type="number" name="weight" placeholder="Weight (kg)" value={koiInfo.weight} onChange={(e) => handleInputChange(e, setKoiInfo)} step="0.1" min="0.1" required />
//                     )}

//                     <h2>Shipping Information</h2>
//                     <div className="option-buttons">
//                         {['express', 'fast', 'standard'].map(option => (
//                             <div key={option} className={`option-button ${shippingInfo === option ? 'selected' : ''}`} onClick={() => setShippingInfo(option)}>
//                                 {option === 'express' ? 'Express (1-2 days)' : option === 'fast' ? 'Fast (3-4 days)' : 'Standard (4-7 days)'}
//                             </div>
//                         ))}
//                     </div>

//                     <h2>Total Cost</h2>
//                     <p className="total-cost">Total Cost: {totalCost.toLocaleString('vi-VN')} VND</p>

//                     <button type="submit">Place Order</button>
//                 </form>
//             </div>

//             <div className="map-container">
//                 <h2>Map of Vietnam</h2>
//                 <MapContainer center={mapCenter} zoom={10} style={{ height: '100%', width: '100%' }}>
//                     <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     />
//                 </MapContainer>
//             </div>
//         </div>
//     );
// };

// export default BookingOrder;


















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

    // Cập nhật tọa độ khi người dùng nhập địa chỉ
    useEffect(() => {
        const fetchCoordinates = async () => {
            if (senderInfo.address && receiverInfo.address) {
                const senderCoords = await geocodeAddress(senderInfo.address);
                const receiverCoords = await geocodeAddress(receiverInfo.address);
                if (senderCoords) setSenderCoordinates(senderCoords);
                if (receiverCoords) setReceiverCoordinates(receiverCoords);
            }
        };
        fetchCoordinates();
    }, [senderInfo.address, receiverInfo.address]);

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

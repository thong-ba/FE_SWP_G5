import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import axios from 'axios';

const DeliveryInputPage = () => {
    const location = useLocation();

    const [formData, setFormData] = useState({
        fromAddress: '',
        toAddress: '',
        receiverName: '',
        receiverPhone: '',
        notes: '',
        paymentMethod: 0, // Mặc định là thanh toán tiền mặt
        transportServiceId: '', // ID dịch vụ vận chuyển
    });

    const [transportDetails, setTransportDetails] = useState({
        transportId: '',
        transportType: '',
        transportName: '',
    });

    const [popupMessage, setPopupMessage] = useState(''); // Nội dung popup
    const [showPopup, setShowPopup] = useState(false); // Hiển thị popup

    // Hàm giải mã dữ liệu
    const decryptData = (encryptedData) => {
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedData, 'chiakhoamat');
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            if (!decryptedData) {
                throw new Error('Decryption failed, invalid data.');
            }
            return decryptedData;
        } catch (error) {
            console.error('Decryption error:', error);
            return null;
        }
    };

    // Xử lý lấy thông tin và giải mã từ URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const encryptedTransportId = params.get('transportId');
        const encryptedTransportType = params.get('transportType');
        const encryptedTransportName = params.get('transportName');

        const decryptedTransportId = encryptedTransportId ? decryptData(encryptedTransportId) : '';
        const decryptedTransportType = encryptedTransportType ? decryptData(encryptedTransportType) : '';
        const decryptedTransportName = encryptedTransportName ? decryptData(encryptedTransportName) : '';

        setTransportDetails({
            transportId: decryptedTransportId,
            transportType: decryptedTransportType,
            transportName: decryptedTransportName,
        });

        setFormData((prev) => ({
            ...prev,
            transportServiceId: decryptedTransportId,
        }));
    }, [location]);

    // Xử lý thay đổi form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Xử lý xác nhận thông tin và gửi lên API
    const handleConfirm = async (e) => {
        e.preventDefault();

        const requestBody = {
            fromAddress: formData.fromAddress,
            toAddress: formData.toAddress,
            receiverPhone: formData.receiverPhone,
            receiverName: formData.receiverName,
            notes: formData.notes,
            paymentMethod: formData.paymentMethod,
            transportServiceId: formData.transportServiceId,
        };

        try {
            const response = await axios.post('https://localhost:7046/api/Order/create-order', requestBody);
            console.log('API Response:', response.data);

            if (response.data.statusCode === 200 && response.data.isSuccess) {
                console.log('Created Order ID:', response.data.result);
                setPopupMessage(`Order has been created successfully! Order ID: ${response.data.result}`);
            } else {
                setPopupMessage(response.data.errorMessage || 'Something went wrong!');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            setPopupMessage('Failed to create order. Please try again.');
        }

        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const getTransportTypeLabel = (type) => {
        switch (type) {
            case '0':
                return 'Local Transport';
            case '1':
                return 'Domestic Transport';
            case '2':
                return 'International Transport';
            default:
                return 'Unknown Transport Type';
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh', padding: '20px' }}>
            {/* Left Panel */}
            <div style={{ flex: 1, padding: '20px', backgroundColor: 'white' }}>
                <div>
                    <a href="/selectdeliveryoption" style={{ textDecoration: 'underline', color: 'blue', fontSize: 20 }}>
                        Back to Transport List
                    </a>
                </div>
                <h1 style={{ textAlign: 'center' }}>Delivery Information</h1>
                <form onSubmit={handleConfirm}>
                    {/* Transport Details */}
                    <div style={{ marginBottom: '15px' }}>
                        <strong>Transport ID:</strong> {transportDetails.transportId}
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <strong>Transport Type:</strong> {getTransportTypeLabel(transportDetails.transportType)}
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <strong>Transport Name:</strong> {transportDetails.transportName}
                    </div>

                    {/* Input Fields */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>From Address:</label>
                        <input type="text" name="fromAddress" value={formData.fromAddress} onChange={handleChange} required />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>To Address:</label>
                        <input type="text" name="toAddress" value={formData.toAddress} onChange={handleChange} required />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Receiver Name:</label>
                        <input type="text" name="receiverName" value={formData.receiverName} onChange={handleChange} required />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Receiver Phone:</label>
                        <input type="text" name="receiverPhone" value={formData.receiverPhone} onChange={handleChange} required />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Notes:</label>
                        <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3" />
                    </div>

                    <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none' }}>
                        Confirm Information Order
                    </button>
                </form>
            </div>

                 {/* Right Panel */}
                 <div style={{ flex: 1, backgroundColor: 'gray' }}>

                 </div>

            {/* Popup */}
            {showPopup && (
                <div
                    style={{
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                            textAlign: 'center',
                        }}
                    >
                        <h2>{popupMessage}</h2>
                        <button
                            onClick={handleClosePopup}
                            style={{
                                padding: '10px 20px',
                                marginTop: '10px',
                                backgroundColor: 'blue',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeliveryInputPage;

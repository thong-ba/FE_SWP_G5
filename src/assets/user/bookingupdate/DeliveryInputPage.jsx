import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const DeliveryInputPage = () => {
    const location = useLocation();
    const [formData, setFormData] = useState({
        transportId: '',
        transportType: '',
        fromAddress: '',
        toAddress: '',
        receiverFullName: '',
        receiverPhoneNumber: '',
        receiverEmail: ''
    });

    // Function to get readable transport type
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

    // Decrypt function
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
            return null;  // Return null if decryption fails
        }
    };

    // UseEffect to fetch and decrypt parameters from URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const encryptedTransportId = params.get('transportId');
        const encryptedTransportType = params.get('transportType');
    
        console.log('Encrypted Transport ID:', encryptedTransportId); // Log encrypted data
        console.log('Encrypted Transport Type:', encryptedTransportType);
    
        // Decrypt and set form data for transportId
        if (encryptedTransportId) {
            const decryptedTransportId = decryptData(encryptedTransportId);
            if (decryptedTransportId) {
                setFormData((prevData) => ({ ...prevData, transportId: decryptedTransportId }));
            }
        }
    
        // Decrypt and set form data for transportType
        if (encryptedTransportType) {
            const decryptedTransportType = decryptData(encryptedTransportType);
            if (decryptedTransportType) {
                setFormData((prevData) => ({ ...prevData, transportType: decryptedTransportType }));
            }
        }
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all required fields are filled
        const { fromAddress, toAddress, receiverFullName, receiverPhoneNumber, receiverEmail } = formData;
        if (!fromAddress || !toAddress || !receiverFullName || !receiverPhoneNumber || !receiverEmail) {
            alert('Please fill in all required fields.');
            return;
        }

        console.log('Form submitted:', formData);
        // Logic for form submission goes here
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
                <div>
                    <h1 style={{ textAlign: 'center' }}>Delivery Information</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div style={{ marginBottom: '15px', display: 'flex' }}>
                                <label style={{ width: '250px', paddingTop: '10px' }}>Transport ID:</label>
                                <span style={{ width: '100%', padding: '10px', marginTop: '5px', display: 'inline-block' }}>
                                    {formData.transportId}
                                </span>
                            </div>

                            <div style={{ marginBottom: '15px', display: 'flex' }}>
                                <label style={{ width: '250px', paddingTop: '10px' }}>Transport Type:</label>
                                <span style={{ width: '100%', padding: '10px', marginTop: '5px', display: 'inline-block' }}>
                                    {getTransportTypeLabel(formData.transportType)}
                                </span>
                            </div>

                            <div style={{ marginBottom: '15px', display: 'flex' }}>
                                <label style={{ width: '250px', paddingTop: '10px' }}>From Address:</label>
                                <input
                                    type="text"
                                    name="fromAddress"
                                    value={formData.fromAddress}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: '15px', display: 'flex' }}>
                                <label style={{ width: '250px', paddingTop: '10px' }}>To Address:</label>
                                <input
                                    type="text"
                                    name="toAddress"
                                    value={formData.toAddress}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: '15px', display: 'flex' }}>
                                <label style={{ width: '250px', paddingTop: '10px' }}>Consignee Name:</label>
                                <input
                                    type="text"
                                    name="receiverFullName"
                                    value={formData.receiverFullName}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: '15px', display: 'flex' }}>
                                <label style={{ width: '250px', paddingTop: '10px' }}>Consignee Phone Number:</label>
                                <input
                                    type="text"
                                    name="receiverPhoneNumber"
                                    value={formData.receiverPhoneNumber}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: '15px', display: 'flex' }}>
                                <label style={{ width: '250px', paddingTop: '10px' }}>Consignee Email:</label>
                                <input
                                    type="email"
                                    name="receiverEmail"
                                    value={formData.receiverEmail}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                                    required
                                />
                            </div>

                            <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right Panel */}
            <div style={{ flex: 1, backgroundColor: 'gray' }}></div>
        </div>
    );
};

export default DeliveryInputPage;

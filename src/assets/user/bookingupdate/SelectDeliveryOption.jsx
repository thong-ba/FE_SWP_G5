import React, { useState } from 'react';
import { Table, Button } from 'antd';
import Header from '../../components/Head/Header';
import Footer from '../../components/Foot/Footer';
import CryptoJS from 'crypto-js';

const SelectDeliveryOption = () => {
    const [data, setData] = useState([]);
    const [selectedType, setSelectedType] = useState(null);

    // Dữ liệu giả cho các loại dịch vụ vận chuyển
    const transportServices = [
        { id: 1, name: 'Service A', transportType: 2, description: 'International service', transportPrice: 100000, pricePerKm: 5000, fromAddress: 'Hanoi', toAddress: 'New York', createdDate: '2023-10-01' },
        { id: 2, name: 'Service B', transportType: 1, description: 'Domestic service', transportPrice: 50000, pricePerKm: 3000, fromAddress: 'Hanoi', toAddress: 'Ho Chi Minh City', createdDate: '2023-10-02' },
        { id: 3, name: 'Service C', transportType: 0, description: 'Local service', transportPrice: 20000, pricePerKm: 1000, fromAddress: 'Hanoi', toAddress: 'Ba Dinh', createdDate: '2023-10-03' },
        { id: 4, name: 'Service D', transportType: 2, description: 'International service', transportPrice: 150000, pricePerKm: 7000, fromAddress: 'Hanoi', toAddress: 'London', createdDate: '2023-10-04' },
        { id: 5, name: 'Service E', transportType: 1, description: 'Domestic service', transportPrice: 60000, pricePerKm: 3500, fromAddress: 'Hanoi', toAddress: 'Da Nang', createdDate: '2023-10-05' },
        { id: 6, name: 'Service F', transportType: 2, description: 'International service', transportPrice: 120000, pricePerKm: 6000, fromAddress: 'Hanoi', toAddress: 'Tokyo', createdDate: '2023-10-06' },
        { id: 7, name: 'Service G', transportType: 1, description: 'Domestic service', transportPrice: 55000, pricePerKm: 3200, fromAddress: 'Hanoi', toAddress: 'Nha Trang', createdDate: '2023-10-07' },
        { id: 8, name: 'Service H', transportType: 0, description: 'Local service', transportPrice: 18000, pricePerKm: 900, fromAddress: 'Hanoi', toAddress: 'Tay Ho', createdDate: '2023-10-08' },
        { id: 9, name: 'Service I', transportType: 2, description: 'International service', transportPrice: 130000, pricePerKm: 6500, fromAddress: 'Hanoi', toAddress: 'Sydney', createdDate: '2023-10-09' },
        { id: 10, name: 'Service J', transportType: 1, description: 'Domestic service', transportPrice: 58000, pricePerKm: 3400, fromAddress: 'Hanoi', toAddress: 'Hue', createdDate: '2023-10-10' },
        { id: 11, name: 'Service K', transportType: 0, description: 'Local service', transportPrice: 25000, pricePerKm: 1200, fromAddress: 'Hanoi', toAddress: 'Dong Da', createdDate: '2023-10-11' },
        { id: 12, name: 'Service L', transportType: 2, description: 'International service', transportPrice: 140000, pricePerKm: 6700, fromAddress: 'Hanoi', toAddress: 'Paris', createdDate: '2023-10-12' },
        { id: 13, name: 'Service M', transportType: 1, description: 'Domestic service', transportPrice: 62000, pricePerKm: 3600, fromAddress: 'Hanoi', toAddress: 'Phu Quoc', createdDate: '2023-10-13' },
        { id: 14, name: 'Service N', transportType: 0, description: 'Local service', transportPrice: 22000, pricePerKm: 1100, fromAddress: 'Hanoi', toAddress: 'Hoan Kiem', createdDate: '2023-10-14' },
        { id: 15, name: 'Service O', transportType: 2, description: 'International service', transportPrice: 160000, pricePerKm: 7500, fromAddress: 'Hanoi', toAddress: 'Berlin', createdDate: '2023-10-15' }
    ];

    const handleSelectChange = (record) => {
        console.log(`Selected transport ID: ${record.id}`);
        sessionStorage.setItem('selectedTransportId', record.id);
        sessionStorage.setItem('selectTransportType', record.transportType);
    };

    const handleButtonClick = (type) => {
        setSelectedType(type);
        // Lọc dữ liệu theo loại đã chọn
        const filteredData = transportServices.filter(item => item.transportType === type);
        setData(filteredData);
    };

    const encryptData = (data) => {
        const encryptedData = CryptoJS.AES.encrypt(data, 'chiakhoamat').toString();
        return encryptedData;
    };

    const handleNextClick = () => {
        const selectedId = sessionStorage.getItem('selectedTransportId'); 
        const selectTransportType = sessionStorage.getItem('selectTransportType'); 
        
        if (selectedId && selectTransportType) {
            // Mã hóa dữ liệu
            const encryptedTransportId = encryptData(selectedId);
            const encryptedTransportType = encryptData(selectTransportType);

            // Chuyển hướng tới trang tiếp theo với các tham số đã mã hóa
            const encryptedTransportIdEncoded = encodeURIComponent(encryptedTransportId);
            const encryptedTransportTypeEncoded = encodeURIComponent(encryptedTransportType);
            window.location.href = `/deliveryinputpage?transportId=${encryptedTransportIdEncoded}&transportType=${encryptedTransportTypeEncoded}`;
        } else {
            // Hiển thị thông báo nếu chưa chọn
            alert("Please select a transport option before proceeding.");
        }
    };

    const columns = [
        { title: 'Select Transport Section', dataIndex: 'select', key: 'select', render: (_, record) => <input type="radio" name="transportOption" onChange={() => handleSelectChange(record)} /> },
        { title: 'Transport Id', dataIndex: 'id', key: 'id' },
        { title: 'Transport Name', dataIndex: 'name', key: 'name' },
        { title: 'Transport Type', dataIndex: 'transportType', key: 'transportType', render: (type) => (type === 0 ? 'Local' : type === 1 ? 'Domestic' : 'International') },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Transport Price', dataIndex: 'transportPrice', key: 'transportPrice', render: (price) => `${price.toLocaleString()} VND` },
        { title: 'Price Per Km', dataIndex: 'pricePerKm', key: 'pricePerKm', render: (price) => `${price.toLocaleString()} VND` },
        { title: 'From Address', dataIndex: 'fromAddress', key: 'fromAddress' },
        { title: 'To Address', dataIndex: 'toAddress', key: 'toAddress' },
        { title: 'Created Date', dataIndex: 'createdDate', key: 'createdDate', render: (date) => new Date(date).toLocaleDateString('en-GB') }, // Định dạng dd/mm/yyyy
    ];

    return (
        <div>
            <Header />
            <div>
                <h1 style={{ textAlign: 'center', fontSize: 50 }}>
                    Select Delivery Option
                </h1>
            </div>
            <div style={{ paddingRight: 40, display: 'flex', justifyContent: 'end' }}>
                <Button onClick={handleNextClick} style={{ color: 'white', fontSize: 20, backgroundColor: 'blue', border: 'none', cursor: 'pointer', width: '200px' }}>
                    Next Step
                </Button>
            </div>
            <div style={{ margin: 20, paddingLeft: 20, paddingRight: 20, display: 'flex' }}>
                <Button style={{ backgroundColor: 'blue', color: 'white', marginRight: 10, height: 50, fontSize: 25 }} onClick={() => handleButtonClick(2)}>International</Button>
                <Button style={{ backgroundColor: 'green', color: 'white', marginRight: 10, height: 50, fontSize: 25 }} onClick={() => handleButtonClick(1)}>Domestic</Button>
                <Button style={{ backgroundColor: 'orange', color: 'white', fontSize: 25, height: 50 }} onClick={() => handleButtonClick(0)}>Local</Button>
            </div>
            <Table style={{ marginLeft: 40, marginRight: 40 }}
                columns={columns}
                dataSource={data}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />
            <Footer />
        </div>
    );
};

export default SelectDeliveryOption;

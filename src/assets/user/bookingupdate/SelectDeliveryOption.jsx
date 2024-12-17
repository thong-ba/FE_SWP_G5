import React, { useState } from 'react';
import axios from 'axios';
import { Table, Button, message } from 'antd';
import CryptoJS from 'crypto-js';

const SelectDeliveryOption = () => {
    const [data, setData] = useState([]); // State chứa dữ liệu API
    const [selectedId, setSelectedId] = useState(null); // ID được chọn
    const [selectedType, setSelectedType] = useState(null); // Transport Type được chọn
   

    // Hàm gọi API và cập nhật state
    const fetchData = async (url, transportType) => {
        try {
            const response = await axios.get(url);
            const result = response.data.result;

            setData(result);
            setSelectedType(transportType); 
        } catch (error) {
            message.error('Error fetching data from API');
            console.error(error);
        }
    };

    // Chọn dịch vụ
    const handleSelectChange = (record) => {
        setSelectedId(record.id);
        sessionStorage.setItem('selectedTransportId', record.id);
        sessionStorage.setItem('selectTransportType', record.transportType);
        sessionStorage.setItem('selectedTransportName', record.name);
    };

    // Mã hóa dữ liệu bằng CryptoJS
    const encryptData = (data) => {
        return CryptoJS.AES.encrypt(data, 'chiakhoamat').toString();
    };

    // Chuyển hướng sang trang tiếp theo
    const handleNextClick = () => {
        if (selectedId) {
            const encryptedId = encodeURIComponent(encryptData(selectedId.toString()));
            const encryptedType = encodeURIComponent(encryptData(selectedType.toString()));
            const encryptedName = encodeURIComponent(encryptData(sessionStorage.getItem('selectedTransportName')));
            
            window.location.href = `/deliveryinputpage?transportId=${encryptedId}&transportType=${encryptedType}&transportName=${encryptedName}`;
        } else {
            message.warning('Please select a transport option before proceeding.');
        }
    };
    // Cấu hình cột cho từng loại dịch vụ
    const localColumns = [
        {
            title: 'Select',
            dataIndex: 'select',
            key: 'select',
            render: (_, record) => (
                <input
                    type="radio"
                    name="transportOption"
                    onChange={() => handleSelectChange(record)}
                />
            ),
        },
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
            title: 'Type',
            dataIndex: 'transportType',
            key: 'transportType',
            render: (type) => (type === 0 ? 'Local' : type === 1 ? 'Domestic' : 'International'),
        },
        {
            title: 'Price Per Km',
            dataIndex: 'pricePerKm',
            key: 'pricePerKm',
            render: (price) => (price ? `${price.toLocaleString()} VND` : '-'),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (desc) => desc || '-',
        },
    ];

    const otherColumns = [
        {
            title: 'Select',
            dataIndex: 'select',
            key: 'select',
            render: (_, record) => (
                <input
                    type="radio"
                    name="transportOption"
                    onChange={() => handleSelectChange(record)}
                />
            ),
        },
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
            title: 'Type',
            dataIndex: 'transportType',
            key: 'transportType',
            render: (type) => (type === 0 ? 'Local' : type === 1 ? 'Domestic' : 'International'),
        },
        {
            title: 'Transport Price',
            dataIndex: 'transportPrice',
            key: 'transportPrice',
            render: (price) => (price ? `${price.toLocaleString()} VND` : '-'),
        },
        {
            title: 'From',
            dataIndex: 'fromProvince',
            key: 'fromProvince',
            render: (from) => from || '-',
        },
        {
            title: 'To',
            dataIndex: 'toProvince',
            key: 'toProvince',
            render: (to) => to || '-',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (desc) => desc || '-',
        },
    ];

    return (
        <div>
            <h1 style={{ textAlign: 'center', fontSize: 50 }}>Select Delivery Option</h1>

            {/* Nút điều hướng */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                <Button
                    style={{ backgroundColor: 'orange', color: 'white', marginRight: 10, height: 50, fontSize: 25 }}
                    onClick={() => fetchData('https://localhost:7046/api/TransportService/Local', 0)}
                >
                    Local
                </Button>
                <Button
                    style={{ backgroundColor: 'green', color: 'white', marginRight: 10, height: 50, fontSize: 25 }}
                    onClick={() => fetchData('https://localhost:7046/api/TransportService/Domestic', 1)}
                >
                    Domestic
                </Button>
                <Button
                    style={{ backgroundColor: 'blue', color: 'white', height: 50, fontSize: 25 }}
                    onClick={() => fetchData('https://localhost:7046/api/TransportService/International', 2)}
                >
                    International
                </Button>
            </div>

            {/* Bảng dữ liệu */}
            <Table
                style={{ margin: '0 40px' }}
                columns={selectedType === 0 ? localColumns : otherColumns} // Chọn cột dựa trên loại dịch vụ
                dataSource={data}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />

            {/* Nút Next */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '20px 40px' }}>
                <Button
                    onClick={handleNextClick}
                    style={{
                        backgroundColor: 'blue',
                        color: 'white',
                        fontSize: 20,
                        width: 200,
                    }}
                >
                    Next Step
                </Button>
            </div>
        </div>
    );
};

export default SelectDeliveryOption;

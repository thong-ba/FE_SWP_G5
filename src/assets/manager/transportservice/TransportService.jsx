import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, Switch, Select, Card, Dropdown } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import './TransportService.css'
import 'react-toastify/dist/ReactToastify.css';
import { GetAllTransportService, CreateTransportService, UpdateTransportService, DeleteTransportService } from '../../../api/TransportServiceApi';

const vietnamProvinces = [
  "An Giang", "Bà Rịa - Vũng Tàu", "Bạc Liêu", "Bắc Giang", "Bắc Kạn",
  "Bắc Ninh", "Bến Tre", "Bình Dương", "Bình Định", "Bình Phước",
  "Bình Thuận", "Cà Mau", "Cần Thơ", "Cao Bằng", "Đà Nẵng",
  "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp",
  "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh",
  "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên",
  "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng",
  "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An",
  "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình",
  "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng",
  "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa",
  "Thừa Thiên Huế", "Tiền Giang", "TP Hồ Chí Minh", "Trà Vinh", "Tuyên Quang",
  "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
];



function TransportService() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [showTransportOptions, setShowTransportOptions] = useState(false);
  const [transportType, setTransportType] = useState(null);

  // Move fetchData outside useEffect so it can be reused
  const fetchData = async () => {
    try {
      const apiResponse = await GetAllTransportService();
      console.log("API Response:", apiResponse); // Log the entire response

      if (apiResponse.isSuccess) {
        const apiData = apiResponse.result; // Access the result array
        setData(apiData);
        console.log("Fetched Data:", apiData);
      } else {
        toast.error("Error: " + apiResponse.errorMessage || "Failed to fetch data");
      }

      setLoading(false);
    } catch (error) {
      toast.error("Error fetching transport services: " + error.message);
      setLoading(false); // Ensure loading is set to false on error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setFormData(null); // Clear any previous form data
    form.resetFields(); // Reset the form fields
    setShowTransportOptions(true);
  };


  const openEditModal = (record) => {
    setFormData(record);
    form.setFieldsValue({
      ...record,
      transportType: record.transportType, // Explicitly set hidden fields
      id: record.id,
    });
    setShowForm(true);
  };
  const handleCreate = async (values) => {
    try {
      const { transportType, ...rest } = values; // Exclude transportType from the body
      const response = await CreateTransportService(transportType, rest);

      if (response.data.isSuccess) {
        toast.success(`${transportType} transport service added successfully`);
        fetchData(); // Refresh data
        setShowForm(false); // Close form modal
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding transport service:", error);
      toast.error("Failed to add transport service");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await DeleteTransportService(id);
      if (response.success) {
        toast.success(response.message);
        fetchData();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to delete transport service: " + error.message);
    }
  };

  const handleEdit = async (values) => {
    console.log("Validated Payload:", values);
    try {

      const response = await UpdateTransportService(values);

      if (response.success) {
        console.log("Edit Response:", response.data);
        toast.success("Transport service updated successfully");
        fetchData(); // Refetch data to reflect changes
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error updating transport service:", error.response?.data || error.message);
      toast.error("Failed to update transport service");
    }
  };



  const handleSubmit = async (values) => {
    if (formData) {
      await handleEdit(values);
    } else {
      await handleCreate(values);
    }
  };

  const handleTransportSelect = (type) => {
    setTransportType(type);
    form.setFieldsValue({ transportType: type });
    setShowTransportOptions(false);
    setShowForm(true);
  };


  const transportOptions = [
    { title: 'Local Transport', type: 'Local' },
    { title: 'Domestic Transport', type: 'Domestic' },
    { title: 'International Transport', type: 'International' },
  ];

  const columns = [
    { title: 'Service ID', dataIndex: 'id' },
    { title: 'Name', dataIndex: 'name' },
    {
      title: 'Type',
      dataIndex: 'transportType',
      render: (transportType) => {
        switch (transportType) {
          case 0:
            return 'Local';
          case 1:
            return 'Domestic';
          case 2:
            return 'International';
          default:
            return 'Unknown'; // Fallback for unexpected values
        }
      },
    },
    { title: 'Price per KM', dataIndex: 'pricePerKm', render: (pricePerKm) => ` ${pricePerKm.toLocaleString()} VND` },
    { title: 'Price per KG', dataIndex: 'pricePerKg', render: (pricePerKg) => ` ${pricePerKg.toLocaleString()} VND`, width: '10%' },
    { title: 'Price per Amount', dataIndex: 'pricePerAmount', render: (pricePerAmount) => ` ${pricePerAmount.toLocaleString()} VND` },
    { title: 'Description', dataIndex: 'description' },
    { title: 'From', dataIndex: 'fromProvince' },
    { title: 'To', dataIndex: 'toProvince' },
    {
      title: 'Status',
      dataIndex: 'isActive',
      render: (isActive) => (
        <Button
          type="primary"
          style={{
            backgroundColor: isActive ? '#4CAF50' : 'rgba(76, 175, 80, 0.5)', // Green for active, semi-transparent for inactive
            color: isActive ? 'white' : 'rgba(255, 255, 255, 0.5)', // White text for active, semi-transparent for inactive
            border: `2px solid ${isActive ? '#4CAF50' : 'rgba(76, 175, 80, 0.5)'}`, // Add solid border with color
            opacity: isActive ? 1 : 0.2, // Decrease opacity for inactive
            cursor: 'default', // Change cursor to default
          }}
          size="small" // Small button size
          disabled // Disable button to prevent interaction
        >
          {isActive ? 'Active' : 'Inactive'}
        </Button>
      ),
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <>
          <Button onClick={() => openEditModal(record)}>Edit</Button>
          <Button
            className='delete-button' // Apply the delete-button class
            onClick={() => {
              Modal.confirm({
                className: 'custom-modal', // Custom modal class
                title: 'Confirm Deletion',
                content: 'Are you sure you want to delete this transport service?',
                onOk: () => handleDelete(record.id),

                okButtonProps: {
                  className: 'custom-ok-button', // Custom class for OK button
                },
                cancelButtonProps: {
                  className: 'custom-cancel-button', // Custom class for Cancel button
                },
              });
            }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <ToastContainer />
      <div>
        <h1 className='section-title'>Transport Services</h1>
        <button
          onClick={openAddModal}
          className='new-route-button'
        >
          Add Service
        </button>
        <Modal
          title={<div style={{ textAlign: 'center', marginBottom: 30, fontSize: 30 }}>Select Transport Type</div>} // Center the modal title
          open={showTransportOptions}
          onCancel={() => setShowTransportOptions(false)}
          footer={null}
          width={1000}
        >
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {transportOptions.map((option) => (
              <Card
                key={option.type}
                className="card-hover"
                title={<div style={{ textAlign: 'center' }}>{option.title}</div>} // Center the card title
                style={{ width: 200, cursor: 'pointer' }}
                onClick={() => handleTransportSelect(option.type)}
              >
                <p>Click to select {option.title}</p>
              </Card>
            ))}
          </div>
        </Modal>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          style={{
            // Custom styles for the table header
            header: {
              backgroundColor: '#ff7700', // Set header background color to orange
              color: 'white', // Set header text color to white
            }
          }}
          rowKey="id"
          pagination={{
            pageSize: 5, // Set the number of rows per page to 5
            showSizeChanger: false, // Optional: Hide the option to change page size
          }}
        />
        <Modal
          title={formData ? "Edit Transport Service" : "Add Transport Service"}
          open={showForm}
          onCancel={() => setShowForm(false)}
          footer={null}
        >
          <Form
            form={form}
            initialValues={formData || {}}
            onFinish={handleSubmit}
            layout="horizontal"
          >
            <Form.Item
              label="Service Name"
              name="name"
              rules={formData ? [] : [{ required: true, message: 'Please input service name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={formData ? [] : [{ required: true, message: 'Please input description!' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              label="Price per KM"
              name="pricePerKm"
              rules={formData ? [] : [{ required: transportType === 'Local', message: 'Please input price per KM!' }]}
              style={{ display: transportType === 'Local' ? 'block' : 'none' }}

            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Price per KG"
              name="pricePerKg"
              rules={formData ? [] : [{ required: true, message: 'Please input price per KG!' }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item name="transportType" style={{ display: 'none' }}> {/* Hidden field for transportType */}
              <Input type="hidden" />
            </Form.Item>
            <Form.Item
              label="Transport Price"
              name="transportPrice"
              style={{ display: transportType === 'Domestic' || transportType === 'International' ? 'block' : 'none' }}
              rules={formData ? [] : [{ required: transportType === 'Domestic' || transportType === 'International', message: 'Please input price per KG!' }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Price per Amount"
              name="pricePerAmount"
              rules={formData ? [] : [{ required: true, message: 'Please input price per Amount!' }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Status"
              name="isActive"
              rules={[{ required: true, message: 'Please select the status!' }]}
            >
              <Select placeholder="Select Status">
                <Select.Option value={true}>Active</Select.Option>
                <Select.Option value={false}>Inactive</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="id" style={{ display: 'none' }}>
              <Input type="hidden" />
            </Form.Item>
            <Form.Item
              label="From Province"
              name="fromProvince"
              rules={[
                { required: transportType === 'Domestic' || transportType === 'International', message: 'Please select the province!' }
              ]}
              style={{ display: transportType === 'Domestic' || transportType === 'International' ? 'block' : 'none' }}
            >
              <Select placeholder="Select From Province">
                {vietnamProvinces.map((province) => (
                  <Select.Option key={province} value={province}>
                    {province}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="To Province"
              name="toProvince"
              rules={[
                { required: transportType === 'Domestic' || transportType === 'International', message: 'Please select the province!' }
              ]}
              style={{ display: transportType === 'Domestic' || transportType === 'International' ? 'block' : 'none' }}
            >
              <Select placeholder="Select To Province">
                {vietnamProvinces.map((province) => (
                  <Select.Option key={province} value={province}>
                    {province}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ backgroundColor: '#ff7700', borderColor: '#ff7700' }}>
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default TransportService;

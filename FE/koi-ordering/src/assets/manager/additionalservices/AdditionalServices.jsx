import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, Select } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { GetAllAdditionalService, UpdateAdditionalService, CreateAdditionalService } from '../../../api/AdditionalServiceApi';




function ManageAdditionalService() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();


  // Move fetchData outside useEffect so it can be reused
  const fetchData = async () => {
    try {
      const apiData = await GetAllAdditionalService();
      setData(apiData);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching additional services: " + error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    form.resetFields();
    setFormData(null);
    setShowForm(true);
  };

  const openEditModal = (record) => {
    setFormData(record);
    form.setFieldsValue(record);
    setShowForm(true);
  };

  const handleCreate = async (values) => {
    try {
      const response = await CreateAdditionalService(values);

      if (response) {
        toast.success("Additional service added successfully");
        fetchData();
        setShowForm(false);
      } else {
        toast.error("Failed to add additional service");
      }
    } catch (error) {
      console.error("Error adding additional service:", error);
      toast.error("Failed to add additional service");
    }
  };
  const handleToggleActive = async (record) => {
    try {
      console.log("Toggle Status Payload:", { additionalServiceId: record.additionalServiceId });
      const response = await axios.patch(
        'http://26.61.210.173:3001/api/transport/toggle-additional-service',
        { additionalServiceId: record.additionalServiceId },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
          }
        }
      );

      if (response.data) {
        console.log("Toggle Status Response:", response.data);
        toast.success("Transport service status updated successfully");
        fetchData();
      }
    } catch (error) {
      console.error("Error toggling transport service status:", error.response?.data || error.message);
      toast.error("Failed to update transport service status");
    }
  };
  const handleEdit = async (values) => {
    try {
      const response = await UpdateAdditionalService(values.additionalServiceId, values);
      if (response.success) {
        toast.success("Additional service updated successfully");
        fetchData();
        setShowForm(false);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error updating additional service:", error);
      toast.error("Failed to update additional service");
    }
  };
  const handleSubmit = async (values) => {
    if (formData) {
      await handleEdit(values);
    } else {
      await handleCreate(values);
    }
  };

  const columns = [
    { title: 'Service ID', dataIndex: 'additionalServiceId' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Type', dataIndex: 'forTransportType' },
    { title: 'Price', dataIndex: 'price', render: (price) => ` ${price.toLocaleString()} VND`, width: '10%' },
    { title: 'Description', dataIndex: 'description' },
    {
      title: 'Status',
      dataIndex: 'isActive',
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => handleToggleActive(record)}
          style={{
            opacity: record.isActive ? 1 : 0.5,
            backgroundColor: record.isActive ? '#ff7700' : '#ccc',
            color: 'white',
            borderColor: '#ff7700',
          }}
        >
          {record.isActive ? 'Active' : 'Inactive'}
        </Button>
      ),
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <Button onClick={() => openEditModal(record)}>Edit</Button>
      ),
    },
  ];

  return (
    <>
      <ToastContainer />
      <div>
        <h1 className='section-title'>Manage Additional Services</h1>
        <button
          onClick={openAddModal}
          className='new-route-button'
        >
          Add Service
        </button>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey="additionalServiceId"
          pagination={{
            pageSize: 5, // Set the number of rows per page to 5
            showSizeChanger: false,
          }}
        />
        <Modal
          title={formData ? "Edit Additional Service" : "Add Additional Service"}
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
            <Form.Item label="For Transport Type" name="forTransportType" rules={[{ required: true, message: 'Please select transport type!' }]}>
              <Select>
                <Select.Option value="air">Air</Select.Option>
                <Select.Option value="road">Road</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Service Name" name="name" rules={[{ required: true, message: 'Please input service name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input description!' }]}>
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input price!' }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="additionalServiceId" style={{ display: 'none' }}>
              <Input type="hidden" />
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

export default ManageAdditionalService;
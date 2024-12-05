import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, Switch, Select, Card } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import './TransportService.css'
import 'react-toastify/dist/ReactToastify.css';
import { GetAllTransportService, CreateTransportDomesticService, CreateTransportInternationalService, CreateTransportLocalService, UpdateTransportService, DeleteTransportService } from '../../../api/TransportServiceApi';




function TransportService() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [showTransportOptions, setShowTransportOptions] = useState(false);

  // Move fetchData outside useEffect so it can be reused
  const fetchData = async () => {
    try {
      const apiResponse = await GetAllTransportService();
      const apiData = apiResponse.result;
      setData(apiData);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching transport services: " + error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setShowTransportOptions(true);
  };

  const openEditModal = (record) => {
    setFormData(record);
    form.setFieldsValue(record);
    setShowForm(true);
  };
  const handleCreate = async (values) => {
    try {
      let response;

      // Determine the service type and call the appropriate function
      switch (values.transportType) {
        case 'Local':
          response = await CreateTransportLocalService(values);
          break;
        case 'Domestic':
          response = await CreateTransportDomesticService(values);
          break;
        case 'International':
          response = await CreateTransportInternationalService(values);
          break;
        default:
          throw new Error("Invalid service type");
      }

      if (response.success) {
        toast.success(`${values.transportType} transport service added successfully`);
        fetchData(); // Refetch data to reflect changes
        setShowForm(false); // Close the form modal
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

  // const handleToggleActive = async (record) => {
  //   try {
  //     console.log("Toggle Status Payload:", { transportServiceId: record.transportServiceId });
  //     const response = await axios.patch(
  //       'http://26.61.210.173:3001/api/transport/toggle-transport-service',
  //       { transportServiceId: record.transportServiceId },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
  //         }
  //       }
  //     );

  //     if (response.data) {
  //       console.log("Toggle Status Response:", response.data);
  //       toast.success("Transport service status updated successfully");
  //       refetch();
  //     }
  //   } catch (error) {
  //     console.error("Error toggling transport service status:", error.response?.data || error.message);
  //     toast.error("Failed to update transport service status");
  //   }
  // };

  const handleTransportSelect = (transportType) => {
    console.log("Selected Transport Type:", transportType);
    setShowTransportOptions(false);

    if (transportType === 'Local') {
      setShowForm(true);
    }
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
      render: (isActive) => (isActive ? 'Active' : 'Inactive'), // Render based on isActive value
    },
    // render: (text, record) => (
    //   <Button
    //     type="primary"
    //     onClick={() => handleToggleActive(record)}
    //     style={{
    //       opacity: record.isActive ? 1 : 0.5,
    //       backgroundColor: record.isActive ? '#ff7700' : '#ccc',
    //       borderColor: '#ff7700',
    //     }}
    //   >
    //     {record.isActive ? 'Active' : 'Inactive'}
    //   </Button>
    // ),
    {
      title: 'Actions',
      render: (text, record) => (
        <>
          <Button onClick={() => openEditModal(record)}>Edit</Button>
          <Button
            danger
            onClick={() => {
              Modal.confirm({
                title: 'Confirm Deletion',
                content: 'Are you sure you want to delete this transport service?',
                onOk: () => handleDelete(record.id),
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
          visible={showTransportOptions}
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
          rowKey="transportServiceId"
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
              rules={formData ? [] : [{ required: true, message: 'Please input price per KM!' }]}
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
            <Form.Item
              label="Price per Amount"
              name="pricePerAmount"
              rules={formData ? [] : [{ required: true, message: 'Please input price per Amount!' }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item name="transportServiceId" style={{ display: 'none' }}>
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

export default TransportService;

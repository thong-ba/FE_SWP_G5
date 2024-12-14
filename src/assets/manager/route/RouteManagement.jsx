import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Modal, Form, Input, Row, Col, Select, Checkbox, Radio, message, Table, Spin } from 'antd';
import { GetAllDriver } from '../../../api/DriverApi';
import { GetAllRoutes } from '../../../api/RouteApi';
import { GetAllOrderService } from '../../../api/OrderApi';
import './RouteManagement.css';

function ManageRoute() {
  const [showForm, setShowForm] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);


  const [disabledItems, setDisabledItems] = useState(new Set());
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedFishIndex, setSelectedFishIndex] = useState(null);

  const toggleFishDetails = (index) => {
    setSelectedFishIndex(selectedFishIndex === index ? null : index);
  };

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const orderResponse = await GetAllOrderService();

      console.log('API Order Response:', orderResponse.result);

      if (orderResponse.result && orderResponse.statusCode === 200) {
        setOrders(orderResponse.result);
      } else {
        console.error('Invalid response structure:', orderResponse.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const driverResponse = await GetAllDriver();
      console.log('API Driver Response:', driverResponse.result);

      setDrivers(driverResponse.result);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    } finally {
      setLoading(false);
    }
  };
  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const routeResponse = await GetAllRoutes();
      console.log('API Route Response:', routeResponse.result);

      setRoutes(routeResponse.result);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrder();
    console.log(orders);
    console.log(sessionStorage.getItem('accessToken'));
    fetchDrivers();
    fetchRoutes();
  }, []);

  const handleCreate = () => {

    setShowForm(true);

  };
  const handleView = (route) => {
    setSelectedRoute(route);
    setIsModalOpen(true);
    console.log('Selected rout:', route);
  };
  const handleViewOrder = (record) => {
    setSelectedOrderDetail(record);
    setIsOrderModalOpen(true);
    console.log('Selected Order Detail:', record);
  };
  const handleOrderSelect = (orderId) => {
    setSelectedOrders(prev => {
      if (prev.includes(orderId)) {
        return prev.filter(id => id !== orderId);
      } else {
        return [...prev, orderId];
      }
    });
  };

  const getSelectedFromProvinces = () => {
    return [...new Set(
      orders
        .filter(order => selectedOrders.includes(order.orderId))
        .map(order => order.fromProvince)
    )];
  };

  const filteredDrivers = selectedLocation
    ? drivers.filter(driver => driver.currentProvince === selectedLocation)
    : drivers;

  const handleCreateRoute = async (values) => {
    if (!selectedDriver) {
      message.error('Please select a driver');
      return;
    }
    if (selectedOrders.length === 0) {
      message.error('Please select at least one order');
      return;
    }
    const formData = form.getFieldsValue();
    const routeData = {
      notes: formData.note,
      driverId: selectedDriver,
      orderIds: selectedOrders
    };
    const createRouteResponse = await axios.post('http://26.61.210.173:3001/api/transport/create-route', routeData, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      }
    });


    console.log('Creating new route with data:', routeData);
    message.success('Route created successfully');


    form.resetFields();
    setSelectedDriver(null);
    setSelectedOrders([]);
    setShowForm(false);
    fetchRoutes();
  };

  const orderColumns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Transport Service',
      dataIndex: ['transportService', 'name'],
      key: 'transportService',
      width: 130,
      render: (name) => (
        <div style={{ textAlign: 'center' }}>
          <span
            className='road-type'
            style={{ display: 'inline-block', width: '60px', textAlign: 'center' }}
          >
            {name}
          </span>
        </div>
      ),
    },
    {
      title: 'From Address',
      dataIndex: 'fromAddress',
      key: 'fromAddress',
    },
    {
      title: 'To Address',
      dataIndex: 'toAddress',
      key: 'toAddress',
    },
    {
      title: 'Distance (Km)',
      dataIndex: 'distance',
      key: 'distance',
      render: (distance) => `${distance.toFixed(2)} Km`,
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (totalPrice) => `${totalPrice.toLocaleString()} VND`,
    },
    {
      title: 'Select',
      key: 'select',
      render: (_, record) => (
        <Checkbox
          checked={selectedOrders.includes(record.id)}
          onChange={() => handleOrderSelect(record.id)}
        />
      ),
    },
    {
      title: 'View',
      key: 'view',
      render: (_, record) => (
        <button className="view-button" onClick={() => handleViewOrder(record)}>
          <FontAwesomeIcon icon={faEye} />
        </button>
      ),
    },
  ];

  const driverColumns = [
    {
      title: 'Latitude',
      dataIndex: 'latitude',
      key: 'latitude',
      render: (latitude) => latitude.toFixed(6),
    },
    {
      title: 'Longitude',
      dataIndex: 'longitude',
      key: 'longitude',
      render: (longitude) => longitude.toFixed(6),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let statusText;
        let statusColor;

        switch (status) {
          case 1:
            statusText = 'Available'; // Maps to DriverStatus.Available
            statusColor = 'green'; // Color for Available
            break;
          case 2:
            statusText = 'On Route'; // Maps to DriverStatus.OnRoute
            statusColor = 'blue'; // Color for On Route
            break;
          case 3:
            statusText = 'Inactive'; // Maps to DriverStatus.Inactive
            statusColor = 'red'; // Color for Inactive
            break;
          default:
            statusText = 'Unknown';
            statusColor = 'gray'; // Color for Unknown
        }

        return (
          <span
            className={`status-driver ${statusText.toLowerCase().replace(' ', '-')}`}
            style={{ color: statusColor }} // Apply color based on status
          >
            {statusText}
          </span>
        );
      },
    },
    {
      title: 'Select',
      key: 'select',
      render: (_, record) => (
        <Radio
          checked={selectedDriver === record.driverId}
          onChange={() => setSelectedDriver(record.driverId)}
        />
      ),
    },
  ];

  const routeColumns = [
    {
      title: 'No',
      key: 'index',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Route ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Driver ID',
      dataIndex: 'driverId',
      key: 'driverId',
    },
    {
      title: 'Status',
      dataIndex: 'routeStatus',
      key: 'routeStatus',
      align: 'center',
      render: (status) => {
        const statusText = ['Pending', 'In Progress', 'Completed', 'Canceled'][status] || 'Unknown';
        return (
          <span className={`status-route ${statusText.toLowerCase()}`}>{statusText}</span>
        );
      },
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <button className="view-button" onClick={() => handleView(record)}>
          <FontAwesomeIcon icon={faEye} />
        </button>
      ),
    },
  ];

  return (
    <div>
      <h1 className='section-title'>Manage Route</h1>
      <div>
        <button className="new-route-button" onClick={handleCreate}>Create New Route</button>
      </div>

      <Modal
        title={isUpdate ? 'Update Route' : 'Create New Route'}
        className='route-detail-modal'
        open={showForm}
        onCancel={() => setShowForm(false)}
        footer={null}
        width={1000}
        destroyOnClose={true}
      >
        <Row className="placeorder-page">

          <Col span={24} className="">
            <Form form={form}>


              {/* Fish Orders Table */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="section-title" style={{ margin: 0 }}>Orders</h2>
              </div>
              <div className="fish-orders-scroll-container">
                <Table
                  loading={{
                    indicator: (
                      <div style={{ padding: "20px 0" }}>
                        <Spin spinning={loading} tip="Loading..." />
                      </div>
                    ),
                    spinning: loading
                  }}
                  columns={orderColumns}
                  dataSource={orders}
                  pagination={false}
                  scroll={{ y: 240 }}
                  rowKey="orderId"
                />
              </div>
              <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h2 className="section-title" style={{ margin: 0 }}>Driver</h2>
                  <Select
                    style={{ width: 200 }}
                    placeholder="Filter by location"
                    allowClear
                    onChange={(value) => setSelectedLocation(value)}
                  >
                    {getSelectedFromProvinces().map(location => (
                      <Select.Option key={location} value={location}>
                        {location}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                <div>

                </div>
                <div className="fish-orders-scroll-container">

                  <Table
                    loading={{
                      indicator: (
                        <div style={{ padding: "20px 0" }}>
                          <Spin spinning={loading} tip="Loading..." />
                        </div>
                      ),
                      spinning: loading
                    }}
                    columns={driverColumns}
                    dataSource={filteredDrivers}
                    pagination={false}
                    scroll={{ y: 240 }}
                    rowKey="driverId"
                  />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="section-title" style={{ margin: 0 }}>Note</h2>
              </div>
              <Form.Item name="note" >
                <Input.TextArea style={{ height: '150px', marginTop: '15px' }} />
              </Form.Item>
            </Form>
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                className="new-route-button"
                onClick={handleCreateRoute}
              >
                Create Route
              </button>
            </div>
          </Col>
        </Row>

      </Modal>
      <Table
        loading={{
          indicator: (
            <div style={{ padding: "20px 0" }}>
              <Spin spinning={loading} tip="Loading..." />
            </div>
          ),
          spinning: loading
        }}
        columns={routeColumns}
        dataSource={routes}
        rowKey="routeId"
        rowClassName={(record) => disabledItems.has(record.routeId) ? 'disabled-row' : ''}
      />
      <Modal
        title={`Route ID: ${selectedRoute?.routeId}`}
        className='route-detail-modal'
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={1000}
      >
        {selectedRoute && (
          <div className="route-detail">
            <div className="route-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="section-title" style={{ margin: 0 }}>Route Information</h2>
              </div>
              <div className="info-item">
                <span className="info-label"><strong>Driver:</strong></span>
                <span className="info-value">{selectedRoute.driver.account.username}</span>
              </div>


              <div className="info-item">
                <span className="info-label"><strong>Delivery Date:</strong></span>
                <span className="info-value">
                  {selectedRoute.deliveryStartDate ? selectedRoute.deliveryStartDate : <span style={{ color: '#790808', fontWeight: 'bold' }}>Not Started</span>}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label"><strong>Last Updated:</strong></span>
                <span className="info-value">{new Date(selectedRoute.updatedAt).toLocaleString()}</span>
              </div>
              <div className="info-item">
                <span className="info-label"><strong>Notes:</strong></span>
                <span className="info-value">{selectedRoute.notes ? selectedRoute.notes : 'No notes available'}</span>
              </div>
              <div className="info-item">
                <span className="info-label"><strong>Notes:</strong></span>
                <span className="info-value">{selectedRoute.notes ? selectedRoute.notes : 'No notes available'}</span>
              </div>

              <div className="info-item" >
                <span className="info-label"><strong>Status:</strong></span>
                <span className={`status-route ${selectedRoute.status.toLowerCase()}`}>
                  {selectedRoute.status}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label"><strong>Number of orders:</strong></span>
                <span className="info-value">{selectedRoute.numberOfOrders}</span>
              </div>



            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className="section-title" style={{ margin: 0 }}>Route Stops</h2>

            </div>
            <div className="route-stops">
              {Object.entries(selectedRoute.routeStops.reduce((groups, stop) => {
                if (!groups[stop.orderId]) {
                  groups[stop.orderId] = [];
                }
                groups[stop.orderId].push(stop);
                return groups;
              }, {})).map(([orderId, orderStops]) => (
                <div key={orderId} className="order-group">
                  <h3 className="info-label">Order ID: {orderId}</h3>

                  <div className="stops-container">
                    {orderStops
                      .sort((a, b) => {
                        if (a.stopType === 'pickup' && b.stopType !== 'pickup') return -1;
                        if (a.stopType !== 'pickup' && b.stopType === 'pickup') return 1;
                        return a.sequence - b.sequence; // Sort by sequence if types are the same
                      })
                      .map((stop) => (
                        <div key={stop.stopId} className="stop-item">
                          <div className="info-item">
                            <span className="info-label"><strong>Stop Type:</strong></span>
                            <span className="info-value">{stop.stopType}</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label"><strong>Address:</strong></span>
                            <span className="info-value">{stop.address}</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label"><strong>Sequence:</strong></span>
                            <span className="info-value">{stop.sequence}</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label"><strong>Status:</strong></span>
                            <span className="info-value">{stop.status}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      <Modal
        title="Order Details"
        open={isOrderModalOpen}
        onCancel={() => setIsOrderModalOpen(false)}
        footer={null}
        width={800}
        className="order-detail-modal"
      >
        {selectedOrderDetail && (
          <div className="order-detail">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Order ID:</span>
                <span className="info-value">{selectedOrderDetail.id}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Transport Service:</span>
                <span className="info-value">{selectedOrderDetail.transportService.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Notes:</span>
                <span className="info-value">{selectedOrderDetail.notes || 'No notes available'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Status:</span>
                <span className={`status-order status-${selectedOrderDetail.orderStatus}`}>
                  {selectedOrderDetail.orderStatus === 0
                    ? 'Pending'
                    : selectedOrderDetail.orderStatus === 4
                      ? 'Completed'
                      : 'Unknown'}
                </span>
              </div>
              <div className="price-section">
                <div className="info-item">
                  <span className="info-label">Total Price:</span>
                  <span className="info-value price">
                    {selectedOrderDetail.totalPrice.toLocaleString()} VND
                  </span>
                </div>
              </div>
            </div>

            <div className="address-section">
              <h3>Sender Information</h3>
              <div className="info-item">
                <span className="info-label">Address:</span>
                <span className="info-value">{selectedOrderDetail.fromAddress}</span>
              </div>
            </div>

            <div className="address-section">
              <h3>Receiver Information</h3>
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span className="info-value">{selectedOrderDetail.receiverName}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Phone:</span>
                <span className="info-value">{selectedOrderDetail.receiverPhone}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Address:</span>
                <span className="info-value">{selectedOrderDetail.toAddress}</span>
              </div>
            </div>

            <div className="fish-section">
              <h3>Ordered Fish</h3>
              {selectedOrderDetail.orderFishes && selectedOrderDetail.orderFishes.length > 0 ? (
                selectedOrderDetail.orderFishes.map((fish, index) => (
                  <div key={index} className="fish-item">
                    <p
                      style={{ cursor: 'pointer' }}
                      onClick={() => toggleFishDetails(index)}
                    >
                      <strong>Name:</strong> {fish.name}
                    </p>
                    {selectedFishIndex === index && (
                      <div className="fish-details">
                        <p><strong>Age:</strong> {fish.age} months</p>
                        <p><strong>Weight:</strong> {fish.weight} g</p>
                        <p><strong>Length:</strong> {fish.length} cm</p>
                        <p><strong>Fish Image:</strong></p>
                        <img
                          src={fish.fishImgURL}
                          alt="Fish"
                          className="fish-image"
                          style={{ maxWidth: '150px', maxHeight: '150px' }}
                        />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>No fish details available</p>
              )}
            </div>
          </div>
        )}
      </Modal>


    </div>
  );
}

export default ManageRoute;
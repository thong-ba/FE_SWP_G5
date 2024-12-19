import React, { useEffect, useState } from "react";
import { Table, Card, Typography, Space, Spin, Modal, Button } from "antd";
import axios from "axios";

const { Title } = Typography;

const DriverHistory = ({ driverId }) => {
  const [loading, setLoading] = useState(true);
  const [routeData, setRouteData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedRouteStops, setSelectedRouteStops] = useState([]);

  useEffect(() => {
    const fetchRouteHistory = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7046/api/Route/GetRouteByDriver/${driverId}`
        );
        const result = response.data.result;
        if (result) {
          setRouteData(result);
          setSelectedRouteStops(result.routeStops);
        }
      } catch (error) {
        console.error("Error fetching route data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRouteHistory();
  }, [driverId]);


  const columns = [
    {
      title: "Route ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      align: "center",
    },
    {
      title: "Route Status",
      dataIndex: "routeStatus",
      key: "routeStatus",
      render: (status) => (
        <span style={{ color: status === 1 ? "green" : "blue" }}>
          {status === 1 ? "Completed" : "Pending"}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "stopOrder",
      align: "center",
      render: (text, record) => (
        <Button onClick={() => {
          setSelectedRouteStops(record.routeStops);
          setVisible(true);
        }}>
          View Route Stop
        </Button>
      ),
    }
  ];

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Card
        style={{
          maxWidth: "800px",
          margin: "20px auto",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          Driver Route History
        </Title>
        {loading ? (
          <Space style={{ display: "flex", justifyContent: "center" }}>
            <Spin size="large" />
          </Space>
        ) : (
          <Table
            dataSource={routeData}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            bordered
          />
        )}
      </Card>

      <Modal
        title="Route Stops"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Table
          dataSource={selectedRouteStops}
          columns={[
            { title: "ID", dataIndex: "id", key: "id" },
            { title: "Address", dataIndex: "address", key: "address" },
            { title: "Route Stop Status", dataIndex: "routeStopStatus", key: "routeStopStatus" },
            { title: "Route ID", dataIndex: "routeId", key: "routeId" },
            { title: "Order ID", dataIndex: "orderId", key: "orderId" },
          ]}
          rowKey="id"
          pagination={false}
        />
      </Modal>
    </div>
  );
};

export default DriverHistory;

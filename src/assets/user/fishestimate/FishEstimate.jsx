import React, { useState } from 'react';
import { Table, InputNumber, Button, Card, Row, Col, Typography } from 'antd';
import './FishEstimate.css';
import axios from 'axios';
const { Title, Text, Link } = Typography;

const KoiShippingEstimator = () => {
  const [koiCounts, setKoiCounts] = useState({});
  const [showCard, setShowCard] = useState(false);
  const [estimate, setEstimate] = useState({ boxes: {}, cost: 0 });

  const koiSizes = [
    { key: 1, sizeCM: '19', sizeInch: '7.86' },
    { key: 2, sizeCM: '20-25', sizeInch: '7.87 - 9.84' },
    { key: 3, sizeCM: '25.1 - 30', sizeInch: '9.85 - 11.81' },
    { key: 4, sizeCM: '30.1 - 40', sizeInch: '11.82 - 15.75' },
    { key: 5, sizeCM: '40.1 - 44', sizeInch: '15.76 - 17.32' },
    { key: 6, sizeCM: '44.1 - 50', sizeInch: '17.33 - 19.6' },
    { key: 7, sizeCM: '50.1 - 55', sizeInch: '19.7 - 21.6' },
    { key: 8, sizeCM: '55.1 - 65', sizeInch: '21.7 - 25.5' },
    { key: 9, sizeCM: '65.1 - 73', sizeInch: '25.6 - 28.7' },
    { key: 10, sizeCM: '73.1 - 83', sizeInch: '28.8 - 32.6' },
  ];

  const columns = [
    {
      title: 'Size in CM',
      dataIndex: 'sizeCM',
      key: 'sizeCM',
      className: 'table-header',
    },
    {
      title: 'Size in Inch',
      dataIndex: 'sizeInch',
      key: 'sizeInch',
      className: 'table-header',
    },
    {
      title: 'Number of KOIs',
      dataIndex: 'key',
      key: 'input',
      render: (key) => (
        <InputNumber
          className="koi-input"
          min={0}
          onChange={(value) =>
            setKoiCounts({ ...koiCounts, [key]: value || 0 })
          }
          placeholder="0"
        />
      ),
    },
  ];

  const calculateEstimate = () => {
    const totalKoi = Object.values(koiCounts).reduce((a, b) => a + b, 0);

    // Initialize boxes count based on size categories
    const boxes = {
      large: 0,
      medium: 0,
      extraLarge: 0,
      specialLarge: 0,
    };

    // Define the maximum number of KOI that can fit in each box size
    const boxCapacity = {
      large: 5, // Example: 5 KOI for large boxes
      medium: 3, // Example: 3 KOI for medium boxes
      extraLarge: 7, // Example: 7 KOI for extra large boxes
      specialLarge: 4, // Example: 4 KOI for special large boxes
    };

    // Calculate the number of boxes needed based on total KOI
    if (totalKoi > 0) {
      let remainingKoi = totalKoi; // Use a new mutable variable

      boxes.large = Math.floor(remainingKoi / boxCapacity.large);
      remainingKoi %= boxCapacity.large;

      boxes.medium = Math.floor(remainingKoi / boxCapacity.medium);
      remainingKoi %= boxCapacity.medium;

      boxes.extraLarge = Math.floor(remainingKoi / boxCapacity.extraLarge);
      remainingKoi %= boxCapacity.extraLarge;

      boxes.specialLarge = Math.ceil(remainingKoi / boxCapacity.specialLarge);
    }

    const cost = (boxes.large * 20000) + (boxes.medium * 15000) + (boxes.extraLarge * 25000) + (boxes.specialLarge * 30000); // Example cost calculation

    setEstimate({ boxes, cost });
    setShowCard(true);
  };

  return (
    <div className="koi-container">
      <Row gutter={[16, 16]}>
        {/* Left Side */}
        <Col xs={24} md={16} className="left-section">
          <Title level={4} className="page-title">
            Start by entering the amount of koi in each size category that you
            wish to ship. Click "Get Estimate" to update box and shipping
            estimate.
          </Title>
          <Table
            className="koi-table"
            dataSource={koiSizes}
            columns={columns}
            pagination={false}
            bordered
          />
          <Button
            type="primary"
            className="get-estimate-button"
            onClick={calculateEstimate}
          >
            Get Estimate
          </Button>
        </Col>

        {/* Right Side */}
        {showCard && (
          <Col xs={24} md={8} className="right-section">
            {/* Card for Number of Boxes */}
            <Card className="estimate-card">
              <Title level={5} className="card-title">
                Number of boxes you need
              </Title>
              <Text className="box-info">
                <strong>{estimate.boxes.large}</strong> large boxes, <strong>{estimate.boxes.medium}</strong>{' '}
                medium boxes, <strong>{estimate.boxes.extraLarge}</strong> extra large boxes and{' '}
                <strong>{estimate.boxes.specialLarge}</strong> special large boxes
              </Text>
            </Card>

            {/* Card for Total Shipping Cost */}
            <Card className="cost-card" style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img
                src="truck.png"
                alt="Shipping Cost Illustration"
                className="cost-image"
                style={{ width: '100px', height: 'auto' }}
              />
              <Title level={5} className="cost-title">
                Shipping cost
              </Title>
              <Text strong className="cost-amount">
                {estimate.cost} VND
              </Text>
            </Card>

            {/* Card for Suggestions
            <Card className="suggestions-card" bordered={false} style={{ marginTop: '10px' }}>
              <Text className="suggestion-text">
                You can purchase this many more koi, of each size, to fit in
                the same size box shown above.
              </Text>
              <ul className="suggestion-list">
                <li>
                  2 of <Link href="#" className="suggestion-link">19 CM (7.86 Inch)</Link> or,
                </li>
                <li>
                  1 of <Link href="#" className="suggestion-link">20-25 CM (7.87 - 9.84 Inch)</Link> or,
                </li>
                <li>
                  1 of <Link href="#" className="suggestion-link">25.5 - 30 CM (9.85 - 11.81 Inch)</Link> or,
                </li>
                <li>
                  0 of <Link href="#" className="suggestion-link">30.5 - 40 CM (11.82 - 15.75 Inch)</Link>
                </li>
              </ul>
              <Text>
                Click koi size ranges to{' '}
                <Link href="#" className="search-link">search for koi</Link> of that size to add to
                the box.
              </Text>
            </Card> */}
          </Col>
        )}
      </Row>
    </div>
  );
};

export default KoiShippingEstimator;
import React, { useState, useEffect } from "react";
import { GetAllTransportService } from "../../../api/TransportServiceApi";
import { Card, Typography, Spin, Pagination } from 'antd';
const { Title, Paragraph } = Typography;

const TransportPage = () => {
  const [transportData, setTransportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for pagination
  const [currentDomesticPage, setCurrentDomesticPage] = useState(1);
  const [currentLocalPage, setCurrentLocalPage] = useState(1);
  const [currentInternationalPage, setCurrentInternationalPage] = useState(1);

  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllTransportService();
        if (response.isSuccess) {
          setTransportData(response.result);
        } else {
          setError("Failed to fetch data: " + response.errorMessage);
        }
      } catch (err) {
        setError("An error occurred: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Group data into categories
  const domestic = transportData.filter((item) => item.transportType === 0);
  const local = transportData.filter((item) => item.transportType === 1);
  const international = transportData.filter((item) => item.transportType === 2);

  // Card Component
  const CardComponent = ({ name, description, pricePerKm, pricePerKg, pricePerAmount, transportPrice, fromProvince, toProvince, isActive, category }) => (
    <Card
      style={{ ...cardStyle, ...cardCategoryStyles[category] }}
      hoverable
      bordered={false}
      cover={<div style={cardHeaderStyle}>{category.toUpperCase()}</div>}
    >
      <Title level={4} style={cardTitleStyle}>{name}</Title>
      <Paragraph style={cardParagraphStyle}>{description}</Paragraph>
      {pricePerKm !== undefined && <Paragraph><b>Price per Km:</b> {pricePerKm} VND</Paragraph>}
      {pricePerKg !== undefined && <Paragraph><b>Price per Kg:</b> {pricePerKg} VND</Paragraph>}
      {pricePerAmount !== undefined && <Paragraph><b>Price per Amount:</b> {pricePerAmount} VND</Paragraph>}
      {transportPrice !== undefined && <Paragraph><b>Transport Price:</b> {transportPrice} VND</Paragraph>}
      {fromProvince && <Paragraph><b>From:</b> {fromProvince}</Paragraph>}
      {toProvince && <Paragraph><b>To:</b> {toProvince}</Paragraph>}
      <Paragraph><b>Status:</b> {isActive ? "Active" : "Inactive"}</Paragraph>
    </Card>
  );

  // Render Section with Pagination
  const renderSection = (title, data, currentPage, setCurrentPage, category) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedData = data.slice(startIndex, startIndex + itemsPerPage);

    return (
      <div>
        <Title level={2} style={sectionTitleStyle}>{title}</Title>
        <div style={sectionStyle}>
          {selectedData.map((item) => (
            <CardComponent key={item.id} {...item} category={category} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={data.length}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    );
  };

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
  if (error) return <Paragraph style={{ color: "red", textAlign: "center" }}>{error}</Paragraph>;

  return (
    <div style={pageStyle}>
      {renderSection("Domestic", domestic, currentDomesticPage, setCurrentDomesticPage, "domestic")}
      {renderSection("Local", local, currentLocalPage, setCurrentLocalPage, "local")}
      {renderSection("International", international, currentInternationalPage, setCurrentInternationalPage, "international")}
    </div>
  );
};

// Styles
const pageStyle = {
  margin: "20px",
  fontFamily: "'Poppins', sans-serif",
};

const sectionTitleStyle = {
  color: "#4CAF50",
  textAlign: "center",
  marginBottom: "20px",
  textTransform: "uppercase",
};

const sectionStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "center",
};

const cardStyle = {
  borderRadius: "10px",
  overflow: "hidden",
  transition: "transform 0.3s, box-shadow 0.3s",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  maxWidth: "300px",
  cursor: "pointer",
};

const cardCategoryStyles = {
  domestic: { backgroundColor: "#E3FCEC" },
  local: { backgroundColor: "#FFF3E3" },
  international: { backgroundColor: "#E3ECFF" },
};

const cardHeaderStyle = {
  backgroundColor: "#000",
  color: "#fff",
  textAlign: "center",
  fontSize: "14px",
  fontWeight: "bold",
  padding: "10px",
};

const cardTitleStyle = {
  color: "#333",
  marginBottom: "10px",
};

const cardParagraphStyle = {
  color: "#666",
  fontSize: "14px",
};

export default TransportPage;

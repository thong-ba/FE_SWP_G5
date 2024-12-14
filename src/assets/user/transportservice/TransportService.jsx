// TransportPage.jsx
import React, { useState, useEffect } from "react";
import { GetAllTransportService } from "../../../api/TransportServiceApi";
import { Card, Typography, Spin, Pagination } from 'antd';
import styles from './TransportService.module.css';

const { Title, Paragraph } = Typography;

const TransportPage = () => {
  const [transportData, setTransportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const domestic = transportData.filter((item) => item.transportType === 0);
  const local = transportData.filter((item) => item.transportType === 1);
  const international = transportData.filter((item) => item.transportType === 2);

  const CardComponent = ({ name, description, pricePerKm, pricePerKg, pricePerAmount, transportPrice, fromProvince, toProvince, isActive, category }) => (
    <Card
      className={`${styles.card} ${styles[category]}`}
      hoverable
      bordered={false}
      cover={<div className={styles.cardHeader}>{category.toUpperCase()}</div>}
    >
      <Title level={4} className={styles.cardTitle}>{name}</Title>
      <Paragraph className={styles.cardParagraph}>{description}</Paragraph>
      {pricePerKm !== undefined && <Paragraph><b>Price per Km:</b> {pricePerKm} VND</Paragraph>}
      {pricePerKg !== undefined && <Paragraph><b>Price per Kg:</b> {pricePerKg} VND</Paragraph>}
      {pricePerAmount !== undefined && <Paragraph><b>Price per Amount:</b> {pricePerAmount} VND</Paragraph>}
      {transportPrice !== undefined && <Paragraph><b>Transport Price:</b> {transportPrice} VND</Paragraph>}
      {fromProvince && <Paragraph><b>From:</b> {fromProvince}</Paragraph>}
      {toProvince && <Paragraph><b>To:</b> {toProvince}</Paragraph>}
      <Paragraph><b>Status:</b> {isActive ? "Active" : "Inactive"}</Paragraph>
    </Card>
  );

  const renderSection = (title, data, currentPage, setCurrentPage, category) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedData = data.slice(startIndex, startIndex + itemsPerPage);

    return (
      <div>
        <Title level={2} className={styles.sectionTitle}>{title}</Title>
        <div className={styles.sectionContent}>
          {selectedData.map((item) => (
            <CardComponent key={item.id} {...item} category={category} />
          ))}
        </div>
        <div className={styles.paginationContainer}>
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

  if (loading) return <Spin size="large" className={styles.loadingSpinner} />;
  if (error) return <Paragraph className={styles.errorMessage}>{error}</Paragraph>;

  return (
    <div className={styles.pageContainer}>
      {renderSection("Domestic", domestic, currentDomesticPage, setCurrentDomesticPage, "domestic")}
      {renderSection("Local", local, currentLocalPage, setCurrentLocalPage, "local")}
      {renderSection("International", international, currentInternationalPage, setCurrentInternationalPage, "international")}
    </div>
  );
};

export default TransportPage;

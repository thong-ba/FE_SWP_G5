import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Avatar, Button, Spin, Typography, message } from 'antd';
import './Profile.module.css';

const { Title, Paragraph } = Typography;

function Profile() {
  const [userDetails, setUserDetails] = useState({
    email: '',
    fullname: '',
    role: '',
    phoneNumber: '',
    imgUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const role = decodedToken.Role;
        const fullname = decodedToken.FullName;

        axios.get('https://localhost:7046/api/UserAccount/GetUserProfile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then((response) => {
            const { firstName, lastName, email, phoneNumber, imgUrl } = response.data.result;
            setUserDetails({
              fullname: `${firstName} ${lastName}`,
              email,
              role,
              phoneNumber,
              imgUrl
            });
            setLoading(false);
          })
          .catch((error) => {
            setError('Error fetching user data');
            setLoading(false);
            console.error('Error fetching user data:', error);
            message.error('Error fetching user data');
          });

      } catch (error) {
        setError('Error decoding token');
        setLoading(false);
        console.error('Error decoding token:', error);
        message.error('Error decoding token');
      }
    }
  }, []);


  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Card className="user-info-container">
      <div className="user-info-header">
        <Title level={2}>Welcome, {userDetails.fullname}</Title>
      </div>
      <div className="user-info-body">
        <Avatar
          src={`${process.env.PUBLIC_URL}/person.png`}
          size={100}
          className="user-info-avatar"
        />
        <div className="user-info-details">
          <Paragraph><strong>Email:</strong> {userDetails.email}</Paragraph>
          <Paragraph><strong>Role:</strong> {userDetails.role}</Paragraph>
          <Paragraph><strong>Role:</strong> {userDetails.fullname}</Paragraph>

          <Paragraph><strong>Phone Number:</strong> {userDetails.phoneNumber || 'Not available'}</Paragraph>
        </div>
      </div>

    </Card>
  );
}

export default Profile;

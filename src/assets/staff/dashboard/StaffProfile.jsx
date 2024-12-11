import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

function StaffProfile() {
  const [userDetails, setUserDetails] = useState({
    fullname: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    const token = sessionStorage.getItem('token'); // Get token from sessionStorage

    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the token

        const fullname = decodedToken.FullName; // Extract full name
        const email = decodedToken.Email; // Extract email
        const role = decodedToken.Role; // Extract role

        // Update state with user details
        setUserDetails({ fullname, email, role });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []); // Run only once when the component mounts

  return (
    <div>
      <h1>Staff Profile</h1>

      <p><strong>Full Name:</strong> {userDetails.fullname}</p>
      <p><strong>Email:</strong> {userDetails.email}</p>
      <p><strong>Role:</strong> {userDetails.role}</p>
    </div>
  );
}

export default StaffProfile;

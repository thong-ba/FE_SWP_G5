// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './UpdateProfile.css';
// import { useNavigate } from 'react-router-dom';

// function UpdateProfile() {
//   const [userDetails, setUserDetails] = useState({
//     firstName: '',
//     lastName: '',
//     phoneNumber: '',
//     imgUrl: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = sessionStorage.getItem('token');
//     if (token) {
//       // Load user data if necessary
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     if (type === 'file') {
//       // If it's a file input, set the imgUrl as the selected file
//       setUserDetails((prevDetails) => ({
//         ...prevDetails,
//         imgUrl: files[0],  // Get the first file selected
//       }));
//     } else {
//       setUserDetails((prevDetails) => ({
//         ...prevDetails,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);
//     setSuccessMessage('');

//     const token = sessionStorage.getItem('token');
//     if (token) {
//       const formData = new FormData();
//       formData.append('firstName', userDetails.firstName);
//       formData.append('lastName', userDetails.lastName);
//       formData.append('phoneNumber', userDetails.phoneNumber);
//       if (userDetails.imgUrl) {
//         formData.append('imgUrl', userDetails.imgUrl); // Append image file
//       }

//       try {
//         const response = await axios.put(
//           'https://localhost:7046/api/UserAccount/UpdateUserProfile',
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'multipart/form-data', // Important for file upload
//             },
//           }
//         );

//         if (response.data.isSuccess) {
//           setSuccessMessage('Profile updated successfully');
//         } else {
//           setError('Failed to update profile');
//         }
//       } catch (err) {
//         setError('An error occurred while updating the profile');
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="update-profile-container">
//       <h1>Update Profile</h1>
//       {successMessage && <p className="success-message">{successMessage}</p>}
//       {error && <p className="error-message">{error}</p>}

//       <form onSubmit={handleSubmit} className="update-profile-form">
//         <div className="form-group">
//           <label htmlFor="firstName">First Name:</label>
//           <input
//             type="text"
//             id="firstName"
//             name="firstName"
//             value={userDetails.firstName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="lastName">Last Name:</label>
//           <input
//             type="text"
//             id="lastName"
//             name="lastName"
//             value={userDetails.lastName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="phoneNumber">Phone Number:</label>
//           <input
//             type="text"
//             id="phoneNumber"
//             name="phoneNumber"
//             value={userDetails.phoneNumber}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="imgUrl">Upload Image:</label>
//           <input
//             type="file"
//             id="imgUrl"
//             name="imgUrl"
//             accept="image/*"
//             onChange={handleChange}
//           />
//         </div>

//         <button type="submit" disabled={isLoading}>
//           {isLoading ? 'Updating...' : 'Update Profile'}
//         </button>
//       </form>

//       <button className="back-button" onClick={() => navigate('/userinfo')}>
//         Back to Profile
//       </button>
//     </div>
//   );
// }

// export default UpdateProfile;












import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateProfile.css';
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    imgUrl: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      // Load user data if necessary (e.g., make an API call to fetch user details)
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        imgUrl: files[0],  // Update with the selected file
      }));
    } else {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage('');

    const token = sessionStorage.getItem('token');
    if (token) {
      const formData = new FormData();
      formData.append('firstName', userDetails.firstName);
      formData.append('lastName', userDetails.lastName);
      formData.append('phoneNumber', userDetails.phoneNumber);
      if (userDetails.imgUrl) {
        formData.append('imgUrl', userDetails.imgUrl); // Append image file if selected
      }

      try {
        const response = await axios.put(
          'https://localhost:7046/api/UserAccount/UpdateUserProfile',
          formData,  // Sending FormData which will automatically set the correct Content-Type
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data) {
          // Assuming the backend response is a string (image URL or success message)
          setSuccessMessage('Profile updated successfully');
          // If response is a URL for the image, update userDetails.imgUrl with it
          setUserDetails((prevDetails) => ({
            ...prevDetails,
            imgUrl: response.data, // response.data should be the image URL or any relevant string
          }));
        } else {
          setError('Failed to update profile');
        }
      } catch (err) {
        setError('An error occurred while updating the profile');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="update-profile-container">
      <h1>Update Profile</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="update-profile-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={userDetails.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={userDetails.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={userDetails.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imgUrl">Upload Image:</label>
          <input
            type="file"
            id="imgUrl"
            name="imgUrl"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>

      <button className="back-button" onClick={() => navigate('/userinfo')}>
        Back to Profile
      </button>
    </div>
  );
}

export default UpdateProfile;

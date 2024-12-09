import React, { useState } from 'react';
import './VerifyAccount.css'; // Import your CSS file for styling
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import { verifyUser } from '../../../api/AuthApi'; // Import the verifyUser function

function VerifyAccount() {
  const { userId } = useParams(); // Get userId from URL parameters
  const navigate = useNavigate(); // Initialize useNavigate
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault(); // Prevent default form action

    try {
      const data = await verifyUser(userId, verificationCode); // Call the reusable function
      if (data.isSuccess) {
        toast.success('Verification successful! You can now log in.');
        setTimeout(() => {
          navigate(`/login`); // Navigate to verification page
        }, 2000); // Adjust the timeout as necessary (2000ms = 2 seconds)
      } else {
        setErrorMessage(data.errorMessage);
      }
    } catch (error) {
      setErrorMessage(error.message); // Use the error message from the thrown error
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="verify-container">
        <h2 className='title'>Verify Your Account</h2>
        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Enter Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
          <button type="submit">Verify</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </>
  );
}

export default VerifyAccount;

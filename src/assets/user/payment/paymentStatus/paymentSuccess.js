import React, { useState } from 'react';
import './PaymentSuccess.css';
import { useNavigate } from 'react-router-dom';
//import  PaymentSuccessImage from '../../../../../public/paymentSuccess.png';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/'); 
    };
   
    return (
        <div className="paymentsuccess-container">
            <img className='img-logo' src='paymentSuccess.png' alt="Payment successful" />
            <div className='paymentsuccess-text '>Payment Success</div>

            <button className='hello' onClick={handleBackToHome}>Back To Home</button> 
        </div>
    );
};

export default PaymentSuccess;

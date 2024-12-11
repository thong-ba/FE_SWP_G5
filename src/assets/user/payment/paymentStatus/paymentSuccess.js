import React, { useState } from 'react';
import './PaymentSuccess.css';
//import  PaymentSuccessImage from '../../../../../public/paymentSuccess.png';

const PaymentSuccess = () => {
   
    return (
        <div className="paymentsuccess-container">
            <img className='img-logo' src='paymentSuccess.png' alt="Payment successful" />
            <div className='paymentsuccess-text '>Payment Success</div>
        </div>
    );
};

export default PaymentSuccess;

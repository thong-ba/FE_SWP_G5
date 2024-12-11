import React, { useState } from 'react';
import './PaymentSuccess.css';


const PaymentFail = () => {
   
    return (
        <div className="paymentsuccess-container">
            <img className='img-logo' src='PaymentFail.png' alt="Payment successful" />
            <div className='paymentsuccess-text '>Payment Fail</div>
        </div>
    );
};

export default PaymentFail;

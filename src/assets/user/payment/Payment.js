import React, { useState } from 'react';  
import './Payment.css';  

const Payment = () => {  
    const orderInfo = {  
        sender: { fullName: 'Nguyen Van A', phone: '0912345678', address: '123 ABC Street, Hanoi' },  
        receiver: { fullName: 'Tran Thi B', phone: '0987654321', address: '456 XYZ Street, Ho Chi Minh City' },  
        koiInfo: { quantity: 3, type: 'quantity' },  
        shippingType: 'fast',  
    };  

    const koiCost = orderInfo.koiInfo.quantity * 1000000; // Cost per koi  
    const shippingRate = orderInfo.shippingType === 'fast' ? 0.25 : 0.15; // Shipping rate based on type  
    const shippingCost = koiCost * shippingRate; // Calculate shipping cost  
    const totalCost = koiCost + shippingCost; // Total cost including koi and shipping  

    const [paymentMethod, setPaymentMethod] = useState('cash');  
    const [cashPayer, setCashPayer] = useState('sender');  

    const formatCurrency = (amount) => amount.toLocaleString('en-US');  
    const depositAmount = (totalCost * 0.4).toFixed(0); // 40% deposit  

    return (  
        <div className="payment-container">  
            <h2 className="heading">Payment Confirmation</h2>  
            <div className="order-summary">  
                <h3>Order Information:</h3>  
                <p className='text'><strong>Sender:</strong> {orderInfo.sender.fullName} - {orderInfo.sender.phone} - {orderInfo.sender.address}</p>  
                <p className='text'><strong>Receiver:</strong> {orderInfo.receiver.fullName} - {orderInfo.receiver.phone} - {orderInfo.receiver.address}</p>  
                <p className='text'><strong>Number of Koi:</strong> {orderInfo.koiInfo.quantity} fish</p>  
                <p className='text'><strong>Shipping Type:</strong> Fast (3-4 days)</p>  
                <p className='text'><strong>Total Cost:</strong> {formatCurrency(totalCost)} VND</p>  
            </div>  

            <h3>Payment Method</h3>  
            <div className="payment-options">  
                <div className={`option-button ${paymentMethod === 'cash' ? 'selected' : ''}`} onClick={() => setPaymentMethod('cash')}>  
                    Cash  
                </div>  
                <div className={`option-button ${paymentMethod === 'transfer' ? 'selected' : ''}`} onClick={() => setPaymentMethod('transfer')}>  
                    Bank Transfer  
                </div>  
            </div>  

            <div className="payment-method-container">  
                {paymentMethod === 'cash' && (  
                    <div className="cash-options">  
                        <h4>Cash Payer:</h4>  
                        <div className="cash-option-container">  
                            <div className={`cash-option ${cashPayer === 'sender' ? 'selected' : ''}`} onClick={() => setCashPayer('sender')}>  
                                Sender  
                            </div>  
                            <div className={`cash-option ${cashPayer === 'receiver' ? 'selected' : ''}`} onClick={() => setCashPayer('receiver')}>  
                                Receiver  
                            </div>  
                            {cashPayer === 'receiver' && (  
                                <p>Deposit Amount: <strong>{formatCurrency(depositAmount)} VND</strong></p>  
                            )}  
                        </div>  
                    </div>  
                )}  

                {paymentMethod === 'transfer' && (  
                    <div className="qr-payment">  
                        <h4>Scan QR Code to Pay via VNPay:</h4>  
                        <img src="ma-qr.jpg" alt="QR Code VNPay" />  
                    </div>  
                )}  
            </div>  

            <button className="confirm-button">Confirm Payment</button>  
        </div>  
    );  
};  

export default Payment;
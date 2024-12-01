import React, { useState } from 'react';
import './Payment.css';

const Payment = () => {
    const orderInfo = {
        sender: { fullName: 'Nguyễn Văn A', phone: '0912345678', address: '123 Đường ABC, Hà Nội' },
        receiver: { fullName: 'Trần Thị B', phone: '0987654321', address: '456 Đường XYZ, TP.HCM' },
        koiInfo: { quantity: 3, type: 'quantity' },
        shippingType: 'fast',
    };

    const koiCost = orderInfo.koiInfo.quantity * 1000000;
    const shippingRate = orderInfo.shippingType === 'fast' ? 0.25 : 0.15;
    const shippingCost = koiCost * shippingRate;
    const totalCost = koiCost + shippingCost;

    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [cashPayer, setCashPayer] = useState('sender');

    const formatCurrency = (amount) => amount.toLocaleString('vi-VN');
    const depositAmount = (totalCost * 0.4).toFixed(0);

    return (
        <div className="payment-container">
            <h2 className="heading">Xác Nhận Thanh Toán</h2>
            <div className="order-summary">
                <h3>Thông Tin Đặt Hàng:</h3>
                <p className='text'><strong>Người giao hàng:</strong> {orderInfo.sender.fullName} - {orderInfo.sender.phone} - {orderInfo.sender.address}</p>
                <p className='text'><strong>Người nhận hàng:</strong> {orderInfo.receiver.fullName} - {orderInfo.receiver.phone} - {orderInfo.receiver.address}</p>
                <p className='text'><strong>Số lượng cá:</strong> {orderInfo.koiInfo.quantity} con</p>
                <p className='text'><strong>Hình thức giao hàng:</strong> Nhanh (3-4 ngày)</p>
                <p className='text'><strong>Tổng chi phí:</strong> {formatCurrency(totalCost)} VND</p>
            </div>

            <h3>Hình Thức Thanh Toán</h3>
            <div className="payment-options">
                <div className={`option-button ${paymentMethod === 'cash' ? 'selected' : ''}`} onClick={() => setPaymentMethod('cash')}>
                    Tiền mặt
                </div>
                <div className={`option-button ${paymentMethod === 'transfer' ? 'selected' : ''}`} onClick={() => setPaymentMethod('transfer')}>
                    Chuyển khoản
                </div>
            </div>

            <div className="payment-method-container">
                {paymentMethod === 'cash' && (
                    <div className="cash-options">
                        <h4>Người trả tiền mặt:</h4>
                        <div className="cash-option-container">
                            <div className={`cash-option ${cashPayer === 'sender' ? 'selected' : ''}`} onClick={() => setCashPayer('sender')}>
                                Người giao hàng
                            </div>
                            <div className={`cash-option ${cashPayer === 'receiver' ? 'selected' : ''}`} onClick={() => setCashPayer('receiver')}>
                                Người nhận hàng
                            </div>
                            {cashPayer === 'receiver' && (
                                <p>Số tiền cần cọc: <strong>{formatCurrency(depositAmount)} VND</strong></p>
                            )}
                        </div>
                    </div>
                )}

                {paymentMethod === 'transfer' && (
                    <div className="qr-payment">
                        <h4>Quét mã QR để thanh toán bằng VNPay:</h4>
                        <img src="ma-qr.jpg" alt="QR Code VNPay" />
                    </div>
                )}
            </div>

            <button className="confirm-button">Xác Nhận Thanh Toán</button>
        </div>
    );
};

export default Payment;

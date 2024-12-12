// import React, { useState } from 'react';
// import './Payment.css';

// const Payment = () => {
//     const orderInfo = {
//         sender: { fullName: 'Nguyễn Văn A', phone: '0912345678', address: '123 Đường ABC, Hà Nội' },
//         receiver: { fullName: 'Trần Thị B', phone: '0987654321', address: '456 Đường XYZ, TP.HCM' },
//         koiInfo: { quantity: 3, type: 'quantity' },
//         shippingType: 'fast',
//     };

//     const koiCost = orderInfo.koiInfo.quantity * 1000000;
//     const shippingRate = orderInfo.shippingType === 'fast' ? 0.25 : 0.15;
//     const shippingCost = koiCost * shippingRate;
//     const totalCost = koiCost + shippingCost;

//     const [paymentMethod, setPaymentMethod] = useState('cash');
//     const [cashPayer, setCashPayer] = useState('sender');

//     const formatCurrency = (amount) => amount.toLocaleString('vi-VN');
//     const depositAmount = (totalCost * 0.4).toFixed(0);

//     return (
//         <div className="payment-container">
//             <h2 className="heading">Xác Nhận Thanh Toán</h2>
//             <div className="order-summary">
//                 <h3>Thông Tin Đặt Hàng:</h3>
//                 <p className='text'><strong>Người giao hàng:</strong> {orderInfo.sender.fullName} - {orderInfo.sender.phone} - {orderInfo.sender.address}</p>
//                 <p className='text'><strong>Người nhận hàng:</strong> {orderInfo.receiver.fullName} - {orderInfo.receiver.phone} - {orderInfo.receiver.address}</p>
//                 <p className='text'><strong>Số lượng cá:</strong> {orderInfo.koiInfo.quantity} con</p>
//                 <p className='text'><strong>Hình thức giao hàng:</strong> Nhanh (3-4 ngày)</p>
//                 <p className='text'><strong>Tổng chi phí:</strong> {formatCurrency(totalCost)} VND</p>
//             </div>

//             <h3>Hình Thức Thanh Toán</h3>
//             <div className="payment-options">
//                 <div className={`option-button ${paymentMethod === 'cash' ? 'selected' : ''}`} onClick={() => setPaymentMethod('cash')}>
//                     Tiền mặt
//                 </div>
//                 <div className={`option-button ${paymentMethod === 'transfer' ? 'selected' : ''}`} onClick={() => setPaymentMethod('transfer')}>
//                     Chuyển khoản
//                 </div>
//             </div>

//             <div className="payment-method-container">
//                 {paymentMethod === 'cash' && (
//                     <div className="cash-options">
//                         <h4>Người trả tiền mặt:</h4>
//                         <div className="cash-option-container">
//                             <div className={`cash-option ${cashPayer === 'sender' ? 'selected' : ''}`} onClick={() => setCashPayer('sender')}>
//                                 Người giao hàng
//                             </div>
//                             <div className={`cash-option ${cashPayer === 'receiver' ? 'selected' : ''}`} onClick={() => setCashPayer('receiver')}>
//                                 Người nhận hàng
//                             </div>
//                             {cashPayer === 'receiver' && (
//                                 <p>Số tiền cần cọc: <strong>{formatCurrency(depositAmount)} VND</strong></p>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {paymentMethod === 'transfer' && (
//                     <div className="qr-payment">
//                         <h4>Quét mã QR để thanh toán bằng VNPay:</h4>
//                         <img src="ma-qr.jpg" alt="QR Code VNPay" />
//                     </div>
//                 )}
//             </div>

//             <button className="confirm-button">Xác Nhận Thanh Toán</button>
//         </div>
//     );
// };

// export default Payment;

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Payment.css';
import axios from 'axios';

const PaymentPage = () => {
    const [orderData, setOrderData] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(''); // For payment method selection
    const [cashPayer, setCashPayer] = useState(''); // For selecting payer in cash payment
    const [loading, setLoading] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('orderId');
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                console.log("orderId", orderId);
                const response = await 
                axios.get(`https://localhost:7046/api/Order/GetOrderByIdAsyncAsync/${orderId}`);
                
                console.log("response", response.data);
                setOrderData(response.data);

                if (response.data) {
                    const { totalPrice, transportService } = response.data.result;
                    const shippingCost = transportService?.pricePerKm * response.data.distance || 0;
                    setTotalAmount(totalPrice + shippingCost);
                }
            }
            catch (error) {
                console.error("Failed to fetch order data", error)
            }
        };

        fetchOrderData();
    }, [orderId]);

    if (!orderData) {
        return <p>Loading...</p>;
    }

    const { senderInfo, receiverInfo, shippingType, orderFishes } = orderData.result;

    const handlePayment = async () => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('token');
            
            const response = await axios.post('https://localhost:7046/api/Payment',
                { orderId: orderId },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("Payment response: ", response.data);

            if (response.data.isSuccess) {
                const paymentUrl = response.data.result;

                window.location.href = paymentUrl;  
            } else {
                console.error("Payment request failed:", response.data.errorMessage);
            }
        }
        catch (error) {
            console.error("Payment request failed:", error);
        }
        finally {
            setLoading(false);
        }
        // Proceed to payment logic (e.g., API call, payment gateway redirection)
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    const handleVnPay = async () => {
        setLoading(true);
        try {
            const vnpayUrl = await axios.put(`https://localhost:7046/api/Order/UpdateStatusPaymentToVnPayByOrderIdAsync?OrderId=${orderId}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Payment response: ", vnpayUrl.data);
            setPaymentMethod('transfer');
        }
        catch (error) {
            console.error("Payment request failed:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleCash = async () => {
        setLoading(true);
        try {
            const cashUrl = await axios.put(`https://localhost:7046/api/Order/UpdateStatusPaymentToCashByOrderIdAsync?OrderId=${orderId}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Cash response: ", cashUrl.data);
            setPaymentMethod('cash');
        }
        catch (error) {
            console.error("Cash request failed:", error);
        } finally {
            setLoading(false);
        }
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat().format(amount);
    };

    return (
        <div className="payment-contain Set the fetched data into stateer">
            <h2 className="heading">Xác Nhận Thanh Toán</h2>

            <div className="order-summary">
                <h3>Thông Tin Đặt Hàng:</h3>
                <p className='text'><strong>Người giao hàng:</strong>{orderData.result?.fromAddress}</p>
                <p className='text'><strong>Người nhận hàng:</strong> {orderData.result?.receiverName} - {orderData.result?.receiverPhone} - {orderData.result?.toAddress}</p>
                <p className='text'><strong>Số lượng cá:</strong> {orderFishes?.length} con</p>
                <p className='text'><strong>Hình thức giao hàng:</strong> {orderData.result?.transportService?.transportType}</p>
                <p className='text'><strong>Tổng chi phí:</strong> {formatCurrency(totalAmount)} VND</p>
            </div>

            <h3>Hình Thức Thanh Toán</h3>
            <div className="payment-options">
                <div className={`option-button ${paymentMethod === 'cash' ? 'selected' : ''}`} onClick={handleCash}>
                    Tiền mặt
                </div>
                <div className={`option-button ${paymentMethod === 'transfer' ? 'selected' : ''}`} onClick={handleVnPay}>
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
                                <p>Số tiền cần cọc: <strong>{formatCurrency(totalAmount * 0.1)} VND</strong></p>
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

            <button className="confirm-button" onClick={handlePayment} disabled={loading}>
                {loading ? 'Đang xử lý...' : 'Xác Nhận Thanh Toán'}
            </button>
        </div>
    );
};

export default PaymentPage;
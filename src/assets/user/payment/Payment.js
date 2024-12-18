// // import React, { useState } from 'react';
// // import './Payment.css';

// // const Payment = () => {
// //     const orderInfo = {
// //         sender: { fullName: 'Nguyễn Văn A', phone: '0912345678', address: '123 Đường ABC, Hà Nội' },
// //         receiver: { fullName: 'Trần Thị B', phone: '0987654321', address: '456 Đường XYZ, TP.HCM' },
// //         koiInfo: { quantity: 3, type: 'quantity' },
// //         shippingType: 'fast',
// //     };

// //     const koiCost = orderInfo.koiInfo.quantity * 1000000;
// //     const shippingRate = orderInfo.shippingType === 'fast' ? 0.25 : 0.15;
// //     const shippingCost = koiCost * shippingRate;
// //     const totalCost = koiCost + shippingCost;

// //     const [paymentMethod, setPaymentMethod] = useState('cash');
// //     const [cashPayer, setCashPayer] = useState('sender');

// //     const formatCurrency = (amount) => amount.toLocaleString('vi-VN');
// //     const depositAmount = (totalCost * 0.4).toFixed(0);

// //     return (
// //         <div className="payment-container">
// //             <h2 className="heading">Xác Nhận Thanh Toán</h2>
// //             <div className="order-summary">
// //                 <h3>Thông Tin Đặt Hàng:</h3>
// //                 <p className='text'><strong>Người giao hàng:</strong> {orderInfo.sender.fullName} - {orderInfo.sender.phone} - {orderInfo.sender.address}</p>
// //                 <p className='text'><strong>Người nhận hàng:</strong> {orderInfo.receiver.fullName} - {orderInfo.receiver.phone} - {orderInfo.receiver.address}</p>
// //                 <p className='text'><strong>Số lượng cá:</strong> {orderInfo.koiInfo.quantity} con</p>
// //                 <p className='text'><strong>Hình thức giao hàng:</strong> Nhanh (3-4 ngày)</p>
// //                 <p className='text'><strong>Tổng chi phí:</strong> {formatCurrency(totalCost)} VND</p>
// //             </div>

// //             <h3>Hình Thức Thanh Toán</h3>
// //             <div className="payment-options">
// //                 <div className={`option-button ${paymentMethod === 'cash' ? 'selected' : ''}`} onClick={() => setPaymentMethod('cash')}>
// //                     Tiền mặt
// //                 </div>
// //                 <div className={`option-button ${paymentMethod === 'transfer' ? 'selected' : ''}`} onClick={() => setPaymentMethod('transfer')}>
// //                     Chuyển khoản
// //                 </div>
// //             </div>

// //             <div className="payment-method-container">
// //                 {paymentMethod === 'cash' && (
// //                     <div className="cash-options">
// //                         <h4>Người trả tiền mặt:</h4>
// //                         <div className="cash-option-container">
// //                             <div className={`cash-option ${cashPayer === 'sender' ? 'selected' : ''}`} onClick={() => setCashPayer('sender')}>
// //                                 Người giao hàng
// //                             </div>
// //                             <div className={`cash-option ${cashPayer === 'receiver' ? 'selected' : ''}`} onClick={() => setCashPayer('receiver')}>
// //                                 Người nhận hàng
// //                             </div>
// //                             {cashPayer === 'receiver' && (
// //                                 <p>Số tiền cần cọc: <strong>{formatCurrency(depositAmount)} VND</strong></p>
// //                             )}
// //                         </div>
// //                     </div>
// //                 )}

// //                 {paymentMethod === 'transfer' && (
// //                     <div className="qr-payment">
// //                         <h4>Quét mã QR để thanh toán bằng VNPay:</h4>
// //                         <img src="ma-qr.jpg" alt="QR Code VNPay" />
// //                     </div>
// //                 )}
// //             </div>

// //             <button className="confirm-button">Xác Nhận Thanh Toán</button>
// //         </div>
// //     );
// // };

// // export default Payment;
// import React, { useState } from 'react';
// import './Payment.css';
// import axios from 'axios';

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
//     const [loading, setLoading] = useState(false);
//     const [paymentUrl, setPaymentUrl] = useState('');

//     const formatCurrency = (amount) => amount.toLocaleString('vi-VN');
//     const depositAmount = (totalCost * 0.4).toFixed(0);

//     // Function to create an order and get orderId
//     const createOrder = async () => {
//         try {
//             const response = await axios.post('https://localhost:7046/api/Order', orderInfo);
//             return response.data.result;  // orderId
//         } catch (error) {
//             console.error('Error creating order:', error);
//             throw error;
//         }
//     };

//     // Function to initiate the payment
//     const initiatePayment = async (orderId) => {
//         try {
//             const response = await axios.post('https://localhost:7046/api/Payment', { orderId });
//             return response.data.result;  // VnPay payment URL
//         } catch (error) {
//             console.error('Error initiating payment:', error);
//             throw error;
//         }
//     };

//     // Handle confirmation of payment
//     const handlePayment = async () => {
//         setLoading(true);
//         try {
//             // Step 1: Create the order and get the orderId
//             const orderId = await createOrder();

//             // Step 2: Initiate the payment with orderId
//             const paymentLink = await initiatePayment(orderId);

//             // Step 3: Redirect to VnPay payment page
//             window.location.href = paymentLink;  // Redirect to the payment URL
//         } catch (error) {
//             alert('Có lỗi xảy ra trong quá trình thanh toán.');
//         } finally {
//             setLoading(false);
//         }
//     };

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

//             <button className="confirm-button" onClick={handlePayment} disabled={loading}>
//                 {loading ? 'Đang xử lý...' : 'Xác Nhận Thanh Toán'}
//             </button>
//         </div>
//     );
// };

// export default Payment;




import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

const PaymentPage = () => {
    const [orderData, setOrderData] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(''); // For payment method selection
    const [cashPayer, setCashPayer] = useState(''); // For selecting payer in cash payment
    const [loading, setLoading] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const savedData = sessionStorage.getItem('orderData');
        if (savedData) {
            setOrderData(JSON.parse(savedData));
        }

        const storedTotalAmount = JSON.parse(sessionStorage.getItem('totalAmount'));
        if (storedTotalAmount !== null) {
            setTotalAmount(storedTotalAmount);
        }
    }, []);

    
    if (!orderData) {
        return <p>Loading...</p>;
    }

    const { senderInfo, receiverInfo, shippingType, selectedProducts, orderFish, fishQualification } = orderData;

    const handlePayment = () => {
        setLoading(true);
        // Proceed to payment logic (e.g., API call, payment gateway redirection)
        setTimeout(() => {
            setLoading(false);
            navigate('/confirmation');  // Assuming there's a confirmation page
        }, 2000);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat().format(amount);
    };

    return (
        <div className="payment-container">
            <h2 className="heading">Xác Nhận Thanh Toán</h2>

            <div className="order-summary">
                <h3>Thông Tin Đặt Hàng:</h3>
                <p className='text'><strong>Người giao hàng:</strong> {senderInfo.fullName} - {senderInfo.phone} - {senderInfo.address}</p>
                <p className='text'><strong>Người nhận hàng:</strong> {receiverInfo.fullName} - {receiverInfo.phone} - {receiverInfo.address}</p>
                <p className='text'><strong>Số lượng cá:</strong> {selectedProducts.length} con</p>
                <p className='text'><strong>Hình thức giao hàng:</strong> {shippingType}</p>
                <p className='text'><strong>Tổng chi phí:</strong> {formatCurrency(totalAmount)} VND</p>
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

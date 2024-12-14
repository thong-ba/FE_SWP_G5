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
                const response = await axios.get(`https://localhost:7046/api/Order/GetOrderByIdAsyncAsync/${orderId}`);

                console.log("response", response.data);
                setOrderData(response.data);

                if (response.data) {
                    const { totalPrice, transportService } = response.data.result;
                    const shippingCost = transportService?.pricePerKm * response.data.distance || 0;
                    setTotalAmount(totalPrice + shippingCost);
                }
            } catch (error) {
                console.error("Failed to fetch order data", error);
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
        } catch (error) {
            console.error("Payment request failed:", error);
        } finally {
            setLoading(false);
        }

        setTimeout(() => {
            setLoading(false);
        }, 10);
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
        } catch (error) {
            console.error("Payment request failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCash = async () => {
        setLoading(true);
        try {
            const response = await axios.put(
                `https://localhost:7046/api/Order/UpdateStatusPaymentToCashByOrderIdAsync?OrderId=${orderId}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log("Cash response: ", response.data);

            if (response.data.isSuccess) {
                setPaymentMethod('cash');
                alert("Payment completed successfully!");
                navigate('/'); // Điều hướng về trang home
            } else {
                console.error("Cash payment failed:", response.data.errorMessage);
                alert("Payment failed. Please try again.");
            }
        } catch (error) {
            console.error("Cash request failed:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    const formatCurrency = (amount) => {
        return new Intl.NumberFormat().format(amount);
    };

    return (
        <div className="payment-container">
            <h2 className="heading">Payment Confirmation</h2>

            <div className="order-summary">
                <h3>Order Information:</h3>
                <p className='text'><strong>Sender:</strong> {orderData.result?.fromAddress}</p>
                <p className='text'><strong>Receiver:</strong> {orderData.result?.receiverName} - {orderData.result?.receiverPhone} - {orderData.result?.toAddress}</p>
                <p className='text'><strong>Number of fishes:</strong> {orderFishes?.length}</p>
                <p className='text'><strong>Shipping type:</strong> {orderData.result?.transportService?.transportType}</p>
                <p className='text'><strong>Total cost:</strong> {formatCurrency(totalAmount)} VND</p>
            </div>

            <h3>Payment Method</h3>
            <div className="payment-options">
                <div className={`option-button ${paymentMethod === 'cash' ? 'selected' : ''}`} onClick={handleCash}>
                    Cash
                </div>
                <div className={`option-button ${paymentMethod === 'transfer' ? 'selected' : ''}`} onClick={handleVnPay}>
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
                                <h2>Deposit amount: <strong>{formatCurrency(totalAmount * 0.1)} VND</strong></h2>
                            )}
                        </div>
                    </div>
                )}

                {paymentMethod === 'transfer' && (
                    <div className="qr-payment">
                        <h2>Please click "Confirm Payment" to payment via VNPay</h2>
                    </div>
                )}
            </div>

            <button
                className="confirm-button"
                onClick={paymentMethod === 'cash' ? handleCash : handlePayment}
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Confirm Payment'}
            </button>

        </div>
    );
};

export default PaymentPage;

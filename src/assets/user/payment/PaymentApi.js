import axios from "axios";

const basePaymentUrl = "http://localhost:7046/api/Payment";

// Create a new payment
export const CreatePaymentService = async (paymentData) => {
  try {
    const response = await axios.post(`${basePaymentUrl}`, paymentData);
    return response.data;
  } catch (error) {
    console.error("Error in CreatePaymentService:", error);
    throw new Error("Failed to create payment: " + error.message);
  }
};

// Get payment callback
export const GetPaymentCallbackService = async () => {
  try {
    const response = await axios.get(`${basePaymentUrl}/callback`);
    return response.data;
  } catch (error) {
    console.error("Error in GetPaymentCallbackService:", error);
    throw new Error("Failed to fetch payment callback: " + error.message);
  }
};
// Function to handle payment request
const initiatePayment = async (orderId) => {
  try {
      const response = await axios.post('https://localhost:7046/api/Payment', { orderId });
      return response.data.result;  // VnPay payment URL
  } catch (error) {
      console.error('Error initiating payment:', error);
      throw error;
  }
};


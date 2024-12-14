import axios from "axios";

// Base URL cho Order API
const baseOrderUrl = "https://localhost:7046/api/Order";

// import { getJwtToken, headers, localUrl } from "./Url";
// import axios from "axios";

// const baseOrderUrl = `${localUrl}/Order`;


// 1. Lấy danh sách tất cả các order
export const GetAllOrderService = async () => {
  try {
    const response = await axios.get(`${baseOrderUrl}`);
    return response.data; // Trả về danh sách order
  } catch (error) {
    console.error("Error in GetAllOrderService:", error);
    throw new Error("Failed to fetch all orders: " + error.message);
  }
};

// 2. Tạo một order mới
export const CreateOrderService = async (orderData) => {
  try {
    const response = await axios.post(`${baseOrderUrl}/create-order`, orderData, { timeout: 5000 }); // Gửi POST request
    return response.data; // Trả về dữ liệu order vừa được tạo
  } catch (error) {
    console.error("Error in CreateOrderService:", error);
    throw new Error("Failed to create order: " + error.message);
  }
};

// 3. Xóa một order dựa trên ID
export const DeleteOrderService = async (id) => {
  try {
    const response = await axios.delete(`${baseOrderUrl}/${id}`); // Xóa order bằng ID
    if (response.status === 200) {
      return { success: true, message: "Order deleted successfully!" };
    } else {
      return { success: false, message: "Failed to delete order." };
    }
  } catch (error) {
    console.error("Error in DeleteOrderService:", error);
    throw new Error("Failed to delete order: " + error.message);
  }
};

// 4. Lấy danh sách order của khách hàng
export const GetCustomerOrderService = async () => {
  try {
    const response = await axios.get(`${baseOrderUrl}/Customer`);
    return response.data; // Trả về danh sách order của khách hàng
  } catch (error) {
    console.error("Error in GetCustomerOrderService:", error);
    throw new Error("Failed to fetch customer orders: " + error.message);
  }
};

// 5. Cập nhật trạng thái order sang "Delivering"
export const UpdateOrderStatusDelivering = async (orderId) => {
  try {
    const response = await axios.put(
      `${baseOrderUrl}/Update-Order-Status-Delivering`,
      { orderId }
    );
    return response.data; // Trả về trạng thái cập nhật
  } catch (error) {
    console.error("Error in UpdateOrderStatusDelivering:", error);
    throw new Error("Failed to update order status to Delivering: " + error.message);
  }
};

// 6. Cập nhật trạng thái order sang "Pending Pickup"
export const UpdateOrderStatusPendingPickup = async (orderId) => {
  try {
    const response = await axios.put(
      `${baseOrderUrl}/Update-Order-Status-PendingPickUp`,
      { orderId }
    );
    return response.data;
  } catch (error) {
    console.error("Error in UpdateOrderStatusPendingPickup:", error);
    throw new Error("Failed to update order status to Pending Pickup: " + error.message);
  }
};

// 7. Cập nhật trạng thái order sang "Canceled"
export const UpdateOrderStatusCanceled = async (orderId) => {
  try {
    const response = await axios.put(
      `${baseOrderUrl}/Update-Order-Status-Canceled`,
      { orderId }
    );
    return response.data;
  } catch (error) {
    console.error("Error in UpdateOrderStatusCanceled:", error);
    throw new Error("Failed to update order status to Canceled: " + error.message);
  }
};

// 8. Cập nhật trạng thái order sang "Completed"
export const UpdateOrderStatusCompleted = async (orderId) => {
  try {
    const response = await axios.put(
      `${baseOrderUrl}/Update-Order-Status-Completed`,
      { orderId }
    );
    return response.data;
  } catch (error) {
    console.error("Error in UpdateOrderStatusCompleted:", error);
    throw new Error("Failed to update order status to Completed: " + error.message);
  }
};

// 9. Tạo Feedback cho Order
export const CreateFeedBackService = async (id, feedbackData) => {
  try {
    const response = await axios.post(
      `${baseOrderUrl}/CreateFeedBackAsync`,
      { id, ...feedbackData }
    );
    return response.data;
  } catch (error) {
    console.error("Error in CreateFeedBackService:", error);
    throw new Error("Failed to create feedback: " + error.message);
  }
};

// 10. Lấy tất cả các Order đang trong trạng thái xử lý
export const GetAllProcessingOrderService = async () => {
  try {
    const response = await axios.get(`${baseOrderUrl}/GetAllProccessingOrder`);
    return response.data; // Trả về danh sách các order đang xử lý
  } catch (error) {
    console.error("Error in GetAllProcessingOrderService:", error);
    throw new Error("Failed to fetch all processing orders: " + error.message);
  }
};

export const UpdateOrderStatus = async (status, data) => {
  try {
    const response = await axios.put(`${baseOrderUrl}/Update-Order-Status-${status}`, data);

    if (response.statusCode === 200) {
      return { isSuccess: true, message: "Order updated successfully!" };
    } else {
      return { isSuccess: false, message: "Failed to update Order ." };
    }
  } catch (error) {
    console.error('Error updating Transport Service:', error);
    throw new Error("Error updating Transport Service: " + error.message);
  }
};

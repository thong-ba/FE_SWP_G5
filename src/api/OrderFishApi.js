import axios from "axios";

// Base URL for OrderFish API
const baseOrderFishUrl = "http://localhost:7046/api/OrderFish";

// Get all orders for fish
export const GetAllOrderFishService = async () => {
  try {
    const response = await axios.get(`${baseOrderFishUrl}/GetAllOrderFish`);
    return response.data; // Return all fish orders
  } catch (error) {
    console.error("Error in GetAllOrderFishService:", error);
    throw new Error("Failed to fetch all fish orders: " + error.message);
  }
};

// Get fish order by ID
export const GetOrderFishByIdService = async (id) => {
  try {
    const response = await axios.get(`${baseOrderFishUrl}/GetAllOrderFish/${id}`);
    return response.data; // Return specific fish order
  } catch (error) {
    console.error("Error in GetOrderFishByIdService:", error);
    throw new Error("Failed to fetch fish order by ID: " + error.message);
  }
};

// Create a new order for fish
export const CreateOrderFishService = async (orderFishData) => {
  try {
    const response = await axios.post(
      `${baseOrderFishUrl}/GetCreateOrderFish`,
      orderFishData
    ); // Send POST request
    return response.data; // Return the created fish order
  } catch (error) {
    console.error("Error in CreateOrderFishService:", error);
    throw new Error("Failed to create fish order: " + error.message);
  }
};

// Update an existing order for fish
export const UpdateOrderFishService = async (orderFishData) => {
  try {
    const response = await axios.put(
      `${baseOrderFishUrl}/UpdateOrderFish`,
      orderFishData
    );
    if (response.status === 200) {
      return { success: true, message: "Fish order updated successfully!" };
    } else {
      return { success: false, message: "Failed to update fish order." };
    }
  } catch (error) {
    console.error("Error in UpdateOrderFishService:", error);
    throw new Error("Failed to update fish order: " + error.message);
  }
};

// Delete fish order by ID
export const DeleteOrderFishService = async (id) => {
  try {
    const response = await axios.delete(`${baseOrderFishUrl}/${id}`);
    if (response.status === 200) {
      return { success: true, message: "Fish order deleted successfully!" };
    } else {
      return { success: false, message: "Failed to delete fish order." };
    }
  } catch (error) {
    console.error("Error in DeleteOrderFishService:", error);
    throw new Error("Failed to delete fish order: " + error.message);
  }
};

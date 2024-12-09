import { getJwtToken, headers, localUrl } from "./Url";
import axios from "axios";

const baseOrderUrl = `${localUrl}/Order`;


export const GetAllOrders = async () => {
  try {
    const response = await axios.get(`${baseOrderUrl}`, headers);
    return response.data;

  } catch (error) {
    console.error('Error get Transport Service:', error);
    throw new Error("Error get Transport Service: " + error.message);
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
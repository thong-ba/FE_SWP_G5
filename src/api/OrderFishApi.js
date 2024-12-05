import { getJwtToken, Url, headers, localUrl } from "./Url";
import axios from "axios";


const baseAccountUrl = `${Url}/OrderFish`;
const baseLocalUrl =   `${localUrl}/OrderFish`;


export const GetAllOrderFishService = async () => {
    try {
      const response = await axios.get(`${baseLocalUrl}`, headers);
      return response.data;
  
    } catch (error) {
      console.error('Error get OrderFish Service:', error);
      throw new Error("Error get OrderFish Service: " + error.message);
    }
  };
  
  // Create a reusable function to update an account
  export const UpdateOrderFishService = async (data) => {
    try {
      const response = await axios.put(`${baseAccountUrl}`, data);
  
      if (response.status === 200) {
        return { success: true, message: "OrderFish Service updated successfully!" };
      } else {
        return { success: false, message: "Failed to update OrderFish Service." };
      }
    } catch (error) {
      console.error('Error updating OrderFish Service:', error);
      throw new Error("Error updating OrderFish Service: " + error.message);
    }
  };
  export async function CreateOrderFishService(orderFishServiceData) {
    try {
      const response = await axios.post(`${baseAccountUrl}/AddOrderFishService`, orderFishServiceData, headers); // Send POST request
      return response.data; // Return the added additionalServiceData data
    } catch (error) {
      console.error('Error adding OrderFish Service Data:', error);
      throw error; // Rethrow the error for handling in the calling function
    }
  };
  export const DeleteOrderFishService = async (id) => {
    try {
      const response = await axios.delete(`${baseAccountUrl}/${id}`);
  
      if (response.status === 200) {
        return { success: true, message: "OrderFish Service deleted successfully!" };
      } else {
        return { success: false, message: "Failed to delete OrderFish Service." };
      }
    } catch (error) {
      console.error('Error deleting OrderFish Service:', error);
      throw new Error("Error deleting OrderFish Service: " + error.message);
    }
  };
  
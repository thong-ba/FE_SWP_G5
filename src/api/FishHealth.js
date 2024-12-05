import { getJwtToken, Url, headers, localUrl } from "./Url";
import axios from "axios";


const baseAccountUrl = `${Url}/FishHealth`;
const baseLocalUrl =   `${localUrl}/FishHealth`;


export const GetAllFishHealthService = async () => {
    try {
      const response = await axios.get(`${baseLocalUrl}`, headers);
      return response.data;
  
    } catch (error) {
      console.error('Error get FishHealth Service:', error);
      throw new Error("Error get FishHealth Service: " + error.message);
    }
  };
  
  // Create a reusable function to update an account
  export const UpdateFishHealthService = async (data) => {
    try {
      const response = await axios.put(`${baseAccountUrl}`, data);
  
      if (response.status === 200) {
        return { success: true, message: "FishHealth Service updated successfully!" };
      } else {
        return { success: false, message: "Failed to update FishHealth Service." };
      }
    } catch (error) {
      console.error('Error updating FishHealth Service:', error);
      throw new Error("Error updating FishHealth Service: " + error.message);
    }
  };
  export async function CreateFishHealthionService(fishHealthServiceData) {
    try {
      const response = await axios.post(`${baseAccountUrl}/AddFFishHealthService`, fishHealthServiceData, headers); // Send POST request
      return response.data; // Return the added additionalServiceData data
    } catch (error) {
      console.error('Error adding FishHealth Service Data:', error);
      throw error; // Rethrow the error for handling in the calling function
    }
  };
  export const DeleteFishHealthService = async (id) => {
    try {
      const response = await axios.delete(`${baseAccountUrl}/${id}`);
  
      if (response.status === 200) {
        return { success: true, message: "FishHealth Service deleted successfully!" };
      } else {
        return { success: false, message: "Failed to delete FishHealth Service." };
      }
    } catch (error) {
      console.error('Error deleting FishHealth Service:', error);
      throw new Error("Error deleting FishHealth Service: " + error.message);
    }
  };
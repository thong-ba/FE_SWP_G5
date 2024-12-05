import { getJwtToken, Url, headers, localUrl } from "./Url";
import axios from "axios";


const baseAccountUrl = `${Url}/FishQualification`;
const baseLocalUrl =   `${localUrl}/FishQualification`;


export const GetAllFishQualificationService = async () => {
    try {
      const response = await axios.get(`${baseLocalUrl}`, headers);
      return response.data;
  
    } catch (error) {
      console.error('Error get FishQualification Service:', error);
      throw new Error("Error get FishQualification Service: " + error.message);
    }
  };
  
  // Create a reusable function to update an account
  export const UpdateFishQualificationService = async (data) => {
    try {
      const response = await axios.put(`${baseAccountUrl}`, data);
  
      if (response.status === 200) {
        return { success: true, message: "FishQualification Service updated successfully!" };
      } else {
        return { success: false, message: "Failed to update FishQualification Service." };
      }
    } catch (error) {
      console.error('Error updating FishQualification Service:', error);
      throw new Error("Error updating FishQualification Service: " + error.message);
    }
  };
  export async function CreateFishQualificationService(fishQualificationServiceData) {
    try {
      const response = await axios.post(`${baseAccountUrl}/AddFishQualificationService`, fishQualificationServiceData, headers); // Send POST request
      return response.data; // Return the added additionalServiceData data
    } catch (error) {
      console.error('Error adding FishQualification Service Data:', error);
      throw error; // Rethrow the error for handling in the calling function
    }
  };
  export const DeleteFishQualificationService = async (id) => {
    try {
      const response = await axios.delete(`${baseAccountUrl}/${id}`);
  
      if (response.status === 200) {
        return { success: true, message: "FishQualification Service deleted successfully!" };
      } else {
        return { success: false, message: "Failed to delete FishQualification Service." };
      }
    } catch (error) {
      console.error('Error deleting FishQualification Service:', error);
      throw new Error("Error deleting FishQualification Service: " + error.message);
    }
  };
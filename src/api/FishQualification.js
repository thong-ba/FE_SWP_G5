import { getJwtToken, Url, headers, localUrl } from "./Url";
import axios from "axios";


const baseFishQualificationUrl = "http://localhost:5141/api/FishQualification";



export const GetAllFishQualificationService = async () => {
    try {
      const response = await axios.get(`${baseFishQualificationUrl}/get-fish`);
      return response.data;
  
    } catch (error) {
      console.error('Error get FishQualification Service:', error);
      throw new Error("Error get FishQualification Service: " + error.message);
    }
  };
  

  export const UpdateFishQualificationService = async (data) => {
    try {
      const response = await axios.put(`${baseFishQualificationUrl}/Update-fishQualification`, data);
  
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
      const response = await axios.post(`${baseFishQualificationUrl}/create-fishQualification`, fishQualificationServiceData ); // Send POST request
      return response.data;
  } catch (error) {
    console.error("Error in GetCreateOrderFishService:", error);
    throw new Error("Failed to fetch create order fish data: " + error.message);
  }
  };
  export const GetFishQualificationByIdService = async (id) => {
    try {
      // Gọi API với id
      const response = await axios.get(`${baseFishQualificationUrl}/get-fish/${id}`);
      return response.data; // Trả về dữ liệu chi tiết
    } catch (error) {
      console.error("Error in GetFishQualificationByIdService:", error);
      throw new Error("Failed to fetch FishQualification by ID: " + error.message);
    }
  };
  export const DeleteFishQualificationService = async (id) => {
    try {
      const response = await axios.delete(`${baseFishQualificationUrl}/${id}`);
  
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
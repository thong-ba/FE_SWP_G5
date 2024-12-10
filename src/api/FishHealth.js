import axios from "axios";

// Base URL for FishHealth API
const baseFishHealthUrl = "http://localhost:5141/api/FishHealth";

// Get all fish health records
export const GetAllFishHealthService = async () => {
  try {
    const response = await axios.get(`${baseFishHealthUrl}/GetAllFishHealth`);
    return response.data; // Return all fish health data
  } catch (error) {
    console.error("Error in GetAllFishHealthService:", error);
    throw new Error("Failed to fetch all fish health data: " + error.message);
  }
};

// Update fish health record
export const UpdateFishHealthService = async (data) => {
  try {
    const response = await axios.put(`${baseFishHealthUrl}/UpdateFishHealth`, data);
    if (response.status === 200) {
      return { success: true, message: "Fish health record updated successfully!" };
    } else {
      return { success: false, message: "Failed to update fish health record." };
    }
  } catch (error) {
    console.error("Error in UpdateFishHealthService:", error);
    throw new Error("Failed to update fish health record: " + error.message);
  }
};

// Create a new fish health record
export const CreateFishHealthService = async (fishHealthServiceData) => {
  try {
    const response = await axios.post(
      `${baseFishHealthUrl}/CreateFishHealth`,
      fishHealthServiceData
    ); // Send POST request
    return response.data; // Return the created fish health record
  } catch (error) {
    console.error("Error in CreateFishHealthService:", error);
    throw new Error("Failed to create fish health record: " + error.message);
  }
};

// Get fish health record by ID
export const GetFishHealthByIdService = async (id) => {
  try {
    const response = await axios.get(`${baseFishHealthUrl}/GetAllFishHealth/${id}`);
    return response.data; // Return specific fish health record
  } catch (error) {
    console.error("Error in GetFishHealthByIdService:", error);
    throw new Error("Failed to fetch fish health record by ID: " + error.message);
  }
};

// Delete fish health record by ID
export const DeleteFishHealthService = async (id) => {
  try {
    const response = await axios.delete(`${baseFishHealthUrl}/${id}`);
    if (response.status === 200) {
      return { success: true, message: "Fish health record deleted successfully!" };
    } else {
      return { success: false, message: "Failed to delete fish health record." };
    }
  } catch (error) {
    console.error("Error in DeleteFishHealthService:", error);
    throw new Error("Failed to delete fish health record: " + error.message);
  }
};

import { getJwtToken, headers, localUrl } from "./Url";
import axios from "axios";

//URL For Swagger API
const baseLocalUrl = `${localUrl}/TransportService`;


// Create a reusable function to update an account
export const GetAllTransportService = async () => {
  try {
    const response = await axios.get(`${baseLocalUrl}`, headers);
    return response.data;

  } catch (error) {
    console.error('Error get Transport Service:', error);
    throw new Error("Error get Transport Service: " + error.message);
  }
};

export const GetAllLocalTransportService = async () => {
  try {
    const response = await axios.get(`${baseLocalUrl}/Local`, headers);
    return response.data;

  } catch (error) {
    console.error('Error get Transport Service:', error);
    throw new Error("Error get Transport Service: " + error.message);
  }
};
export const GetAllDomesticTransportService = async () => {
  try {
    const response = await axios.get(`${baseLocalUrl}/Domestic`, headers);
    return response.data;

  } catch (error) {
    console.error('Error get Transport Service:', error);
    throw new Error("Error get Transport Service: " + error.message);
  }
};
export const GetAllInternationalTransportService = async () => {
  try {
    const response = await axios.get(`${baseLocalUrl}/International`, headers);
    return response.data;

  } catch (error) {
    console.error('Error get Transport Service:', error);
    throw new Error("Error get Transport Service: " + error.message);
  }
};

// Create a reusable function to update an account
export const UpdateTransportService = async (data) => {
  try {
    const response = await axios.put(`${baseLocalUrl}`, data);

    if (response.status === 200) {
      return { success: true, message: "Transport Service updated successfully!" };
    } else {
      return { success: false, message: "Failed to update Transport Service." };
    }
  } catch (error) {
    console.error('Error updating Transport Service:', error);
    throw new Error("Error updating Transport Service: " + error.message);
  }
};
export const CreateTransportService = async (transportType, transportServiceData) => {
  try {
    const response = await axios.post(`${baseLocalUrl}/AddTransport${transportType}Service`, transportServiceData, headers);
    return response; // Return the added transport service data
  } catch (error) {
    console.error('Error adding Transport Service Data:', error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

// src/api/TransportServiceApi.js
export const DeleteTransportService = async (id) => {
  try {
    const response = await axios.delete(`${baseLocalUrl}`, {
      params: { id } // Pass id as a query parameter
    });

    if (response.status === 200) {
      return { success: true, message: "Transport Service deleted successfully!" };
    } else {
      return { success: false, message: "Failed to delete Transport Service." };
    }
  } catch (error) {
    console.error('Error deleting Transport Service:', error);
    throw new Error("Error deleting Transport Service: " + error.message);
  }
};


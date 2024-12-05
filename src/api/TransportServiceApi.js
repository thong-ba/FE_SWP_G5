import { getJwtToken, Url, headers, localUrl } from "./Url";
import axios from "axios";

//URL For Swagger API
const baseAccountUrl = `${Url}/TransportService`;
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

// Create a reusable function to update an account
export const UpdateTransportService = async (data) => {
  try {
    const response = await axios.put(`${baseAccountUrl}`, data);

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

export async function CreateTransportLocalService(transportServiceData) {
  try {
    const response = await axios.post(`${baseAccountUrl}/AddTransportLocalService`, transportServiceData, headers); // Send POST request
    return response.data; // Return the added additionalServiceData data
  } catch (error) {
    console.error('Error adding Transport Service Data:', error);
    throw error; // Rethrow the error for handling in the calling function
  }
}
export async function CreateTransportDomesticService(transportServiceData) {
  try {
    const response = await axios.post(`${baseAccountUrl}/AddTransportDomesticService`, transportServiceData, headers); // Send POST request
    return response.data; // Return the added additionalServiceData data
  } catch (error) {
    console.error('Error adding Transport Service Data:', error);
    throw error; // Rethrow the error for handling in the calling function
  }
}
export async function CreateTransportInternationalService(transportServiceData) {
  try {
    const response = await axios.post(`${baseAccountUrl}/AddTransportInternationalService`, transportServiceData, headers); // Send POST request
    return response.data; // Return the added additionalServiceData data
  } catch (error) {
    console.error('Error adding Transport Service Data:', error);
    throw error; // Rethrow the error for handling in the calling function
  }
}

export const DeleteTransportService = async (id) => {
  try {
    const response = await axios.delete(`${baseAccountUrl}/${id}`);

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


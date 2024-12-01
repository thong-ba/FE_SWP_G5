import { getJwtToken, Url, headers } from "./Url";
import axios from "axios";

//URL For Swagger API
const baseAccountUrl = `${Url}/additionalService`;


// Create a reusable function to update an account
export const GetAllAdditionalService = async () => {
  try {
    const response = await axios.get(`${baseAccountUrl}`, headers);
    return response.data;

  } catch (error) {
    console.error('Error updating Additional Service:', error);
    throw new Error("Error updating Additional Service: " + error.message);
  }
};

// Create a reusable function to update an account
export const UpdateAdditionalService = async (id, data) => {
  try {
    const response = await axios.put(`${baseAccountUrl}/${id}`, data);

    if (response.status === 200) {
      return { success: true, message: "Account updated successfully!" };
    } else {
      return { success: false, message: "Failed to update account." };
    }
  } catch (error) {
    console.error('Error updating Additional Service:', error);
    throw new Error("Error updating Additional Service: " + error.message);
  }
};

export async function CreateAdditionalService(additionalServiceData) {
  try {
    const response = await axios.post(`${baseAccountUrl}`, additionalServiceData, headers); // Send POST request
    return response.data; // Return the added additionalServiceData data
  } catch (error) {
    console.error('Error adding Additional Service Data:', error);
    throw error; // Rethrow the error for handling in the calling function
  }
}
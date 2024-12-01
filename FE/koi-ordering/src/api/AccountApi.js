import { getJwtToken, Url, headers } from "./Url";
import axios from "axios";

//URL For Swagger API
const baseAccountUrl = `${Url}/account`;

// Create a reusable function to update an account
export const GetAllAccount = async () => {
  try {
    const response = await axios.get(`${baseAccountUrl}`, headers);
    return response.data;

  } catch (error) {
    console.error('Error updating account:', error);
    throw new Error("Error updating account: " + error.message);
  }
};

// Create a reusable function to update an account
export const UpdateProfile = async (accountData) => {
  try {
    const response = await axios.patch(`${baseAccountUrl}/update-profile`, accountData);

    if (response.status === 200) {
      return { success: true, message: "Account updated successfully!" };
    } else {
      return { success: false, message: "Failed to update account." };
    }
  } catch (error) {
    console.error('Error updating account:', error);
    throw new Error("Error updating account: " + error.message);
  }
};
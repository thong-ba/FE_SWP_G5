import { getJwtToken, headers, localUrl, ngrokUrl } from "./Url";
import axios from "axios";

//URL For Swagger API
const baseLocalUrl = `${localUrl}/Auth`;


//Login User
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${baseLocalUrl}/login`, {
      userEmail: email,
      password: password,
    });

    if (response.data.isSuccess) {
      const token = response.data.result; // Token returned from API
      sessionStorage.setItem('token', token); // Save token to sessionStorage
      return { success: true, message: 'Login successful!' };
    } else {
      return { success: false, message: 'Login failed: ' + (response.data.errorMessage || 'Unknown error') };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error: Unable to connect to server.' };
  }
};


//Register User
export const registerUser = async (fistName, lastName, email, password, confirmPassword) => {
  const data = {
    fistName,
    lastName,
    email,
    password,
    confirmPassword,
    role: 0,
  };

  try {
    const response = await axios.post(`${baseLocalUrl}/register`, data);
    return response.data; // Return the entire response data for further processing
  } catch (error) {
    // Handle error and return a structured response
    if (error.response) {
      return { isSuccess: false, errorMessage: error.response.data.errorMessage || 'An error occurred. Please try again.' };
    } else {
      return { isSuccess: false, errorMessage: 'An error occurred. Please try again.' };
    }
  }
};

//Verify user
export const verifyUser = async (userId, verificationCode) => {
  try {
    const response = await axios.post(`${baseLocalUrl}/Verification`, { userId, verificationCode }); // Adjust the API endpoint as necessary
    return response.data; // Return the response data
  } catch (error) {
    throw new Error('An error occurred during verification. Please try again.'); // Handle error
  }
};
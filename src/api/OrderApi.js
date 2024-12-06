import { getJwtToken, headers, localUrl, ngrokUrl } from "./Url";
import axios from "axios";

const baseOrderUrl = `${ngrokUrl}/Order`;


export const GetAllOrders = async () => {
  try {
    const response = await axios.get(`${baseOrderUrl}`, headers);
    return response.data;

  } catch (error) {
    console.error('Error get Transport Service:', error);
    throw new Error("Error get Transport Service: " + error.message);
  }
};
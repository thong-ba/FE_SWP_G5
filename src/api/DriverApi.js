import { getJwtToken, headers, localUrl } from "./Url";
import axios from "axios";

//URL For Swagger API
const baseLocalUrl = `${localUrl}/Driver`;

export const GetAllDriver = async () => {
  try {
    const response = await axios.get(`${baseLocalUrl}/GetAllDrivers`, headers);
    return response.data;

  } catch (error) {
    console.error('Error get Driver :', error);
    throw new Error("Error get Driver : " + error.message);
  }
};
import { getJwtToken, headers, localUrl } from "./Url";
import axios from "axios";

const baseRoutUrl = `${localUrl}/Route`;

export const GetAllRoutes = async () => {
  try {
    const response = await axios.get(`${baseRoutUrl}`, headers);
    return response.data;

  } catch (error) {
    console.error('Error get Route Service:', error);
    throw new Error("Error get Route Service: " + error.message);
  }
};

export const CreateRoute = async (routeRequest, routeStopRequests) => {
  const requestBody = {
    routeRequest: {
      notes: routeRequest.notes,
      driverId: routeRequest.driverId,
    },
    routeStopRequests: routeStopRequests,
  };

  try {
    const response = await axios.post(`${baseRoutUrl}`, requestBody, headers);
    return response.data;
  } catch (error) {
    console.error('Error creating Route:', error);
    throw new Error("Error creating Route: " + error.message);
  }
};

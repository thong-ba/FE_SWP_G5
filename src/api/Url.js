import { jwtDecode } from "jwt-decode";

// URLs
const Url = "https://67040f16ab8a8f892732c8b7.mockapi.io/";
const localUrl = "https://localhost:7046/api";
const ngrokUrl = "https://bd85-115-73-106-242.ngrok-free.app/api";
const getallorderfishUrl = "http://localhost:7046/api/OrderFish/GetAllOrderFish";

// Function to get JWT Token from sessionStorage
const getJwtToken = () => {
  const token = sessionStorage.getItem("token");
  return token;
};

// Reusable checkToken function to validate the token and extract role
const checkToken = () => {
  const token = getJwtToken();

  if (!token) {
    return { isValid: false, userRole: null };
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp > currentTime) {
      // Find the Role key dynamically in the decoded token
      const roleKey = Object.keys(decoded).find((key) =>
        key.toLowerCase().includes("role")
      );

      const userRole = decoded[roleKey] || null;
      return { isValid: true, userRole };
    } else {
      sessionStorage.removeItem("token");
      return { isValid: false, userRole: null };
    }
  } catch (error) {
    console.error("Token decoding failed:", error);
    sessionStorage.removeItem("token");
    return { isValid: false, userRole: null };
  }
};

// Function to dynamically generate headers including the user role
const getHeaders = () => {
  const token = getJwtToken();
  const { userRole } = checkToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // Attach token if available
    Role: userRole || "", // Attach user role if available
  };
};
const headers = {
  "Content-Type": "application/json",
  // Add headers such as Authorization if required
  'Authorization': `Bearer ${getJwtToken()}`, // Updated to use the actual token
};
// Export all constants and functions
export {
  headers,
  Url,
  localUrl,
  ngrokUrl,
  getJwtToken,
  checkToken,
  getHeaders, // Dynamic headers function
};

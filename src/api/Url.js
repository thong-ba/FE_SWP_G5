const Url = "https://67040f16ab8a8f892732c8b7.mockapi.io/";
const localUrl = "https://localhost:7046/api";
const ngrokUrl = "https://bd85-115-73-106-242.ngrok-free.app/api";
const getallorderfishUrl = "http://localhost:5141/api/OrderFish/GetAllOrderFish";
const getJwtToken = () => {
  const token = sessionStorage.getItem("accessToken")
  return token
}

const headers = {
  "Content-Type": "application/json",
  // Add headers such as Authorization if required
  'Authorization': `Bearer ${getJwtToken()}`, // Updated to use the actual token
};


export { headers, Url, getJwtToken, localUrl, ngrokUrl };

const Url = "https://67040f16ab8a8f892732c8b7.mockapi.io/";
const getJwtToken = () => {
  const token = sessionStorage.getItem("accessToken")
  return token
}

const headers = {
  "Content-Type": "application/json",
  // Add headers such as Authorization if required
  'Authorization': `Bearer ${getJwtToken()}`, // Updated to use the actual token
};


export { headers, Url, getJwtToken };

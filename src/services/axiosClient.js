import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BE_BASE_URL,
    headers: {},
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");
        console.log("Retrieved token from Cookies:", token);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        console.log("Request headers with token:", config.headers);

        return config;
    },
    (error) => {
        console.error("Request interceptor error", error);
        return Promise.reject(error);
    }
);

axiosClient.interceptors.request.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log("error", error);
    if (error.response) {
      if (error.response.status === 400) {
        toast.error(error.response.data.Message);
      } else if (error.response.status === 401) {
        window.location.href = "/login";
      } else if (error.response.status >= 404 && error.response.status < 500) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.Message,
        });
      } else if (error.response.status >= 500 && error.response.status < 600) {
        // Handle server errors (e.g., show a notification)
        // toast.error("Server error");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.statusText,
        });
      }
    } else if (error.request) {
      // Handle network errors (e.g., no internet connection)
      // toast.error("Network error");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Network error",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An unexpected error occurred",
      });
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
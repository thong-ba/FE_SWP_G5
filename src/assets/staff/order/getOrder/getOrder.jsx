import axios from "axios";

const getPendingOrder = async () => {
    try {
        const response = await axios.get("https://localhost:7046/api/Order/GetAllProccessingOrder", {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data.result;
    }
    catch (error) {
        console.error("Error fetching pending orders:", error);
        return null;
    }
};

const getPendingPickUpOrder = async () => {
    try {
        const response = await axios.get("https://localhost:7046/api/Order/GetAllPendingPickUpOrderAsync", {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data.result;
    }
    catch (error) {
        console.error("Error fetching pending pick up orders:", error);
        return null;
    }
};

const getCompletedOrder = async () => {
    try {
        const response = await axios.get("https://localhost:7046/api/Order/GetAllCompletedOrderAsync", {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data.result;
    }
    catch (error) {
        console.error("Error fetching completed orders:", error);
        return null;
    }
};

const getCancelOrder = async () => {
    try {
        const response = await axios.get("https://localhost:7046/api/Order/GetAllCanceledOrderAsync", {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data.result;
    }
    catch (error) {
        console.error("Error fetching cancel orders:", error);
        return null;
    }
};

export { getPendingOrder, getPendingPickUpOrder, getCompletedOrder, getCancelOrder }
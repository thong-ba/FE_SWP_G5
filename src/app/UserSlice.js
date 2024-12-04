import axiosClient from "../services/axiosClient";
import Cookies from "js-cookie";
import {API_LOGIN,
    API_REGISTER
} from "./../constant";
import { fa0 } from "@fortawesome/free-solid-svg-icons";

const initialState = {
    isLoading: false,
    error: null,
    userProfile: null,
    userInfo: null,
    auth: false,
    response: null,
    userId: null,
}

const setLoading = (set, isLoading) => set({ isLoading });
const setError = (set, error) => set ({ error: { message: error.message, code: error.code } });

export const createUserSlice = (set) => ({
    ...initialState,

    setAuth: (auth) => set({ auth }),

    setUserId: (id) => set({ userId: id}),

    logout: () => {
        localStorage.clear();
        sessionStorage.clear();
        Cookies.remove("token");
        set({
            auth: false,
            error: null,
            userProfile: null,
            userInfo: null,
            userId: null,
        });
    },
    
    postLogin: async (form) => {
        setLoading(set, true);
        try {
            console.log("Calling API with form data:", form);
            const { data } = await axiosClient.post(API_LOGIN, form);
            console.log("API response:", data);
            set({ userInfo: data });
            set({ auth: true });
        } 
        catch (error) {
            console.error("API error:", error);
            setError(set, error);
        }
        finally {
            setLoading(set, false)
        }
    },
})
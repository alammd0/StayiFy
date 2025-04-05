import axios from "axios";
import { BACKEND_URL } from "./backendURL";

// Create axios instance
export const instance = axios.create({
    baseURL: BACKEND_URL + "/api/v1"
});

// API Connector Function
export const apiConnector = async (url: string, method: string, data?: any, headers: any = {}) => {
    try {
        const response = await instance({
            url,
            method,
            data: data || null,
            headers: { ...headers },
        });

        return response;
    }
    catch (err) {
        console.log("API Error:", err);
        return err;
    }
};

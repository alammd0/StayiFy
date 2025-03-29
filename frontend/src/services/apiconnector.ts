// Api connector function here
import axios from "axios";
import { BACKEND_URL } from "./backendURL";

// create axios instance
export const instance = axios.create({
    baseURL: BACKEND_URL + "/api/v1"
})

// create function to connection
export const apiConnector = async (url: string, method: string, data: any, headers?: any, params?: any) => {
    try {

        console.log("url : " + url);
        console.log("method : " + method);
        console.log("data : " + data);
        console.log("headers : " + headers);
        console.log("params : " + params);

        const response = await instance({
            url: url,
            method: method,
            data: data || null,
            headers: headers || null,
            params: params || null
        });

        return response;

    }
    catch (err) {
        console.log(err);
        return err;
    }
}
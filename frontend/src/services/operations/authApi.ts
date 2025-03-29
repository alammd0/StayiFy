// all auth function here
import { toast } from "react-hot-toast"
import { setLoading, setToken, setUser } from "../../redux/slices/authSlice"
import { apiConnector } from "../apiconnector"
import { authEndpoints } from "../../services/apis"


const {
    SIGNUP_API,
    LOGIN_API
} = authEndpoints


interface SignupParams {
    username: string;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    accountType: string;
    navigate: (path: string) => void;
}

interface loginInput {
    email: string
    password: string
    navigate: (path: string) => void;
}


export const signup = ({ username, name, email, password, phoneNumber, accountType, navigate }: SignupParams) => {
    return async (dispatch: any) => {
        const toastId = toast.loading("Please wait...");
        dispatch(setLoading(true));

        try {
            console.log("Sending User Data:", { username, name, email, password, phoneNumber, accountType });

            const response: any = await apiConnector(SIGNUP_API, "POST", { username, name, email, password, phoneNumber, accountType });

            console.log("Resopose : " + response)

            if (!response || !response.data) {
                throw new Error("Invalid API response");
            }

            console.log("Signup Response:", response.data);

            dispatch(setUser(response.data.data));
            dispatch(setToken(response.data.token));

            toast.dismiss(toastId);
            toast.success("Signup Successful");
            navigate("/login");
        }
        catch (err: any) {
            console.error("Signup Error:", err);

            if (err.response) {
                console.error("Error Response Data:", err.response.data);
                console.error("Error Status Code:", err.response.status);
            } else {
                console.error("Error Message:", err.message);
            }

            toast.dismiss(toastId);
            const errorMessage = err.response?.data?.message || "Signup Failed";
            toast.error(errorMessage);
        }

        dispatch(setLoading(false));
    };
};



// login
export const login = ({ email, password, navigate }: loginInput) => {
    return async (dispatch: any) => {
        const toastId = toast.loading("Please wait...");
        dispatch(setLoading(true));
        try {

            const response: any = await apiConnector(LOGIN_API, "POST", { email, password });

            console.log("Resopose : " + response)

            if (!response || !response.data) {
                throw new Error("Invalid API response");
            }

            console.log("response Inside login : ", response.data);

            dispatch(setUser(response.data.data));
            dispatch(setToken(response.data.token));

            toast.dismiss(toastId);
            toast.success("LoginSuccessful");
            navigate("/home");
        }
        catch (err) {
            console.log(err);
            toast.error("Login Failed", { id: toastId });
            dispatch(setLoading(false));
        }
        dispatch(setLoading(false));
    }
}

export const logout = (navigate: any) => {
    return async (dispatch: any) => {
        dispatch(setUser(null));
        dispatch(setToken(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logout Successfull");
        navigate("/login");
    }
}
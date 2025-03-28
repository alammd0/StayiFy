// all auth function here
import { toast } from "react-hot-toast"
import { setLoading, setToken, setUser } from "../../redux/slices/authSlice"
import { apiConnector } from "../apiconnector"
import { authEndpoints } from "../../services/apis"


const {
    SIGNUP_API,
    LOGIN_API
} = authEndpoints


interface signupInput {
    username: string,
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
    navigate: any
}

// signup
export const signup = ({ username, name, email, password, phoneNumber, navigate }: signupInput) => {
    return async (dispatch: any) => {
        const toastId = toast.loading("Please wait...");
        dispatch(setLoading(true));
        try {

            const response: any = await apiConnector(SIGNUP_API, "POST", { username, name, email, password, phoneNumber });

            console.log("response : ", response.data);

            console.log("response : ", response.data.succes);

            if (!response.data.success) throw new Error(response.data.message);

            dispatch(setUser(response.data.user));
            dispatch(setToken(response.data.token));
            toast.success("Signup Successfull", { id: toastId });
            navigate("/login");

        }
        catch (err) {
            console.log(err);
            toast.error("Signup Failed", { id: toastId });
            dispatch(setLoading(false));
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

// login
export const login = ({ email, password, navigate }: signupInput) => {
    return async (dispatch: any) => {
        const toastId = toast.loading("Please wait...");
        dispatch(setLoading(true));
        try {

            const response: any = await apiConnector(LOGIN_API, "POST", { email, password });

            console.log("response : ", response.data);

            console.log("response : ", response.data.succes);

            if (!response.data.success) throw new Error(response.data.message);

            dispatch(setUser(response.data.user));
            dispatch(setToken(response.data.token));
            toast.success("Login Successfull", { id: toastId });
            navigate("/home");


        }
        catch (err) {
            console.log(err);
            toast.error("Login Failed", { id: toastId });
            dispatch(setLoading(false));
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
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
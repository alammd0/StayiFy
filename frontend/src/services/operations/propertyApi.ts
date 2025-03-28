// all property function here
import { toast } from "react-hot-toast"
import { setLoading } from "../../redux/slices/authSlice"
import { apiConnector } from "../apiconnector"
import { propertyEndpoints } from "../../services/apis"
import { setProperty, setUpdatedProperty } from "../../redux/slices/propertySlice"

const {
    CREATE_PROPERTY_API,
    GET_ALL_PROPERTY_API,
    GET_PROPERTY_BY_ID_API,
    UPDATE_PROPERTY_API,
    DELETE_PROPERTY_API
} = propertyEndpoints

// create property
export const createProperty = (data: any, token: string, navigate: any) => {
    return async (dispatch: any) => {
        const toastId = toast.loading("Please wait...");
        dispatch(setLoading(true));
        try {
            const response: any = await apiConnector(CREATE_PROPERTY_API, "POST", data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            console.log("response : ", response.data);

            console.log("Create-course response: ", response.data.succes);

            if (!response.data.success) throw new Error(response.data.message);
            dispatch(setProperty(response.data.data));
            dispatch(setLoading(false));
            navigate("/all-property");
            toast.success("Create Property Successfull", { id: toastId });
        }
        catch (err) {
            console.log(err);
            toast.error("Create Property Failed", { id: toastId });
            dispatch(setLoading(false));
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

// get all property
export const getAllProperty = (navigate: any) => {
    return async (dispatch: any) => {
        const toastId = toast.loading("Please wait...");
        let result = [];
        dispatch(setLoading(true));
        try {
            const response: any = await apiConnector(GET_ALL_PROPERTY_API, "GET", null);

            console.log("inside get all property response : ", response.data);
            console.log("inside get all property response : ", response.data.succes);

            if (!response.data.success) throw new Error(response.data.message);

            result = response.data.data;
            dispatch(setLoading(false));
            navigate("/home");
            toast.success("Get All Property Successfull", { id: toastId });
        }
        catch (err) {
            console.log(err);
            toast.error("Get All Property Failed", { id: toastId });
            dispatch(setLoading(false));
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
        return result;
    }
}

// get property by id
export const getPropertyById = (id: any, navigate: any) => {
    return async (dispatch: any) => {
        const toastId = toast.loading("Please wait...");
        let result = [];
        dispatch(setLoading(true));
        try {

            const response: any = await apiConnector(`${GET_PROPERTY_BY_ID_API}/${id}`, "GET", null);
            console.log("inside get property by id response : ", response.data);
            console.log("inside get property by id response : ", response.data.succes);

            if (!response.data.success) throw new Error(response.data.message);
            result = response.data.data;
            dispatch(setLoading(false));
            navigate("/propert-detail/:id");
            toast.success("Get Property By Id Successfull", { id: toastId });
        }
        catch (err) {
            console.log(err);
            toast.error("Get Property By Id Failed", { id: toastId });
            dispatch(setLoading(false));
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
        return result;
    }
}

// update property
export const updateProperty = (data: any, token: string, navigate: any) => {
    return async (dispatch: any) => {
        const toastId = toast.loading("Please wait...");
        dispatch(setLoading(true));
        try {
            const response: any = await apiConnector(UPDATE_PROPERTY_API, "PUT", data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            console.log("response inside update course : " + response.data);
            console.log("Success reponse inside update course : " + response.data.succes);

            if (!response.data.success) throw new Error(response.data.message);

            dispatch(setUpdatedProperty(response.data.data));
            dispatch(setLoading(false));
            navigate("/all-property");
            toast.success("Update Property Successfull", { id: toastId });
        }
        catch (err) {
            console.log(err);
            toast.error("Update Property Failed", { id: toastId });
            dispatch(setLoading(false));
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


// delete property
export const deleteProperty = (id: any, data: any, token: string, navigat: any) => {
    return async (dispatch: any) => {
        const toastId = toast.loading("Please wait...");
        dispatch(setLoading(true));

        try {
            const response: any = await apiConnector(`${DELETE_PROPERTY_API}/${id}`, "DELETE", data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            console.log("response inside delete course : " + response.data);
            console.log("Success reponse inside delete course : " + response.data.succes);

            if (!response.data.success) throw new Error(response.data.message);

            dispatch(setLoading(false));
            navigat("/all-property");
            toast.success("Delete Property Successfull", { id: toastId });

        }
        catch (err) {
            console.log(err);
            toast.error("Delete Property Failed", { id: toastId });
            dispatch(setLoading(false));
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


// all property function here
import { toast } from "react-hot-toast"
import { setLoading } from "../../redux/slices/authSlice"
import { apiConnector } from "../apiconnector"
import { propertyEndpoints } from "../../services/apis"
import { setProperty, setUpdatedProperty } from "../../redux/slices/propertySlice"
import { setDetails } from "../../redux/slices/myProperty"

const {
    CREATE_PROPERTY_API,
    GET_ALL_PROPERTY_API,
    GET_PROPERTY_BY_ID_API,
    UPDATE_PROPERTY_API,
    DELETE_PROPERTY_API,
    PROPERTY_DETAILS_BY_USERID
} = propertyEndpoints

interface createPropertyParams {
    title: string;
    description: string;
    price: number;
    location: string;
    image: File | null;
    navigate: (path: string) => void;
    token: string | null;
}


// create property(Uses)
export const createProperty = ({ title, description, price, location, image, navigate, token }: createPropertyParams) => {
    return async (dispatch: any) => {

        if (!token) {
            toast.error("Authentication token is missing. Please log in.");
            return navigate("/login");
        }

        const toastId = toast.loading("Creating Property...");
        dispatch(setLoading(true));

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", price.toString());
            formData.append("location", location);


            if (image instanceof File) {
                formData.append("image", image);
            } else {
                console.error("Invalid file format");
                toast.error("Invalid file format. Please select a valid image.");
                return;
            }

            const response: any = await apiConnector(
                CREATE_PROPERTY_API,
                "POST",
                formData,
                {
                    Authorization: `Bearer ${token}`,
                }
            );

            console.log("response iside create property:", response?.data);

            if (!response.data) throw new Error(response.data);
            dispatch(setProperty(response.data.data));
            toast.success("Property created successfully!");
            navigate("/dashboard/my-properties");
        } catch (err) {
            console.error(err);
            toast.error("Create Property Failed");
        } finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    };
};


// get all property
export const getAllProperty = () => {
    return async (dispatch: any) => {
        const toastId = toast.loading("Please wait...");
        dispatch(setLoading(true));
        try {

            const response: any = await apiConnector(GET_ALL_PROPERTY_API, "GET", null);

            if (!response.data) throw new Error(response.data.message);
            dispatch(setLoading(false));
            toast.dismiss(toastId);
            toast.success("Get Property By Id Successful");
            return response.data;
        }
        catch (err) {
            console.log(err);
            toast.dismiss(toastId);
            toast.error("Get Property By Id Failed");
            dispatch(setLoading(false));
        }
    }
}

// get property by id
export const getPropertyById = (id: number, token: string) => {
    return async (dispatch: any) => {
        const toastId = toast.loading("Please wait...");
        dispatch(setLoading(true));

        try {
            const response: any = await apiConnector(`${GET_PROPERTY_BY_ID_API}/${id}`, "GET",
                null,
                {
                    Authorization: `Bearer ${token}`,
                }
            );

            if (!response.data) throw new Error(response.data.message);
            dispatch(setLoading(false));
            toast.success("Get Property By Id Successful");
            toast.dismiss(toastId);
            return response.data;
        } catch (err) {
            console.log(err);
            toast.error("Get Property By Id Failed");
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    };
};

// update property
export const updateProperty = (token: string, id: number, propertyData: any, navigate: any) => {

    // console.log("inside api : ", number(id))

    return async (dispatch: any) => {

        const toastId = toast.loading("Please wait...");
        dispatch(setLoading(true));
        try {
            const response: any = await apiConnector(`${UPDATE_PROPERTY_API}/${id}`, "PUT", propertyData,
                {
                    Authorization: `Bearer ${token}`
                }
            )

            console.log("response inside update course : " + response.data);

            if (!response.data.success) throw new Error(response.data.message);

            dispatch(setUpdatedProperty(response.data.data));
            dispatch(setLoading(false));
            navigate("/dashboard/my-properties");
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

export const getMypropertyDetails = (token: string | null) => {
    return async (dispatch: any) => {
        console.log("token : ", token);
        const toastId = toast.loading("Please wait...");
        dispatch(setLoading(true));
        try {
            const response: any = await apiConnector(
                PROPERTY_DETAILS_BY_USERID,
                "GET",
                null,
                {
                    Authorization: `Bearer ${token}`,
                }
            );

            if (!response.data) throw new Error(response.data.message);
            dispatch(setDetails(response.data));
            dispatch(setLoading(false));
            toast.success("Get Property By Id Successfull");
            return response;
        }
        catch (err) {
            console.log(err);
            dispatch(setLoading(false));
            toast.error("Get Property By Id Failed");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}
// all auth function here  
import { ratingandreviewEndpoints } from "../../services/apis";
import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";
import { setLoading } from "../../redux/slices/authSlice";
import { setRating } from "../../redux/slices/ratingSlice";

const {
    CREATE_RATING_API,
    GET_ALL_RATING_API
} = ratingandreviewEndpoints


interface ratingData {
    userId: number,
    propertyId: number,
    rating: number
    comment: string
    token: string,
    navigate: (path: string) => void;
}

// create rating
export const createRating = ({ userId, propertyId, rating, comment, token, navigate }: ratingData) => {
    return async (dispatch: any) => {
        const toastid = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response: any = await apiConnector(CREATE_RATING_API, "POST", { userId, propertyId, rating, comment },
                {
                    Authorization: `Bearer ${token}`,
                }
            )

            console.log("Response:", response.data.data);

            if (!response.data) throw new Error(response.data.message);

            dispatch(setRating(response.data.data));
            dispatch(setLoading(false));
            toast.success("Rating created successfully");
            navigate("/");
        }
        catch (err) {
            dispatch(setLoading(false));
            toast.error("Rating creation failed");
            console.error(err);
            return {
                error: err
            }
        }
        dispatch(setLoading(false));
        toast.dismiss(toastid);
    }
}

// get all rating
export const getAllRating = async (propertyId: number, token: string) => {
    return async (dispatch: any) => {
        const toastid = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response: any = await apiConnector(`${GET_ALL_RATING_API}/${propertyId}`, "GET", null, {
                Authorization: `Bearer ${token}`,
            })

            console.log("Responsed inside get raiting : " + response.data.data);

            if (!response.data) throw new Error(response.data.message);

            dispatch(setLoading(false));
            toast.success("Rating fetched successfully");
            return response.data;
        }
        catch (err) {
            dispatch(setLoading(false));
            toast.error("Rating creation failed");
            console.error(err);
            return {
                error: err
            }
        }
        dispatch(setLoading(false));
        toast.dismiss(toastid);
    }
}
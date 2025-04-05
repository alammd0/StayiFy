import { toast } from "react-hot-toast";
import { setLoading } from "../../redux/slices/authSlice";
import { apiConnector } from "../apiconnector";
import { bookingEndpoints } from "../../services/apis";
import { setBookings } from "../../redux/slices/bookingSlice";

const {
    CREATE_BOOKING_API,
    VERIFY_PAYMENT_API,
    GET_BOOKING_API,
    DELETE_BOOKING_API,
    ALL_DELETE_BOOKING_API
} = bookingEndpoints;

type FormData = {
    userId: number;
    propertyId: number;
    totalPrice: number;
    startDate: Date | string;
    endDate: Date | string;
    token: string;
    navigate: (path: string) => void;
};

interface deleteBookingData {
    token: string;
    bookingId: number;
    navigate: (path: string) => void
}


function loadScript(src: string) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

// Booking Function
export const createBooking = ({ userId, propertyId, totalPrice, startDate, endDate, token, navigate }: FormData) =>
    async (dispatch: any) => {
        const toastId = toast.loading("Please wait...");
        dispatch(setLoading(true));

        try {
            // Format Dates
            const formattedStartDate = typeof startDate === "string" ? startDate : startDate.toISOString().split("T")[0];
            const formattedEndDate = typeof endDate === "string" ? endDate : endDate.toISOString().split("T")[0];

            // console.log("Formatted Start Date:", formattedStartDate);
            // console.log("Formatted End Date:", formattedEndDate);

            // Load Razorpay SDK
            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
            if (!res) {
                toast.error("Razorpay SDK failed to load. Are you online?");
                return;
            }

            // Send Booking Request to Backend
            const response: any = await apiConnector(
                CREATE_BOOKING_API,
                "POST",
                {
                    userId,
                    propertyId,
                    totalPrice: totalPrice,
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                },
                {
                    Authorization: `Bearer ${token}`,
                }
            );

            // console.log("API Response:", response.data);

            // Validate API Response
            if (!response.data || !response.data.orderId) {
                throw new Error("Invalid response from server. Order ID missing.");
            }

            // console.log("Booking Created Successfully:", response.data.data);

            dispatch(setBookings(response.data.data));

            // Extract payment details safely
            const { orderId } = response.data || {};
            // console.log("Order ID:", orderId);
            const { price } = response.data.data || {};
            // console.log("Tola Price:", price);

            if (!price || !orderId) {
                throw new Error("Invalid payment data received from server.");
            }

            // Setup Razorpay payment options
            const options = {
                key: "rzp_test_iW9xjCLsefmddP",
                currency: "INR",
                amount: `${price * 100}`,
                order_id: `${orderId}`,
                name: "Stayify",
                description: "Thank You for your order",
                handler: async (paymentResponse: any) => {
                    // Verify Payment
                    const verifyResponse: any = await apiConnector(
                        VERIFY_PAYMENT_API,
                        "POST",
                        {
                            razorpayOrderId: orderId,
                            razorpayPaymentId: paymentResponse.razorpay_payment_id,
                            razorpaySignature: paymentResponse.razorpay_signature,
                        },
                        {
                            Authorization: `Bearer ${token}`,
                        }
                    );

                    console.log("Payment Verification Response:", verifyResponse.data);

                    if (!verifyResponse.data) {
                        throw new Error(verifyResponse.data.message);
                    }

                    // Redirect to Bookings Page
                    toast.success("Payment Successful");
                    navigate(`/dashboard/my-booking/${userId}`);
                },
            };

            // Open Razorpay Payment Window
            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (err: any) {
            console.error("Error:", err.message);
            toast.error(err.message || "Payment Failed");
        } finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
};


// Get all bookings for a user
export const getBooking = (token: string, userId: number) => {

    return async (dispatch: any) => {

        const toastid = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            const response: any = await apiConnector(
                `${GET_BOOKING_API}/${userId}`,
                "GET",
                null,
                {
                    Authorization: `Bearer ${token}`,
                }
            );

            // console.log("Response:", response.data.data);

            if (!response.data) throw new Error(response.data.message);

            dispatch(setLoading(false));
            toast.success("Booking fetched successfully");
            return response.data;

        }
        catch (err) {
            console.log(err);
            toast.error("Error fetching booking details");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastid);
    }
}

// delete single booking
export const deleteSingleBooking = ({ token, bookingId, navigate}: deleteBookingData) => {

    console.log("Booking Id inside deleteSingleBooking: ",  bookingId);

    return async (dispatch: any) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {

            const response: any = await apiConnector(
                `${DELETE_BOOKING_API}`,
                "DELETE",
                {
                    id: bookingId
                },
                {
                    Authorization: `Bearer ${token}`,
                }
            );

            console.log("Response booking Delete : " + response);

            console.log("Resoponse booking Delete : " + response.data);

            if (!response.data) throw new Error(response.data.message);

            dispatch(setLoading(false));
            toast.dismiss(toastId);
            toast.success("Booking Deleted Successfully");
            navigate("/");
        }
        catch (err) {
            console.log(err);
            toast.dismiss(toastId);
            toast.error("Error deleting Booking");
        }
    }
}


// delete all booking 
export const deleteAllBooking = (token: string, userId: number, navigate: (path: string) => void) => {
    console.log("Booking Id inside deleteAllBooking: ", userId);
    return async (dispatch: any) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {

            const response: any = await apiConnector(
                `${ALL_DELETE_BOOKING_API}/${userId}`,
                "DELETE",
                null,
                {
                    Authorization: `Bearer ${token}`,
                }
            )

            console.log("Response : " + response.data);

            dispatch(setLoading(false));
            toast.dismiss(toastId);
            toast.success("All Booking Deleted Successfully");
            navigate("/");
        }
        catch (err) {
            console.log(err);
            toast.dismiss(toastId);
            toast.error("Error deleting All Booking");
        }
    }
}

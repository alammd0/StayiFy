// write all End Points here
import { BACKEND_URL } from "./backendURL";

// auth endpoints
export const authEndpoints = {
    SIGNUP_API: `${BACKEND_URL}/api/v1/auth/signup`,
    LOGIN_API: `${BACKEND_URL}/api/v1/auth/login`
}


// propertyendpoints
export const propertyEndpoints = {
    CREATE_PROPERTY_API: `${BACKEND_URL}/api/v1/property/create-property`,
    GET_ALL_PROPERTY_API: `${BACKEND_URL}/api/v1/property/all-property`,
    GET_PROPERTY_BY_ID_API: `${BACKEND_URL}/api/v1/property/property-detail`,
    UPDATE_PROPERTY_API: `${BACKEND_URL}/api/v1/property/update-property`,
    DELETE_PROPERTY_API: `${BACKEND_URL}/api/v1/property/delete-property`,
    PROPERTY_DETAILS_BY_USERID: `${BACKEND_URL}/api/v1/property/my-property`
}


// booking endpoints
export const bookingEndpoints = {
    CREATE_BOOKING_API: `${BACKEND_URL}/api/v1/booking/create-booking`,
    VERIFY_PAYMENT_API: `${BACKEND_URL}/api/v1/booking/verify-payment`,
    GET_BOOKING_API: `${BACKEND_URL}/api/v1/booking/get-booking`,
    DELETE_BOOKING_API: `${BACKEND_URL}/api/v1/booking/delete-booking`,
    ALL_DELETE_BOOKING_API: `${BACKEND_URL}/api/v1/booking/delete-all-booking`
}


// rating endpoints
export const ratingandreviewEndpoints = {
    CREATE_RATING_API: `${BACKEND_URL}/api/v1/rating/create-rating`,
    GET_ALL_RATING_API: `${BACKEND_URL}/api/v1/rating/get-rating`
}
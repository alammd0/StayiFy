// write all End Points here
import { BACKEND_URL } from "./backendURL";

// auth endpoints
export const authEndpoints = {
    SIGNUP_API : `${BACKEND_URL}/api/v1/auth/signup`,
    LOGIN_API : `${BACKEND_URL}/api/v1/auth/login` 
}


// propertyendpoints
export const propertyEndpoints = {
    CREATE_PROPERTY_API : `${BACKEND_URL}/api/v1/property/create-property`,
    GET_ALL_PROPERTY_API : `${BACKEND_URL}/api/v1/property/all-property`,
    GET_PROPERTY_BY_ID_API : `${BACKEND_URL}/api/v1/propert-detail`,
    UPDATE_PROPERTY_API : `${BACKEND_URL}/api/v1/property/update-property`,
    DELETE_PROPERTY_API : `${BACKEND_URL}/api/v1/property/delete-property`
}
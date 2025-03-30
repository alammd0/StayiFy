import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import propertyReducer from "../slices/propertySlice";
import propertyDetaReducer from "../slices/myProperty"

const loadState = () => {
    try {
        const savedState = localStorage.getItem("reduxState");
        return savedState ? JSON.parse(savedState) : undefined;
    } catch (error) {
        console.error("Failed to load state", error);
        return undefined;
    }
};

const saveState = (state: RootState) => {
    try {
        const token = state.auth?.token || '';
        localStorage.setItem(
            "reduxState",
            JSON.stringify({ auth: state.auth ? { user: state.auth.user, token } : {} })
        );
    } catch (error) {
        console.error("Failed to save state", error);
    }
};

export const store = configureStore(
    {
        reducer: {
            // @ts-ignore
            auth: authReducer,
            property: propertyReducer,
            details: propertyDetaReducer
        },

        preloadedState: loadState(),
    }
)

// Save state on every change
store.subscribe(() => saveState(store.getState()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store
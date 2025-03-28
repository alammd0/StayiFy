import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface authState {
    user: string | null,
    loading: boolean,
    token: string | null,
    error: string | null
}

// initial state
const initialState: authState = {
    user: null,
    loading: false,
    token: localStorage.getItem('token') || null,
    error: null
}

// create slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<string | null>) {
            state.user = action.payload
        },

        setToken(state, action: PayloadAction<string | null>) {
            state.token = action.payload
        },

        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
    },
});

export const { setUser, setToken, setLoading } = authSlice.actions;
export default authSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface myPropertyState {
    details: any[];
    loading: boolean;
    error: string | null;
}


// initilize state
const initialState: myPropertyState = {
    details: [],
    loading: false,
    error: null
}

// create slice
const myPropertySlice = createSlice({
    name: 'details',
    initialState,
    reducers: {
        setDetails(state, action: PayloadAction<any[]>) {
            state.details = action.payload
        },

        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload
        },
    }
})


export const { setDetails, setLoading, setError } = myPropertySlice.actions;
export default myPropertySlice.reducer;


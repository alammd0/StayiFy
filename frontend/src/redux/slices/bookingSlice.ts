import { createSlice, PayloadAction } from '@reduxjs/toolkit'


type initialState = {
    bookings: any[],
    loading: boolean,
}

const initialState: initialState = {
    bookings: [],
    loading: false,
}

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setBookings: (state, action: PayloadAction<any>) => {
            state.bookings = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    }
})

export const { setBookings, setLoading } = bookingSlice.actions
export default bookingSlice.reducer 
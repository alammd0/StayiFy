import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RatingAndReview {
    userId: number;
    propertyId: number;
    rating: number;
    comment: string;
}

interface RatingAndReviewArray {
    rating: RatingAndReview[];
}

const initialState: RatingAndReviewArray = {
    rating: [],
}

// create slice ;

const ratingSlice = createSlice({
    name: "rating",
    initialState,
    reducers: {
        setRating: (state, action: PayloadAction<RatingAndReview>) => { state.rating.push(action.payload) }
    }
})


export const { setRating } = ratingSlice.actions;
export default ratingSlice.reducer;

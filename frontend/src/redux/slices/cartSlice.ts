import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CartState = {
    cart: any[],
    loading: boolean,
}


const initialState: CartState = {
    cart: [],
    loading: false,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<any>) => {
            const existingItem = state.cart.find((item: any) => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },

        removeFromCart: (state, action: PayloadAction<any>) => {
            const existingItem = state.cart.find((item: any) => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity -= 1;
                if (existingItem.quantity === 0) {
                    state.cart = state.cart.filter((item: any) => item.id !== action.payload.id);
                }
            }
        },
    }
})


export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
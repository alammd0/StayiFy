import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Property {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    image: string;
}

interface PropertyState {
    properties: Property[];
    loading: boolean;
    error: string | null;
}

// initial state
const initialState: PropertyState = {
    properties: [],
    loading: false,
    error: null
}

// create slice
const propertySlice = createSlice({
    name: 'property',
    initialState,
    reducers: {
        setProperty(state, action: PayloadAction<any>) {
            state.properties = action.payload
        },

        setUpdatedProperty(state, action: PayloadAction<any>) {
            state.properties = state.properties.map((property: any) => {
                if (property.id === action.payload.id) {
                    return action.payload;
                }
                return property;
            });
        },
    },
});


export const { setProperty, setUpdatedProperty } = propertySlice.actions
export default propertySlice.reducer
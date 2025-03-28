import { z } from "zod";


// create property input 
export const createPropertyInput = z.object({
    title: z.string().min(3, "Title should be at least 3 characters long"),
    description: z.string().min(10, "Description should be at least 10 characters long"),
    price: z.number().min(1, "Price should be a positive number"),
    location: z.string().min(3, "Location must be at least 3 characters long"),
    image: z.string(),
})

// id input 
export const idSchema = z.object({
    id: z.string().regex(/^\d+$/, "Property ID must be a number"),
});
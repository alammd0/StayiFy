import { z } from "zod";

// signup Data validation using Zod
export const signupSchema = z.object({
    username: z.string().min(4).max(14),
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(5),
    phoneNumber: z.string()
})

// login Data Validation in using Zod
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5)
})
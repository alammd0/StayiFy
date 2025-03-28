import { z } from "zod";
export declare const signupSchema: z.ZodObject<{
    username: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    phoneNumber: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
}, {
    username: string;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;

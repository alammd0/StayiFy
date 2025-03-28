import { z } from "zod";
export declare const createPropertyInput: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    location: z.ZodString;
    image: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    price: number;
    location: string;
    image: string;
}, {
    title: string;
    description: string;
    price: number;
    location: string;
    image: string;
}>;
export declare const idSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;

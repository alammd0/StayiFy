import { z } from "zod";
import { signupSchema, loginSchema } from "./Validation/auth";
import { createPropertyInput, idSchema } from "./Validation/property";

// auth 
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

// property
export type CreateProperty = z.infer<typeof createPropertyInput>;
export type IdSchema = z.infer<typeof idSchema>;
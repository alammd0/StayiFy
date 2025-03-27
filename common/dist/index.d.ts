import { z } from "zod";
import { signupSchema, loginSchema } from "./auth/auth";
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

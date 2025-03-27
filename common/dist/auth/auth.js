"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
// signup Data validation using Zod
exports.signupSchema = zod_1.z.object({
    username: zod_1.z.string().min(4).max(14),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(5).max(8),
    phoneNumber: zod_1.z.string()
});
// login Data Validation in using Zod
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(5).max(8)
});

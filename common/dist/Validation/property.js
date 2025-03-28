"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idSchema = exports.createPropertyInput = void 0;
const zod_1 = require("zod");
// create property input 
exports.createPropertyInput = zod_1.z.object({
    title: zod_1.z.string().min(3, "Title should be at least 3 characters long"),
    description: zod_1.z.string().min(10, "Description should be at least 10 characters long"),
    price: zod_1.z.number().min(1, "Price should be a positive number"),
    location: zod_1.z.string().min(3, "Location must be at least 3 characters long"),
    image: zod_1.z.string(),
});
// id input 
exports.idSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^\d+$/, "Property ID must be a number"),
});

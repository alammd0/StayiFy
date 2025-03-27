import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { uploadImageCloudinary } from "../utils/upload";

export const createProperty = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        // Parse form-data
        const body = await c.req.parseBody();
        const user = c.get("user");


        console.log("Inside create Property: ", user);

        // Validate user
        const findUser = await prisma.user.findUnique({
            where: { id: user.id }
        });

        if (!findUser) {
            return c.json({ message: "User not found, please login again" }, 401);
        }

        // Retrieve the single image file
        const imageFile = body.image;

        if (!imageFile || !(imageFile instanceof File)) {
            return c.json({ message: "Image file is required" }, 400);
        }

        // Convert file to a buffer
        const fileBuffer = Buffer.from(await imageFile.arrayBuffer());

        // Upload to Cloudinary
        const imageUrl = await uploadImageCloudinary(fileBuffer, c.env);

        // Create property in database
        const property = await prisma.property.create({
            data: {
                title: body.title as string,
                description: body.description as string,
                image: imageUrl,
                price: Number(body.price),
                location: body.location as string,
                user: { connect: { id: user.id } }
            }
        });

        return c.json({
            message: "Property created successfully",
            data: property
        }, 201);
    } catch (err) {
        console.error("Error in createProperty:", err);
        return c.json({ message: "Internal server error" }, 500);
    }
};


// update property
export const updateProperty = async (c: Context) => {
    try {

    }
    catch (err) {

    }
}

// delete property
export const deleteProperty = async (c: Context) => {
    try {

    }
    catch (err) {

    }
}

// get property
export const getPropertById = async (c: Context) => {
    try {

    }
    catch (err) {

    }
}

// get all property
export const getAllProperty = async (c: Context) => {
    try {

    }
    catch (err) {

    }
}
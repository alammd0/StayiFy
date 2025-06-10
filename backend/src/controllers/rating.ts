import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";



const ratingSchema = z.object({
    propertyId: z.number(),
    userId: z.number(),
    rating: z.number().min(1).max(5),
    comment: z.string().min(1).max(500),
})

// create raiting and comment for a product
export const createRating = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {

        const body = await c.req.json();

        // console.log("Request body : ", body);


        const { success } = ratingSchema.safeParse(body);

        // console.log("Success : ", success);

        if (!success) {
            return c.json({
                error: "Invalid input data",
                message: "Invalid input data, Creating rating and comment",
            }, 400)
        }

        const { propertyId, userId, rating, comment } = body;

        console.log("Creating rating and comment for propertyId : ", propertyId, " userId : ", userId, " rating : ", rating, " comment : ", comment);


        const existingBooking = await prisma.booking.findFirst({
            where: {
                propertyId: Number(propertyId),
                userId: Number(userId),
                status: "CONFIRMED",
            },
        })

        if (!existingBooking) {
            return c.json({
                message: "Booking not found",
                error: "Booking not found",
            }, 404)
        }

        const ratingAndComment = await prisma.review.create({
            data: {
                propertyId: Number(propertyId),
                userId: Number(userId),
                rating: Number(rating),
                comment: comment,
            },
        })

        return c.json({
            message: "Rating and comment created successfully",
            data: ratingAndComment,
        }, 201);

    }
    catch (err) {
        console.log("Error in creating rating and comment", err);
        return c.json({
            error: "Error in creating rating and comment",
            message: "Something went wrong, While creating rating and comment",
        }, 500)
    }
}

// get all rating and comment for a product
export const getallRating = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {

        const propertyId = c.req.param("propertyId");

        const ratingAndComment = await prisma.review.findMany({
            where: {
                propertyId: Number(propertyId)
            },
            select: {
                rating: true,
                comment: true,
                user: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return c.json({
            message: "Rating and comment fetched successfully",
            data: ratingAndComment
        }, 200);
    }
    catch (err) {
        console.log(err);
        return c.json({
            message: "Something went wrong, While getting all rating and comment"
        })
    }
}
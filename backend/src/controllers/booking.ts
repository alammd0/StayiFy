import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";
import Razorpay from "razorpay";
import crypto from "crypto";

const bookingSchema = z.object({
    userId: z.number(),
    propertyId: z.number(),
    totalPrice: z.number(),
    startDate: z.string(),
    endDate: z.string(),
});

export const createBooking = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const validation = bookingSchema.safeParse(body);

        if (!validation.success) {
            return c.json({
                message: "Invalid input data",
                errors: validation.error.format()
            }, 400);
        }

        const { userId, propertyId, totalPrice, startDate, endDate } = validation.data;

        // Initialize Razorpay instance
        const razorpay = new Razorpay({
            key_id: c.env.RAZORPAY_KEY_ID,
            key_secret: c.env.RAZORPAY_KEY_SECRET
        });

        // Create Order in Razorpay
        const options = {
            amount: totalPrice * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            payment_capture: 1,
        };

        const order = await razorpay.orders.create(options);

        const booking = await prisma.booking.create({
            data: {
                userId,
                propertyId,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                price: totalPrice,
                paymentId: order.id,
                status: "PENDING",
            }
        });

        return c.json({
            message: "Booking created successfully",
            data: booking,
            orderId: order.id
        }, 200);
    } catch (err) {
        console.error("Error creating booking:", err);
        return c.json({
            message: "Something went wrong while creating booking"
        }, 500);
    }
};

// Verify the payment
export const verifyPayment = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = await c.req.json();

        console.log("Received Payment ID:", razorpayPaymentId);
        console.log("Received Order ID:", razorpayOrderId);
        console.log("Received Signature:", razorpaySignature);

        if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
            return c.json({
                message: "Missing required fields"
            }, 400);
        }

        // Generate expected signature
        const expectedSignature = crypto
            .createHmac("sha256", c.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpayOrderId}|${razorpayPaymentId}`)
            .digest("hex");

        console.log("Generated Signature:", expectedSignature);
        console.log("Received Signature:", razorpaySignature);

        // Verify signature
        if (expectedSignature !== razorpaySignature) {
            return c.json({
                message: "Payment verification failed, invalid signature"
            }, 400);
        }

        // Update booking status to CONFIRMED
        const updateBooking = await prisma.booking.updateMany({
            where: {
                paymentId: razorpayOrderId
            },
            data: {
                status: "CONFIRMED"
            }
        });

        return c.json({
            message: "Payment verified successfully",
            booking: updateBooking
        }, 200);
    } catch (err) {
        console.error("Error verifying payment:", err);
        return c.json({
            message: "Payment verification failed"
        }, 400);
    }
};

export const getBookingProperty = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    });

    try {
        const userId = c.req.param("userId");

        console.log("Received headers:", c.req.header);


        const bookings = await prisma.booking.findMany({
            where: {
                userId: Number(userId)
            },

            include: {
                property: true,
                user: true
            }
        })

        if (!bookings) {
            return c.json({
                message: "No bookings found"
            }, 404);
        }

        return c.json({
            message: "Bookings fetched successfully",
            data: bookings
        }, 200);


    } catch (error) {
        console.error("Error fetching bookings:", error);
        return c.json({
            message: "Failed to fetch bookings",
        }, 500);
    } finally {
        await prisma.$disconnect();
    }
};

export const deleteBookinProperty = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    });

    try {

        const body = await c.req.json();
        const bookingId = body.id;

        console.log("Booking Id : " + bookingId);

        if (!bookingId) {
            return c.json({
                message: "Missing required fields"
            }, 400);
        }

        await prisma.booking.delete({
            where: {
                id: Number(bookingId)
            }
        });

        return c.json({
            message: "Booking deleted successfully"
        }, 200);
    }

    catch (err) {
        console.log("Error deleting booking:", err);
        return c.json({
            message: "Failed to delete booking"
        }, 400)
    }
}

export const clearAllbooking = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    });

    try {
        const userid = c.req.param("userId");

        await prisma.booking.deleteMany({
            where: {
                userId: Number(userid)
            }
        });

        return c.json({
            message: "All Clear deleted successfully"
        }, 200);
    }
    catch (err) {
        console.log("Error deleting booking:", err);
        return c.json({
            message: "Failed to delete booking"
        }, 400)
    }
}

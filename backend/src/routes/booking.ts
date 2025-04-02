import { Hono } from "hono";
import { createBooking, verifyPayment, getBookingProperty } from "../controllers/booking";
import { auth } from "../middleware/Auth";

const bookingRoute = new Hono();

bookingRoute.post("/create-booking", auth, createBooking);
bookingRoute.post("/verify-payment", auth, verifyPayment);
bookingRoute.get("/get-booking", auth, getBookingProperty);

export default bookingRoute;
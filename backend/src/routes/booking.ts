import { Hono } from "hono";
import { createBooking, verifyPayment, getBookingProperty, deleteBookinProperty } from "../controllers/booking";
import { auth } from "../middleware/Auth";

const bookingRoute = new Hono();

bookingRoute.post("/create-booking", auth, createBooking);
bookingRoute.post("/verify-payment", auth, verifyPayment);
bookingRoute.get("/get-booking/:userId", auth, getBookingProperty);
bookingRoute.delete("/delete-bookin/:userId", auth, deleteBookinProperty);

export default bookingRoute;
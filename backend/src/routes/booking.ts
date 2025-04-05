import { Hono } from "hono";
import { createBooking, verifyPayment, getBookingProperty, deleteBookinProperty, clearAllbooking } from "../controllers/booking";
import { auth } from "../middleware/Auth";

const bookingRoute = new Hono();

bookingRoute.post("/create-booking", auth, createBooking);
bookingRoute.post("/verify-payment", auth, verifyPayment);
bookingRoute.get("/get-booking/:userId", auth, getBookingProperty);
bookingRoute.delete("/delete-booking", auth, deleteBookinProperty);
bookingRoute.delete("/delete-all-booking/:userId", auth, clearAllbooking);

export default bookingRoute;
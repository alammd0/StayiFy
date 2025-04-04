import { Hono } from "hono";
import { createRating, getallRating } from "../controllers/rating";
import { auth } from "../middleware/Auth";

const ratingRoute = new Hono();

ratingRoute.post("/create-rating", auth, createRating);
ratingRoute.get("/get-rating/:propertyId", auth, getallRating);

export default ratingRoute;
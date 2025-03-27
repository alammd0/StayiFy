import { Hono } from "hono";
import { createProperty } from "../controllers/property";
import { auth, hostRole } from "../middleware/Auth";

const propertyRoutes = new Hono();

propertyRoutes.post("/create-property", auth, hostRole, createProperty);

export default propertyRoutes;
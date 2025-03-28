import { Hono } from "hono";
import { createProperty, updatedProperty, deleteProperty, getAllProperty, getPropertyById } from "../controllers/property";
import { auth, hostRole } from "../middleware/Auth";

const propertyRoutes = new Hono();


// all route using host 
propertyRoutes.post("/create-property", auth, hostRole, createProperty);
propertyRoutes.put("/update-property", auth, hostRole, updatedProperty);
propertyRoutes.delete("/delete-property/:id", auth, hostRole, deleteProperty);


// all route 
propertyRoutes.get("/all-property", auth, getAllProperty);
propertyRoutes.get("/propert-detail/:id", auth, getPropertyById);

export default propertyRoutes;
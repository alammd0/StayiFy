import { Hono } from "hono";
import { createProperty, updatedProperty, deleteProperty, getAllProperty, getPropertyById, getPropertyByUserId } from "../controllers/property";
import { auth, hostRole } from "../middleware/Auth";

const propertyRoutes = new Hono();


// all route using host 
propertyRoutes.post("/create-property", auth, hostRole, createProperty);
propertyRoutes.put("/update-property", auth, hostRole, updatedProperty);
propertyRoutes.delete("/delete-property/:id", auth, hostRole, deleteProperty);
propertyRoutes.get("/my-property", auth, hostRole, getPropertyByUserId);


// all route 
propertyRoutes.get("/all-property", getAllProperty);
propertyRoutes.get("/property-detail/:id", getPropertyById);

export default propertyRoutes;
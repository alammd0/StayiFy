import { Hono } from "hono";
import { signup, login } from "../controllers/auth";


const authRoutes = new Hono();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);

export default authRoutes;
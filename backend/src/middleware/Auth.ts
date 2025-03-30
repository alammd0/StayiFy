import { Next } from "hono";
import { Context } from "hono";
import { verify } from "hono/jwt";


export const auth = async (c: Context, next: Next) => {

    console.log("Inside Auth Middleware before", c.req.header("Authorization"));

    const authHeader = c.req.header("Authorization") || "";

    console.log("Auth Header after : " + authHeader);

    if (!authHeader.startsWith("Bearer ")) {
        return c.json({ message: "Unauthorized Access" }, 401);
    }

    const token = authHeader.split(" ")[1];
    console.log("Token : " + token);

    if (!token) {
        return c.json({ message: "Token required" }, 401);
    }

    try {
        const decodedToken = await verify(token, c.env.JWT_SECRET) ;

        // Validate token payload structure
        if (!decodedToken) {
            return c.json({ message: "Invalid token payload" }, 401);
        }

        console.log("Decoded Token : " + JSON.stringify(decodedToken));

        c.set("user", decodedToken.payload);
        
        return next();
    } catch (err) {
        console.error(err);
        return c.json({ message: "Unauthorized Access In auth" }, 401);
    }
};

// check the user is user or owner

// 1. User role

export const userRole = async (c: Context, next: Next) => {
    try {

        const user = c.get("user")
        console.log("Inside USER Role : " + user.accountType);

        if (user.accountType !== "USER") {
            return c.json({
                message: "Unauthorized, only Acess by User"
            }, 401, {
                "Access-Control-Allow-Origin": "*"
            })
        }

        return next();

    }
    catch (err) {
        console.log(err);
        return c.json({
            message: "Unauthorized, only Acess by Owner"
        }, 401, {
            "Access-Control-Allow-Origin": "*"
        })
    }
}

// 2. Owner role

export const hostRole = async (c: Context, next: Next) => {
    try {

        const user = c.get("user")
        console.log("Inside HOST Role : " + user.accountType);

        if (user.accountType !== "HOST") {
            return c.json({
                message: "Unauthorized, only Acess by Host"
            }, 401, {
                "Access-Control-Allow-Origin": "*"
            })
        }

        return next();
    }
    catch (err) {
        console.log(err);
        return c.json({
            message: "Unauthorized, only Acess by Owner"
        }, 401, {
            "Access-Control-Allow-Origin": "*"
        })
    }
}
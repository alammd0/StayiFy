import { Context } from "hono";
import bcrypt from "bcryptjs";
import { sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { loginSchema, signupSchema } from "@mkadevs/common-app/dist/auth/auth";


// signup controller
export const signup = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {

        const body = await c.req.json();

        // HW:ADD ZOD VALIDATIOn
        const { success } = signupSchema.safeParse(body);

        if (!success) {
            return c.json({
                message: "Validation Error, check your request body",
                error: signupSchema.safeParse(body).error
            }, 400)
        }

        // Hash the password usig bcrypt
        const password = body.password;
        const hashPassword = await bcrypt.hash(password, 10);

        console.log("Hashed Password : " + hashPassword)

        // create the user in the database
        const user = await prisma.user.create({
            data: {
                username: body.username,
                name: body.name,
                email: body.email,
                password: hashPassword,
                accountType : body.accountType,
                phoneNumber: body.phoneNumber
            }
        })

        // create tokeen and send it back to the user
        const payload = {
            id: user.id,
            name: user.name,
            username: user.username
        }

        const token = await sign({
            payload,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
        }, c.env.JWT_SECRET);

        return c.json({
            message: "User created successfully",
            data: user,
            token
        }, 200)

    }
    catch (err) {
        console.log(err);
        return c.json({
            message: "Something went wrong",
            error: err
        }, 500)
    }
}

// login controller
export const login = async (c: Context) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())


    try {

        const body = await c.req.json();
    
        // ADD : ZOD VALIDATION
        const { success } = loginSchema.safeParse(body);

        if (!success) {
            return c.json({
                message: "Validation Error, check your request body",
                error: loginSchema.safeParse(body).error
            }, 400)
        }
 
        // find unique user 
        const user = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        })

        // check user exits or not
        if (!user) {
            return c.json({
                message: "User not found",
                error: "User not found"
            }, 404)
        }

        // find user password from request body 
        const password = body.password;

        // check password match or not
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return c.json({
                message: "Invalid password",
                error: "Invalid password"
            }, 401)
        }

        // create jwt token 
 
        const token = await sign({
            payload: {
                id: user.id,
                name: user.name,
                username: user.username,
                accountType: user.accountType
            },
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
            
        }, c.env.JWT_SECRET);

        // finalyy send response 

        return c.json({
            message: "User logged in successfully",
            data: user,
            token
        })
    }

    catch (err) {
        console.log(err);
        return c.json({
            message: "Something went wrong, please try again",
            error: err
        }, 404)
    }
}


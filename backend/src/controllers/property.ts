import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createPropertyInput, idSchema } from "@mkadevs/common-app/dist/Validation/property";
import { error } from "console";

interface cloudinaryForm {
    secure_url: string
}

// Test Done 
export const createProperty = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {

        const formData = await c.req.formData();

        // Retrieve userId properly
        const user = c.get("user");
        if (!user || !user.id) {
            return c.json({
                message: "Unauthorized: User ID is required",
            }, 401);
        }

        const userId = Number(user.id);

        if (isNaN(userId)) {
            return c.json({
                message: "Invalid user ID",
            }, 400);
        }

        // covert form Data into object
        const propertyData = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            price: Number(formData.get("price")),
            location: formData.get("location") as string,
            image: "",
            userId: userId
        }

        // validate input Data
        const { success } = createPropertyInput.safeParse(propertyData);

        if (!success) {
            return c.json({
                message: "Validation Failed",
                error: createPropertyInput.safeParse(propertyData).error
            })
        }

        const file = formData.get("image") as File;

        if (!file) {
            return c.json({
                message: "Image is required"
            }, 400)
        }

        // Prepare Cloudinary upload 
        const cloudinaryForm = new FormData();
        cloudinaryForm.append("file", file);
        cloudinaryForm.append("upload_preset", c.env.CLOUDINARY_UPLOAD_PRESET);
        cloudinaryForm.append("api_key", c.env.CLOUDINARY_API_KEY);


        const clooudinaryResponse = await fetch(
            `https://api.cloudinary.com/v1_1/${c.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: cloudinaryForm
            }
        );

        console.log(clooudinaryResponse)

        if (!clooudinaryResponse.ok) {
            throw new Error('Cloudinary upload failed')
        }

        const cloudinaryData: cloudinaryForm = await clooudinaryResponse.json();

        // console.log("Cloudinary Response : " + cloudinaryData.secure_url);

        propertyData.image = cloudinaryData.secure_url;

        const property = await prisma.property.create({
            data: propertyData,
        });

        return c.json({
            message: "Property created successfully",
            data: property
        }, 201);
    }
    catch (err) {
        console.log(err);
        return c.json({
            message: "Something went wrong"
        }, 500)
    }
};


// update property
export const updatedProperty = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {

        // get the form Data
        const formData = await c.req.formData();

        // get Property Id
        const propertyId = formData.get("id") as string;


        // check 
        if (!propertyId) {
            return c.json({
                message: "Property ID is required"
            }, 404)
        }

        console.log("Inside the update Property : " + propertyId);

        // Find the Property using ID 
        const existingProperty = await prisma.property.findUnique({
            where: {
                id: Number(propertyId)
            }
        })

        // check property exiting or not
        if (!existingProperty) {
            return c.json({
                message: "Property Not Found"
            }, 404)
        }

        // get Existing Image URL 
        let imageUrl = existingProperty.image
        console.log("Existing Image Url : " + imageUrl);

        const file = formData.get("image") as File
        if (file) {

            // upload Image on Cloundinary 
            const cloudinaryForm = new FormData();
            cloudinaryForm.append("file", file);
            cloudinaryForm.append("upload_preset", c.env.CLOUDINARY_UPLOAD_PRESET);
            cloudinaryForm.append("api_key", c.env.CLOUDINARY_API_KEY);

            const cloundinaryResponse = await fetch(
                `https://api.cloudinary.com/v1_1/${c.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "post",
                    body: cloudinaryForm
                }
            );

            // check upload succes or failed 
            if (!cloundinaryResponse.ok) {
                return c.json({
                    message: "Image upload Failed"
                }, 500)
            }

            // get Secur url 
            const cloudinaryData: cloudinaryForm = await cloundinaryResponse.json();
            imageUrl = cloudinaryData.secure_url
        }

        // update Property 
        const updatedProperties = await prisma.property.update({
            where: {
                id: Number(propertyId)
            },

            data: {
                title: formData.get("title") as string || existingProperty.title,
                description: formData.get("description") as string || existingProperty.description,
                image: imageUrl,
                price: formData.get("price") ? Number(formData.get("price")) : existingProperty.price,
                location: formData.get("location") as string || existingProperty.location
            }
        });


        return c.json({
            message: "Property update successfully",
            data: updatedProperties
        }, 201)

    }
    catch (err) {
        console.log(err);
        return c.json({
            message: "Property update Fail"
        }, 500)
    }
}

// delete property
export const deleteProperty = async (c: Context) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());


    try {

        // 1. find propery if from parameter
        const propertyId = c.req.param("id");

        // const { success } = idSchema.safeParse(propertyId);

        // if (!success) {
        //     return c.json({
        //         message: "Validation Failed",
        //         error: idSchema.safeParse(propertyId).error
        //     })
        // }

        console.log("Property id : " + propertyId);

        // 2. check property exit or not
        if (!propertyId) {
            return c.json({
                message: "Property not Find"
            }, 404)
        }

        // 3. delete the property Using his Id 
        await prisma.property.delete({
            where: {
                id: Number(propertyId)
            }
        });

        return c.json({
            message: "Property Delete Successfully..."
        }, 200);

    }
    catch (err) {
        console.log(err);
        return c.json({
            message: "Property Delete failed.."
        }, 500)
    }
}


// get all property
export const getAllProperty = async (c: Context) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {

        const allProperty = await prisma.property.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                image: true,
                price: true,
                location: true,
                user: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return c.json({
            message: "Property Fetch Succesfully",
            data: allProperty
        }, 200)

    }
    catch (err) {
        return c.json({
            message: "Property Fetch Faild"
        }, 404)
    }
}


// get property
export const getPropertyById = async (c: Context) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {

        const propertyId = c.req.param("id");
        console.log("property Id : " + propertyId)

        // const { success } = idSchema.safeParse(propertyId);

        // if (!success) {
        //     return c.json({
        //         message: "Validation Failed",
        //         error: idSchema.safeParse(propertyId).error
        //     }, )
        // }

        if (!propertyId) {
            return c.json({
                message: "Property id Not valid"
            }, 400)
        }

        // find the details of property 
        const propertyDetails = await prisma.property.findUnique({
            where: {
                id: Number(propertyId)
            },

            select: {
                id: true,
                title: true,
                description: true,
                image: true,
                price: true,
                location: true,
                user: {
                    select: {
                        name: true
                    }
                }
            }
        });

        if (!propertyDetails) {
            return c.json({
                message: "Property not found"
            }, 404);
        }

        console.log("Property Details : " + propertyDetails)

        return c.json({
            message: "Fetch Property Success",
            data: propertyDetails
        }, 200)
    }
    catch (err) {
        return c.json({
            message: "Fetch Property Succes Failed"
        }, 500)
    }
}

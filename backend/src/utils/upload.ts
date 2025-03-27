export const uploadImageCloudinary = async (fileBuffer: Buffer, env: any) => {
    const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append("file", new Blob([fileBuffer]), "image.jpg"); // Convert Buffer to Blob
    formData.append("upload_preset", "Alam"); 

    console.log(formData)

    try {
        const response = await fetch(cloudinaryUploadUrl, {
            method: "POST",
            body: formData,
        });

        console.log(response)

        if (!response.ok) {
            throw new Error(`Cloudinary Upload Failed: ${response.statusText}`);
        }

        const result: { secure_url: string } = await response.json();
        console.log(result)
        return result.secure_url; 
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw new Error("Image upload failed");
    }
};

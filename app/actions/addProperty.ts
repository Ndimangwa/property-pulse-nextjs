'use server';

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";
import { CLOUDINARY_FOLDER } from "@/utils/applicationConstants";

async function addProperty(formData: FormData) {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser?.userId) {
        throw new Error("UserID is required");
    }

    const amenities = formData.getAll("amenities");

    const propertyData: any = {
        owner: sessionUser.userId,
        type: formData.get("type"),
        name: formData.get("name"),
        description: formData.get("description"),
        location: {
            street: formData.get("location.street"),
            city: formData.get("location.city"),
            state: formData.get("location.state"),
            zipcode: formData.get("location.zipcode"),
        },
        beds: Number(formData.get("beds")),
        baths: Number(formData.get("baths")),
        square_feet: Number(formData.get("square_feet")),
        amenities,
        rates: {
            nightly: Number(formData.get("rates.nightly")),
            weekly: Number(formData.get("rates.weekly")),
            monthly: Number(formData.get("rates.monthly")),
        },
        seller_info: {
            name: formData.get("seller_info.name"),
            email: formData.get("seller_info.email"),
            phone: formData.get("seller_info.phone"),
        },
    };

    const images = formData
        .getAll("images")
        .filter((file): file is File => file instanceof File && file.size > 0);

    const uploadPromises = images.map(async (file) => {
        const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");

        const result = await cloudinary.uploader.upload(
            `data:image/png;base64,${base64}`,
            { folder: CLOUDINARY_FOLDER }
        );

        return result.secure_url;
    });

    propertyData.images = await Promise.all(uploadPromises);

    const newProperty = new Property(propertyData);
    await newProperty.save();

    revalidatePath("/", "layout");
    redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
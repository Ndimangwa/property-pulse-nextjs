'use server';

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function updateProperty(propertyId: string, formData: FormData) {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser?.userId) {
        throw new Error("UserID is required");
    }

    const existingProperty = await Property.findById(propertyId);
    if (!existingProperty) {
        throw new Error("Property not found");
    }

    if (existingProperty.owner.toString() !== sessionUser.userId) {
        throw new Error("Unauthorized");
    }

    const propertyData = {
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
        amenities: formData.getAll("amenities"),
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

    existingProperty.set(propertyData);
    const updatedProperty = await existingProperty.save();

    revalidatePath("/", "layout");
    redirect(`/properties/${updatedProperty._id}`);
}

export default updateProperty;

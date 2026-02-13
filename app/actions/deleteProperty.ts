'use server';
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { CLOUDINARY_FOLDER } from "@/utils/applicationConstants";

async function deleteProperty(propertyId: string | number) {
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required');
    }
    const { userId } = sessionUser;

    await connectDB();
    const property = await Property.findById(propertyId);
    if (!property) throw new Error('Property Not Found');
    //Verify owner
    if (property.owner.toString() !== userId) {
        throw new Error('UnAuthorized');
    }
    //Now proceed
    //Delete images
    const publicIds = property.images.map((imageUrl) => {
        const url = new URL(imageUrl);
        const pathname = url.pathname;
        const segments = pathname.split('/');

        const filename = segments.at(-1);
        return filename.substring(0, filename.lastIndexOf('.'));
    });

    if (publicIds.length > 0) {
        await Promise.all(
            publicIds.map(publicId =>
                cloudinary.uploader.destroy(`${CLOUDINARY_FOLDER}/${publicId}`)
            )
        );
    }
    //Delete record
    await property.deleteOne();
    //revalidatePath
    revalidatePath('/', 'layout');
}
export default deleteProperty;
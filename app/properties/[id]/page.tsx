import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { FaArrowLeft } from 'react-icons/fa';
import Link from "next/link";
import PropertyImages from "@/components/PropertyImages";
import { convertToSerializableObject } from "@/utils/convertToObject";
import SuccessToast from "@/utils/SuccessToast";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";

const PropertyPage = async ({ params }) => {
    const { id } = await params;
    await connectDB();
    const propertyDoc = await Property.findById(id)
        .lean();
    const property = convertToSerializableObject(propertyDoc);
    if (!property) {
        return (
            <h1 className="text-center text-2xl font-bold mt-10">
                Property Not Found
            </h1>
        );
    }
    return (
        <>
            <PropertyHeaderImage image={property.images[0]} />
            {/* Back to properties section */}
            <section>
                <div className="container m-auto py-6 px-6">
                    <Link
                        href="/properties"
                        className="text-blue-500 hover:text-blue-600 flex items-center"
                    >
                        <FaArrowLeft className="mr-2" /> Back to Properties
                    </Link>
                </div>
            </section>
            {/* Property Info Section */}
            <section className="bg-blue-50">
                <div className="container m-auto py-10 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-70-30 w-full gap-6">
                        {/* Property Info */}
                        <PropertyDetails property={property} />
                        {/*side-bar*/}
                        <aside className="space-y-4">
                            <BookmarkButton property={property}/>
                            <ShareButtons property={property}/>
                            <PropertyContactForm property={property}/>
                        </aside>
                    </div>
                </div>
            </section>
            {/* Displaying other images */}
            <PropertyImages images={property.images} />
            {/*Showing Toast*/}
            <SuccessToast/>
        </>
    );
}

export default PropertyPage;

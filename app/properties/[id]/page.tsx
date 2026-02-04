import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { FaArrowLeft } from 'react-icons/fa';
import Link from "next/link";
const PropertyPage = async ({ params }) => {
    const { id } = await params;
    await connectDB();
    const property = await Property.findById(id)
        .lean();
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
                        <PropertyDetails property={property}/>
                    </div>
                </div>
            </section>
        </>
    );
}

export default PropertyPage;

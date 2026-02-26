import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getPagination } from '@/lib/pagination';
import Pagination from '@/components/Pagination';

type PropertiesPageProps = {
    searchParams: Promise<{
        page?: string;
        pageSize?: string;
    }>;
};

const PropertiesPage = async ({ searchParams }: PropertiesPageProps) => {
    await connectDB();

    // NEW (Next.js 15+)
    const params = await searchParams;
    const { page, pageSize, skip } = getPagination(params);
    const totalItems = await Property.countDocuments({});

    const showPagination = totalItems > pageSize;

    const properties = await Property.find({})
        .skip(skip)
        .limit(pageSize)
        .lean();

    return (
        <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
                {properties.length === 0 ? (
                    <p>No property Found</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {properties.map((property) => (
                                <PropertyCard key={property._id} property={property} />
                            ))}
                        </div>
                        {showPagination && (
                            <Pagination page={page} pageSize={pageSize} totalItems={totalItems}/>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default PropertiesPage;
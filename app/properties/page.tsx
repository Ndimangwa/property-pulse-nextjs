import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import Property from '@/models/Property';
const PropertiesPage = async () => {
    await connectDB();
    /*
    Since this is a server component, it will load with properties included.
    In MERN [client component], we would use routes , api with express.js
    then , in useEffect(() => {}, []) , call the action to load properties
    */
    const properties = await Property.find({}).lean();
    return ( 
        <section className="px-4 py-6">
            <div className="container-xl lg: container m-auto px-4 py-6">
                {properties.length === 0 ? (<p>No property Found</p>) : (
                    <div className="grid grid-cols-1 md: grid-cols-3 gap-6">
                        {properties.map((property) => (
                            <PropertyCard key={property._id} property={property}/>
                        ))}
                    </div>
                )}
            </div>
        </section>
     );
}
 
export default PropertiesPage;
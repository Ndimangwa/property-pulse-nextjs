import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResultsPage = async ({
  searchParams,
}: {
  searchParams: { location?: string; propertyType?: string };
}) => {
  await connectDB();

  // Safe defaults (searchParams is synchronous)
  const location = searchParams.location || "";
  const propertyType = searchParams.propertyType || "All";

  let query: any = {};

  // Location filter
  if (location) {
    const locationPattern = new RegExp(location, "i");

    query.$or = [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.zipcode": locationPattern },
      { "location.state": locationPattern },
    ];
  }

  // Property type filter
  if (propertyType !== "All") {
    query.type = new RegExp(propertyType, "i");
  }

  const propertiesQueryResults = await Property.find(query).lean();

  const properties = convertToSerializableObject(propertiesQueryResults);

  return (
    <>
      {/* Search Section */}
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>

      {/* Results Section */}
      <section className="px-4 py-6">
        <div className="container-xl lg:container px-4 py-6">
          <Link
            href="/properties"
            className="flex items-center text-blue-500 hover:underline mb-3"
          >
            <FaArrowAltCircleLeft className="mr-2" />
            Back to Properties
          </Link>

          <h1 className="text-2xl mb-4">Search Results</h1>

          {properties.length === 0 ? (
            <p>No search results found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property: any) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;

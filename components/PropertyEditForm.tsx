import updateProperty from "@/app/actions/updateProperty";
import { amenityOptions } from "@/utils/applicationConstants";

type PropertyEditFormProps = {
    property: {
        _id: number | string;
        name: string;
        type: string;
        description: string;
        location: {
            street: string;
            city: string;
            zipcode: string;
            state: string;
        };
        beds: number;
        baths: number;
        square_feet: number;
        amenities: string[];
        rates: {
            nightly?: number;
            weekly?: number;
            monthly?: number;
        };
        seller_info: {
            name: string;
            email: string;
            phone: string;
        };
    }
};

const PropertyEditForm = ({ property }: PropertyEditFormProps) => {
    //Destructuring
    const {
        _id, name, type, description, location: { street, city, zipcode, state },
        beds, baths, square_feet, amenities, rates: { nightly, weekly, monthly },
        seller_info: {
            name: seller_name,
            email: seller_email,
            phone: seller_phone
        }
    } = property;
    const updatePropertyById = updateProperty.bind(null, _id); 
    return (
        <form action={updatePropertyById}>
            <h2 className="text-3xl text-center font-semibold mb-6">
                Edit Property
            </h2>

            <div className="mb-4">
                <label htmlFor="type" className="block text-gray-700 font-bold mb-2"
                >Property Type</label
                >
                <select
                    id="type"
                    name="type"
                    className="border rounded w-full py-2 px-3"
                    defaultValue={type}
                    required
                >
                    <option value="Apartment">Apartment</option>
                    <option value="Condo">Condo</option>
                    <option value="House">House</option>
                    <option value="CabinOrCottage">Cabin or Cottage</option>
                    <option value="Room">Room</option>
                    <option value="Studio">Studio</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2"
                >Listing Name</label
                >
                <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={name}
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="eg. Beautiful Apartment In Miami"
                    required
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="description"
                    className="block text-gray-700 font-bold mb-2"
                >Description</label
                >
                <textarea
                    id="description"
                    name="description"
                    defaultValue={description}
                    className="border rounded w-full py-2 px-3"
                    rows="4"
                    placeholder="Add an optional description of your property"
                ></textarea>
            </div>

            <div className="mb-4 bg-blue-50 p-4">
                <label className="block text-gray-700 font-bold mb-2">Location</label>
                <input
                    type="text"
                    id="street"
                    name="location.street"
                    defaultValue={street}
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Street"
                />
                <input
                    type="text"
                    id="city"
                    name="location.city"
                    defaultValue={city}
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="City"
                    required
                />
                <input
                    type="text"
                    id="state"
                    name="location.state"
                    defaultValue={state}
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="State"
                    required
                />
                <input
                    type="text"
                    id="zipcode"
                    name="location.zipcode"
                    defaultValue={zipcode}
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Zipcode"
                />
            </div>

            <div className="mb-4 flex flex-wrap">
                <div className="w-full sm:w-1/3 pr-2">
                    <label htmlFor="beds" className="block text-gray-700 font-bold mb-2"
                    >Beds</label>
                    <input
                        type="number"
                        id="beds"
                        name="beds"
                        defaultValue={beds}
                        className="border rounded w-full py-2 px-3"
                        required
                    />
                </div>
                <div className="w-full sm:w-1/3 px-2">
                    <label htmlFor="baths" className="block text-gray-700 font-bold mb-2"
                    >Baths</label>
                    <input
                        type="number"
                        id="baths"
                        name="baths"
                        defaultValue={baths}
                        className="border rounded w-full py-2 px-3"
                        required
                    />
                </div>
                <div className="w-full sm:w-1/3 pl-2">
                    <label
                        htmlFor="square_feet"
                        className="block text-gray-700 font-bold mb-2"
                    >Square Feet</label>
                    <input
                        type="number"
                        id="square_feet"
                        name="square_feet"
                        defaultValue={square_feet}
                        className="border rounded w-full py-2 px-3"
                        required
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2"
                >Amenities</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {amenityOptions.map((amenity, index) => (
                        <div key={index}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="amenities"
                                    value={amenity}
                                    defaultChecked={amenities.includes(amenity)}
                                    className="mr-2"
                                />
                                {amenity}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-4 bg-blue-50 p-4">
                <label className="block text-gray-700 font-bold mb-2"
                >Rates (Leave blank if not applicable)</label
                >
                <div
                    className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
                >
                    <div className="flex items-center">
                        <label htmlFor="weekly_rate" className="mr-2">Weekly</label>
                        <input
                            type="number"
                            id="weekly_rate"
                            name="rates.weekly"
                            defaultValue={weekly}
                            className="border rounded w-full py-2 px-3"
                        />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="monthly_rate" className="mr-2">Monthly</label>
                        <input
                            type="number"
                            id="monthly_rate"
                            name="rates.monthly"
                            defaultValue={monthly}
                            className="border rounded w-full py-2 px-3"
                        />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="nightly_rate" className="mr-2">Nightly</label>
                        <input
                            type="number"
                            id="nightly_rate"
                            name="rates.nightly"
                            defaultValue={nightly}
                            className="border rounded w-full py-2 px-3"
                        />
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <label
                    htmlFor="seller_name"
                    className="block text-gray-700 font-bold mb-2"
                >Seller Name</label
                >
                <input
                    type="text"
                    id="seller_name"
                    name="seller_info.name"
                    defaultValue={seller_name}
                    className="border rounded w-full py-2 px-3"
                    placeholder="Name"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="seller_email"
                    className="block text-gray-700 font-bold mb-2"
                >Seller Email</label
                >
                <input
                    type="email"
                    id="seller_email"
                    name="seller_info.email"
                    defaultValue={seller_email}
                    className="border rounded w-full py-2 px-3"
                    placeholder="Email address"
                    required
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="seller_phone"
                    className="block text-gray-700 font-bold mb-2"
                >Seller Phone</label
                >
                <input
                    type="tel"
                    id="seller_phone"
                    name="seller_info.phone"
                    defaultValue={seller_phone}
                    className="border rounded w-full py-2 px-3"
                    placeholder="Phone"
                />
            </div>
            {/* we will not handle images here */}
            <div>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Update Property
                </button>
            </div>
        </form>
    );
}

export default PropertyEditForm;
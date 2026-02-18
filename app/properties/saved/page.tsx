import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

const SavedPropertiesPage = async () => {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser?.userId) {
        throw new Error("Session User not found");
    }
    const user = await User.findById(sessionUser.userId)
        .populate("bookmarks")
        .lean();
    if (!user) {
        throw new Error("User not found");
    }

    const bookmarks = user.bookmarks || [];

    return (
        <section className="px-4 py-6">
            <div className="container m-auto px-4 py-4">
                <h1 className="text-2xl mb-4">
                    Saved Properties
                </h1>

                {bookmarks.length === 0 ? (
                    <p>You do not have any saved properties</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {bookmarks.map((property: any) => (
                            <PropertyCard
                                key={property._id.toString()}
                                property={property}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default SavedPropertiesPage;
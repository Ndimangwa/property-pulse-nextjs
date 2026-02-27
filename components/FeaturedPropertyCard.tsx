import Link from "next/link";
import Image from "next/image";
import { FaBed, FaBath, FaRulerCombined, FaMoneyBill, FaMapMarker } from 'react-icons/fa';
import getRateDisplay from "@/utils/getRateDisplay";
type FeaturedPropertyCardProps = {
    property: {
        _id: number | string;
        name: string;
        type: string;
        images: string[];
        beds: number;
        baths: number;
        square_feet: number;
        rates: {
            nightly?: number;
            weekly?: number;
            monthly?: number;
        };
        location: {
            city: string;
            state: string;
        };
    }
}

const FeaturedPropertyCard = ({ property }: FeaturedPropertyCardProps) => {
    const { _id, images, name, type,
        beds, baths, square_feet,
        rates: { nightly, weekly, monthly },
        location: { city, state }
    } = property;
    return (
        <div
            className="bg-white rounded-xl shadow-md relative flex flex-col md:flex-row"
        >
            <Image
                src={images[0]}
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5"
            />
            <div className="p-6">
                <h3 className="text-xl font-bold">{name}</h3>
                <div className="text-gray-600 mb-4">{type}</div>
                <h3
                    className="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right"
                >
                    {getRateDisplay(property)}
                </h3>
                <div className="flex justify-center gap-4 text-gray-500 mb-4">
                    <p>
                        <FaBed className="inline-block mr-2" /> {beds} {' '}
                        <span className="md:hidden lg:inline">Beds</span>
                    </p>
                    <p>
                        <FaBath className="inline-block mr-2" /> {baths} {' '}
                        <span className="md:hidden lg:inline">Baths</span>
                    </p>
                    <p>
                        <FaRulerCombined className="inline-block mr-2" /> {square_feet} {' '}
                        <span className="md:hidden lg:inline">sqft</span>
                    </p>
                </div>

                <div
                    className="flex justify-center gap-4 text-green-900 text-sm mb-4"
                >
                    {nightly && (<p><FaMoneyBill className="inline-block mr-2" /> Nightly</p>)}
                    {weekly && (<p><FaMoneyBill className="inline-block mr-2" /> Weekly</p>)}
                    {monthly && (<p><FaMoneyBill className="inline-block mr-2" /> Monthly</p>)}
                </div>

                <div className="border border-gray-200 mb-5"></div>

                <div className="flex flex-col lg:flex-row justify-between">
                    <div className="flex align-middle gap-2 mb-4 lg:mb-0">
                        <FaMapMarker className="text-orange-700"/>
                        <span className="text-orange-700"> {city}{' '}{state} </span>
                    </div>
                    <Link
                        href={`/properties/${_id}`}
                        className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default FeaturedPropertyCard;
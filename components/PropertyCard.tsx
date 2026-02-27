import {
  FaBed, FaBath, FaRulerCombined, FaMoneyBill, FaMapMarker
} from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import getRateDisplay from '@/utils/getRateDisplay';

type PropertyCardProps = {
  property: {
    _id: number | string;
    name: string;
    type: string;
    location: {
      city: string;
      state: string;
    };
    beds: number;
    baths: number;
    square_feet: number;
    rates: {
      weekly?: number;
      monthly?: number;
      nightly?: number;
    };
    images: string[]; 
  };
};
const PropertyCard = ({ property }: PropertyCardProps) => {
  const { _id, name, type, location: { city, state }, beds, baths, square_feet, images } = property;
  return (
    <div className="rounded-xl shadow-md relative">
      <Link href={`/properties/${_id}`}>
        <Image
          src={images[0]}
          alt=""
          width='0'
          height='0'
          sizes='100vw'
          className="w-full h-auto rounded-t-xl"
        />
      </Link>
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{type}</div>
          <h3 className="text-xl font-bold">{name}</h3>
        </div>
        <h3
          className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right"
        >
          {getRateDisplay(property)}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="md:hidden lg:inline" /> {beds} {' '}
            <span className="md:hidden lg:inline">Beds</span>
          </p>
          <p>
            <FaBath className="md:hidden lg:inline" /> {baths} {' '}
            <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="md:hidden lg:inline" />
            {square_feet}{' '} <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div
          className="flex justify-center gap-4 text-green-900 text-sm mb-4"
        >
          <p><FaMoneyBill className="md:hidden lg:inline" /> Weekly</p>
          <p><FaMoneyBill className="md:hidden lg:inline" /> Monthly</p>
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className='text-orange-700 mt-1' />
            <span className="text-orange-700"> {city} -- {state}</span>
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

export default PropertyCard;
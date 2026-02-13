'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import deleteProperty from '@/app/actions/deleteProperty';
import { toast } from 'react-toastify';

type ProfilePropertiesProps = {
    properties: {
        _id: number | string;
        name: string;
        images: string[];
        location: {
            street: string;
            city: string;
            state: string;
        };
    }[];
};
const ProfileProperties = ({ properties: initialProperties }: ProfilePropertiesProps) => {
    const [properties, setProperties] = useState(initialProperties);
    const handleDeleteProperty = async (propertyId: number | string) => {
        const confirmed = window.confirm('Are you sure, you want to delete property');
        if (! confirmed ) return;
        await deleteProperty(propertyId);
        const updatedProperties = properties.filter((property) => property._id !== propertyId);
        setProperties(updatedProperties);
        //set message
        toast.success('Property deleted successful!!!');
    }
    return properties.map((property, index) => {
        const { _id, name, images, location: { street, city, state } } = property;
        return (
            <div key={index} className="mb-10">
                <Link href={`properties/${_id}`}>
                    <Image
                        className="h-32 w-full rounded-md object-cover"
                        src={images[0]}
                        alt="Property 1"
                        width={1000}
                        height={200}
                    />
                </Link>
                <div className="mt-2">
                    <p className="text-lg font-semibold">{name}</p>
                    <p className="text-gray-600">Address: {street} {city},  {state}</p>
                </div>
                <div className="mt-2">
                    <Link
                        href={`/properties/${_id}/edit`}
                        className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                    >
                        Edit
                    </Link>
                    <button
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                        onClick={() => handleDeleteProperty(_id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    });
}

export default ProfileProperties;
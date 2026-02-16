"use client";
import {useEffect, useState} from 'react';
import { convertToSerializableObject } from "@/utils/convertToObject";
import getGeocodeAddress from '@/utils/getGeocodeAddress';

type PropertyMapProps = {
    property: {
        location: {
            street: string;
            city: string;
            state: string;
            zipcode: string;
        }
    }
};
const PropertyMap = ({property}: PropertyMapProps) => {
    property = convertToSerializableObject(property);
    const {location: {street, city, state, zipcode}} = property;
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 12,
        width: '100%',
        height: '500px'
    });
    const [loading, setLoading] = useState(true);
    const [geocodeError, setGeocodeError] = useState(false);
    useEffect(() => {
        const fetchCoords = async () => {
            try {
                const result = await getGeocodeAddress(`${street} ${city} ${state} ${zipcode}`);
                if (! result)   {
                    setGeocodeError(true);
                    return;
                }
                const {lat, lng} = result;
                console.log(lat, lng);
                setLat(lat);
                setLng(lng);
                setViewport({
                    ...viewport,
                    latitude: lat,
                    longitude: lng
                });
            } catch (err)   {
                console.log(err);
                setGeocodeError(true);
            } finally   {
                setLoading(false);
            }
        };
        fetchCoords();
    }, []);

    if (loading) return <h3>Loading ....</h3>;
    if (geocodeError) return <div className="text-xl">No location data found</div>
    return ( 
        <div>Latitude : {lat} , Longitude : {lng}</div>
     );
}
 
export default PropertyMap;
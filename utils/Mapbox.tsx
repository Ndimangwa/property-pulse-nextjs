"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
//Fix default marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});

type MapboxProps = {
    location: {
        lat: number | string;
        lng: number | string;
    }
};
const Mapbox = ({ location }: MapboxProps) => {
    const { lat, lng } = location;
    const position=[lat, lng];
    return (
        <MapContainer
            center={position}
            zoom={13}
            className="w-full h-full"
        >
            <TileLayer
                attribution="&copy;OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    This is Dar es Salaam
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default Mapbox;
"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

type Location = {
  id: string;
  lat: number;
  lng: number;
  locationTitle: string;
};

interface MapProps {
  itineraries: Location[];
}

export default function TripMap({ itineraries }: MapProps) {
  if (!itineraries?.length) {
    return (
      <div className="h-[500px] flex items-center justify-center border rounded-lg">
        No locations found
      </div>
    );
  }

  const center: [number, number] = [
    itineraries[0].lat,
    itineraries[0].lng,
  ];

  return (
    <MapContainer
      center={center}
      zoom={13}
      className="h-[500px] w-full"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {itineraries.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng]}
        >
          <Popup>{location.locationTitle}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

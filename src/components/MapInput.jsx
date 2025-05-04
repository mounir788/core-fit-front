import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { Error } from "../styles/generalStyles";

// Fix missing marker icons in some setups
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const LocationMarker = ({
  setLatLng,
  defaultPosition = { lat: 25.276987, lng: 55.296249 },
}) => {
  const [position, setPosition] = useState(defaultPosition);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setLatLng(e.latlng); // send lat/lng back to parent
    },
  });

  return position ? <Marker position={position} /> : null;
};

const MapInput = ({
  onChange,
  defaultPosition = [25.276987, 55.296249],
  error,
}) => {
  const handleSetLatLng = (coords) => {
    if (onChange) {
      onChange(coords);
    }
  };

  return (
    <div
      style={{ gridColumn: "1 / -1", borderRadius: "8px", overflow: "hidden" }}
    >
      <MapContainer
        center={defaultPosition} // Default to Dubai
        zoom={10}
        style={{
          height: "500px",
          width: "100%",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // attribution="&copy; OpenStreetMap contributors"
        />
        <LocationMarker
          setLatLng={handleSetLatLng}
          defaultPosition={{ lat: defaultPosition[0], lng: defaultPosition[1] }}
        />
      </MapContainer>

      {error && <Error>{error}</Error>}

      {/* {latLng && (
        <p className="mt-2">
          Selected: <strong>{latLng.lat.toFixed(6)}</strong>,{" "}
          <strong>{latLng.lng.toFixed(6)}</strong>
        </p>
      )} */}
    </div>
  );
};

export default MapInput;

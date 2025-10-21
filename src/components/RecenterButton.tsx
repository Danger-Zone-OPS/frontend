import { useMap } from "react-leaflet";
import type { Coordinate } from "../types";
import { FaLocationCrosshairs } from "react-icons/fa6";

export function RecenterButton({ location }: { location: Coordinate | null }) {
  const map = useMap();

  const handleClick = () => {
    if (location) {
      map.flyTo(location, 13);
    } else {
      alert("Location not available");
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 1000,
        padding: "8px 12px",
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      <FaLocationCrosshairs></FaLocationCrosshairs>
    </button>
  );
}

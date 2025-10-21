import { Marker } from "react-leaflet";
import L from "leaflet";
import type { Coordinate } from "../types";

interface PositionMarkerProps {
  position: Coordinate;
  heading?: number;
}

function createDirectedArrowIcon(heading: number) {
  return L.divIcon({
    html: `
      <div style="transform: rotate(${heading}deg); width: 40px; height: 40px;">
        <img src="/location-arrow-up-svgrepo-com.svg" style="width: 100%; height: 100%; filter: brightness(0) invert(1);" />
      </div>
    `,
    className: "",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}

export function PositionMarker({ position, heading = 0 }: PositionMarkerProps) {
  return <Marker position={position} icon={createDirectedArrowIcon(heading)} />;
}

import { MapContainer, TileLayer, Polygon, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression } from "leaflet";
import type { RiskArea, SeverityLevel } from "../types";
import { useEffect } from "react";
import { useGeolocation } from "../hooks/useGeolocation";

interface MapProps {
  riskAreas: RiskArea[];
  readonly?: boolean;
}

const severityColors: Record<SeverityLevel, string> = {
  low: "yellow",
  medium: "orange",
  high: "red",
  critical: "#8B0000",
};

export function Map({ riskAreas, readonly }: MapProps) {
  const { location, error } = useGeolocation();

  const defaultCenter: LatLngExpression = [55.6761, 12.5683];

  return (
    <MapContainer
      center={location ?? defaultCenter}
      zoom={location ? 13 : 2}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {location && <FlyToUserLocation location={location} />}

      {riskAreas.map((area) => {
        const positions: LatLngExpression[] = area.coordinates.map(
          ([lat, lng]) => [lat, lng] as LatLngExpression
        );
        const color = severityColors[area.severity];

        return (
          <Polygon
            key={area.id}
            positions={positions}
            pathOptions={{ color, fillColor: color, fillOpacity: 0.3 }}
            eventHandlers={{
              mouseover: (e) => e.target.setStyle({ fillOpacity: 0.5 }),
              mouseout: (e) => e.target.setStyle({ fillOpacity: 0.3 }),
            }}
          >
            <Popup>
              <strong>{area.title}</strong>
              <br />
              {area.description}
            </Popup>
          </Polygon>
        );
      })}
    </MapContainer>
  );
}

function FlyToUserLocation({ location }: { location: LatLngExpression }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(location, 13); // or map.setView(location, 13)
  }, [location, map]);

  return null;
}


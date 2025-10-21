import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Polygon,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useGeolocation } from "../hooks/useGeolocation";
import type { RiskArea, Coordinate, SeverityLevel } from "../types";
import { useHotkeys } from "react-hotkeys-hook";
import type { LeafletMouseEvent } from "leaflet";

interface MapProps {
  riskAreas: RiskArea[];
  readonly?: boolean;
  onPolygonCreated?: (coordinates: Coordinate[]) => void;
  onEditRiskArea?: (id: string) => void;
  onDeleteRiskArea?: (id: string) => void;
}

const severityColors: Record<SeverityLevel, string> = {
  low: "yellow",
  medium: "orange",
  high: "red",
  critical: "#8B0000",
};

export function Map(props: MapProps) {
  const geolocation = useGeolocation();
  const center: Coordinate = [55.6761, 12.5683];

  const [newAreaPoints, setNewAreaPoints] = useState<Coordinate[]>([]);

  const handleMapClick = (e: LeafletMouseEvent) => {
    if (props.readonly) return;
    setNewAreaPoints((prev) => [...prev, [e.latlng.lat, e.latlng.lng]]);
  };

  const handleEnterPressed = () => {
    if (
      props.readonly ||
      newAreaPoints.length === 0 ||
      !props.onPolygonCreated
    ) {
      return;
    }

    props.onPolygonCreated(newAreaPoints);
    setNewAreaPoints([]);
  };

  useHotkeys("enter", handleEnterPressed);

  return (
    <MapContainer
      center={geolocation.location ?? center}
      zoom={geolocation.location ? 13 : 2}
      style={{ height: "100vh", width: "100%" }}
    >
      <MapClickHandler onClick={handleMapClick} />

      {geolocation.location && (
        <FlyToUserLocation location={geolocation.location} />
      )}

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {newAreaPoints.length > 0 && (
        <Polygon
          positions={newAreaPoints}
          pathOptions={{
            color: "blue",
          }}
        />
      )}

      {props.riskAreas.map((area) => (
        <Polygon
          key={area.id}
          positions={area.coordinates}
          pathOptions={{
            color: severityColors[area.severity],
            fillColor: severityColors[area.severity],
            fillOpacity: 0.3,
          }}
          eventHandlers={{
            mouseover: (e) => e.target.setStyle({ fillOpacity: 0.5 }),
            mouseout: (e) => e.target.setStyle({ fillOpacity: 0.3 }),
          }}
        >
          <Popup>
            <strong>{area.title}</strong>
            <br />
            {area.description}
            <br />
            <button>Read more</button>
            {!props.readonly && (
              <>
                <button
                  onClick={() => {
                    if (props.onEditRiskArea && !props.readonly)
                      props.onEditRiskArea(area.id);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (props.onDeleteRiskArea && !props.readonly)
                      props.onDeleteRiskArea(area.id);
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </Popup>
        </Polygon>
      ))}
    </MapContainer>
  );
}

function FlyToUserLocation({ location }: { location: Coordinate }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(location, 13);
  }, [location, map]);

  return null;
}

function MapClickHandler({
  onClick,
}: {
  onClick: (e: LeafletMouseEvent) => void;
}) {
  useMapEvents({
    click: onClick,
  });

  return null;
}

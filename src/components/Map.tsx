import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import type { LatLngExpression, LeafletMouseEvent } from "leaflet";


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

export function Map() {
  const center: LatLngExpression = [55.6761, 12.5683];

  const [customZonePoints, setCustomZonePoints] = useState<LatLngExpression[]>([]);

  const handleMapClick = (e: LeafletMouseEvent) => {
    const newPoint: LatLngExpression = [e.latlng.lat, e.latlng.lng];
    setCustomZonePoints((prev) => [...prev, newPoint]);
    console.log("Added point:", newPoint);
  };

  const handleReset = () => {
    setCustomZonePoints([]);
  };

  const handlePolygonClick = (zoneName: string, e: LeafletMouseEvent) => {
    console.log(`${zoneName} clicked at:`, {
      lat: e.latlng.lat,
      lng: e.latlng.lng,
    });
  };

  const dangerZone1: LatLngExpression[] = [
    [55.68, 12.56],
    [55.69, 12.57],
    [55.685, 12.58],
    [55.675, 12.575],
  ];

  const dangerZone2: LatLngExpression[] = [
    [55.67, 12.55],
    [55.675, 12.555],
    [55.67, 12.56],
    [55.665, 12.555],
  ];

  return (
    <>
      <button
        onClick={handleReset}
        style={{
          position: "absolute",
          zIndex: 1000,
          top: 100,
          left: 100,
          padding: "8px 12px",
        }}
      >
        Reset Custom Zone
      </button>

      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        
        <MapClickHandler onClick={handleMapClick} />

        
        <Polygon
          positions={dangerZone1}
          pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.3 }}
          eventHandlers={{
            click: (e) => handlePolygonClick("Danger Zone 1", e),
            mouseover: (e) => e.target.setStyle({ fillOpacity: 0.5 }),
            mouseout: (e) => e.target.setStyle({ fillOpacity: 0.3 }),
          }}
        >
          <Popup>
            Danger Zone 1<br />
            Area: High Risk
          </Popup>
        </Polygon>

        <Polygon
          positions={dangerZone2}
          pathOptions={{ color: "orange", fillColor: "orange", fillOpacity: 0.3 }}
          eventHandlers={{
            click: (e) => handlePolygonClick("Danger Zone 2", e),
            mouseover: (e) => e.target.setStyle({ fillOpacity: 0.5 }),
            mouseout: (e) => e.target.setStyle({ fillOpacity: 0.3 }),
          }}
        >
          <Popup>
            Danger Zone 2<br />
            Area: Medium Risk
          </Popup>
        </Polygon>

       
        {customZonePoints.length > 2 && (
          <Polygon
            positions={customZonePoints}
            pathOptions={{ color: "purple", fillColor: "purple", fillOpacity: 0.4 }}
          >
            <Popup>Danger Zone</Popup>
          </Polygon>
        )}
        
        {customZonePoints.map((point, index) => (
          <Marker key={index} position={point}>
            <Popup>Point {index + 1}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}

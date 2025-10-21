import {
  MapContainer,
  TileLayer,
  Polygon,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression, LeafletMouseEvent } from "leaflet";

function MapClickHandler() {
  useMapEvents({
    click: (e: LeafletMouseEvent) => {
      console.log("Map clicked at:", {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });
  return null;
}

export function Map() {
  const center: LatLngExpression = [55.6761, 12.5683];

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
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapClickHandler />

      <Polygon
        positions={dangerZone1}
        pathOptions={{
          color: "red",
          fillColor: "red",
          fillOpacity: 0.3,
        }}
        eventHandlers={{
          click: (e) => handlePolygonClick("Danger Zone 1", e),
          mouseover: (e) => {
            e.target.setStyle({ fillOpacity: 0.5 });
          },
          mouseout: (e) => {
            e.target.setStyle({ fillOpacity: 0.3 });
          },
        }}
      >
        <Popup>
          Danger Zone 1<br />
          Area: High Risk
        </Popup>
      </Polygon>

      <Polygon
        positions={dangerZone2}
        pathOptions={{
          color: "orange",
          fillColor: "orange",
          fillOpacity: 0.3,
        }}
        eventHandlers={{
          click: (e) => handlePolygonClick("Danger Zone 2", e),
          mouseover: (e) => {
            e.target.setStyle({ fillOpacity: 0.5 });
          },
          mouseout: (e) => {
            e.target.setStyle({ fillOpacity: 0.3 });
          },
        }}
      >
        <Popup>
          Danger Zone 2<br />
          Area: Medium Risk
        </Popup>
      </Polygon>
    </MapContainer>
  );
}

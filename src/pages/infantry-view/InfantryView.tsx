import { useMemo } from "react";
import { useGeolocation } from "@uidotdev/usehooks";
import { Header } from "../../components/header/Header";
import { Map } from "../../components/Map";
import { WarningPopup, type WarningInfo } from "../../components/WarningPopup";
import { useRiskAreaStore } from "../../hooks/useRiskAreaStore";
import { isPointInPolygon, distanceToPolygon } from "../../utils/geometry";
import type { Coordinate } from "../../types";
import styles from "./InfantryView.module.css";

// Proximity threshold in meters
const PROXIMITY_THRESHOLD = 500;

export function InfantryView() {
  const riskAreas = useRiskAreaStore((state) => state.riskAreas);
  const geolocation = useGeolocation();

  const coordinates =
    geolocation.latitude && geolocation.longitude
      ? { latitude: geolocation.latitude, longitude: geolocation.longitude }
      : undefined;

  const userPosition: Coordinate | null =
    geolocation.latitude && geolocation.longitude
      ? [geolocation.latitude, geolocation.longitude]
      : null;

  const warnings = useMemo(() => {
    if (!userPosition) return [];

    const result: WarningInfo[] = [];

    for (const area of riskAreas) {
      const isInside = isPointInPolygon(userPosition, area.coordinates);

      if (isInside) {
        // User is inside the risk area
        result.push({ area, isInside: true });
      } else {
        // Check if user is nearby
        const distance = distanceToPolygon(userPosition, area.coordinates);
        if (distance <= PROXIMITY_THRESHOLD) {
          result.push({ area, isInside: false, distance });
        }
      }
    }

    // Sort: inside warnings first, then by distance
    return result.sort((a, b) => {
      if (a.isInside && !b.isInside) return -1;
      if (!a.isInside && b.isInside) return 1;
      if (!a.isInside && !b.isInside) {
        return (a.distance ?? 0) - (b.distance ?? 0);
      }
      return 0;
    });
  }, [userPosition, riskAreas]);

  return (
    <div className={styles.container}>
      <Header title="Infantry View" coordinates={coordinates} />
      <WarningPopup warnings={warnings} />
      <div className={styles.mapWrapper}>
        <Map riskAreas={riskAreas} readonly showLocationMarker />
      </div>
    </div>
  );
}

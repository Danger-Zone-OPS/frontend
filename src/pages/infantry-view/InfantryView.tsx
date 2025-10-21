import { useGeolocation } from "@uidotdev/usehooks";
import { Header } from "../../components/header/Header";
import { Map } from "../../components/Map";
import { useRiskAreaStore } from "../../hooks/useRiskAreaStore";
import styles from "./InfantryView.module.css";

export function InfantryView() {
  const riskAreas = useRiskAreaStore((state) => state.riskAreas);
  const geolocation = useGeolocation();

  const coordinates =
    geolocation.latitude && geolocation.longitude
      ? { latitude: geolocation.latitude, longitude: geolocation.longitude }
      : undefined;

  return (
    <div className={styles.container}>
      <Header title="Infantry View" coordinates={coordinates} />
      <div className={styles.mapWrapper}>
        <Map riskAreas={riskAreas} readonly showLocationMarker />
      </div>
    </div>
  );
}

import { Map } from "../../components/Map";
import { useRiskAreaStore } from "../../hooks/useRiskAreaStore";
import styles from "./InfantryView.module.css";

export function InfantryView() {
  const riskAreas = useRiskAreaStore((state) => state.riskAreas);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Infantry View</h1>
      </header>
      <div className={styles.mapWrapper}>
        <Map riskAreas={riskAreas} readonly />
      </div>
    </div>
  );
}

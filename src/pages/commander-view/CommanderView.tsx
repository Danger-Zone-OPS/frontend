import { Map } from "../../components/Map";
import type { RiskArea } from "../../types";
import styles from "./CommanderView.module.css";

const mockRiskAreas: RiskArea[] = [
  {
    id: "1",
    title: "Danger Zone 1",
    description: "Area: High Risk",
    severity: "high",
    coordinates: [
      [55.68, 12.56],
      [55.69, 12.57],
      [55.685, 12.58],
      [55.675, 12.575],
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Danger Zone 2",
    description: "Area: Medium Risk",
    severity: "medium",
    coordinates: [
      [55.67, 12.55],
      [55.675, 12.555],
      [55.67, 12.56],
      [55.665, 12.555],
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function CommanderView() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Commander View</h1>
      </header>
      <div className={styles.mapWrapper}>
        <Map riskAreas={mockRiskAreas} />
      </div>
    </div>
  );
}

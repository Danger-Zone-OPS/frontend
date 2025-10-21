import { useState } from "react";
import { Map } from "../../components/Map";
import type { Coordinate } from "../../types";
import { useRiskAreaStore } from "../../hooks/useRiskAreaStore";
import styles from "./CommanderView.module.css";
import { Modal } from "../../components/modal/Modal";

export function CommanderView() {
  const riskAreas = useRiskAreaStore((state) => state.riskAreas);

  const handlePolygonCreated = (coordinates: Coordinate[]) => {
    setNewPolygonCoords(coordinates);
    setIsModalOpen(true);
  };

  const handleEditRiskArea = (id: string) => {
    // TODO: Open modal with existing data for editing
    // Then make PUT request to /api/risk-areas/:id
    console.log("Edit risk area:", id);
  };

  const handleDeleteRiskArea = (id: string) => {
    // TODO: Show confirmation modal
    // Then make DELETE request to /api/risk-areas/:id
    console.log("Delete risk area:", id);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPolygonCoords, setNewPolygonCoords] = useState<Coordinate[] | null>(
    null
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Commander View</h1>
      </header>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className={styles.mapWrapper}>
        <Map
          riskAreas={riskAreas}
          onPolygonCreated={handlePolygonCreated}
          onEditRiskArea={handleEditRiskArea}
          onDeleteRiskArea={handleDeleteRiskArea}
        />
      </div>
    </div>
  );
}

import { useState } from "react";
import { Map } from "../../components/Map";
import { Modal, type RiskAreaFormData } from "../../components/modal/Modal";
import type { Coordinate, RiskArea } from "../../types";
import { useRiskAreaStore } from "../../hooks/useRiskAreaStore";
import * as api from "../../services/api";
import styles from "./CommanderView.module.css";

export function CommanderView() {
  const riskAreas = useRiskAreaStore((state) => state.riskAreas);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingCoordinates, setPendingCoordinates] = useState<
    Coordinate[] | undefined
  >();
  const [editingRiskArea, setEditingRiskArea] = useState<
    RiskArea | undefined
  >();

  const handlePolygonCreated = (coordinates: Coordinate[]) => {
    setPendingCoordinates(coordinates);
    setEditingRiskArea(undefined);
    setIsModalOpen(true);
  };

  const handleEditRiskArea = (id: string) => {
    const riskArea = riskAreas.find((area) => area.id === id);
    if (riskArea) {
      setEditingRiskArea(riskArea);
      setPendingCoordinates(undefined);
      setIsModalOpen(true);
    }
  };

  const handleDeleteRiskArea = async (id: string) => {
    try {
      await api.deleteRiskArea(id);
      // WebSocket will handle updating the store
    } catch (error) {
      console.error("Failed to delete risk area:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete risk area"
      );
    }
  };

  const handleModalSubmit = async (data: RiskAreaFormData) => {
    try {
      if (editingRiskArea) {
        // Update existing risk area
        await api.updateRiskArea(editingRiskArea.id, {
          title: data.title,
          description: data.description,
          severity: data.severity,
        });
      } else {
        // Create new risk area
        await api.createRiskArea({
          title: data.title,
          description: data.description,
          severity: data.severity,
          coordinates: data.coordinates,
        });
      }
      // WebSocket will handle updating the store
    } catch (error) {
      console.error("Failed to save risk area:", error);
      alert(
        error instanceof Error ? error.message : "Failed to save risk area"
      );
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setPendingCoordinates(undefined);
    setEditingRiskArea(undefined);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Commander View</h1>
      </header>
      <div className={styles.mapWrapper}>
        <Map
          riskAreas={riskAreas}
          onPolygonCreated={handlePolygonCreated}
          onEditRiskArea={handleEditRiskArea}
          onDeleteRiskArea={handleDeleteRiskArea}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        coordinates={pendingCoordinates}
        existingRiskArea={editingRiskArea}
      />
    </div>
  );
}

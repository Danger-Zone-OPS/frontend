import { useState, useEffect } from "react";
import type { SeverityLevel, Coordinate, RiskArea } from "../../types";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RiskAreaFormData) => void;
  coordinates?: Coordinate[];
  existingRiskArea?: RiskArea;
}

export interface RiskAreaFormData {
  title: string;
  description: string;
  severity: SeverityLevel;
  coordinates: Coordinate[];
}

export function Modal({
  isOpen,
  onClose,
  onSubmit,
  coordinates,
  existingRiskArea,
}: ModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<SeverityLevel>("medium");

  // Populate form when editing
  useEffect(() => {
    if (existingRiskArea) {
      setTitle(existingRiskArea.title);
      setDescription(existingRiskArea.description);
      setSeverity(existingRiskArea.severity);
    } else {
      // Reset form when creating new
      setTitle("");
      setDescription("");
      setSeverity("medium");
    }
  }, [existingRiskArea, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formCoordinates = existingRiskArea
      ? existingRiskArea.coordinates
      : coordinates || [];

    if (formCoordinates.length === 0) {
      alert("No coordinates provided");
      return;
    }

    onSubmit({
      title,
      description,
      severity,
      coordinates: formCoordinates,
    });

    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{existingRiskArea ? "Edit Risk Area" : "Create Risk Area"}</h2>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g., Danger Zone Alpha"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Describe the risk area and any relevant details..."
              rows={4}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="severity">Severity Level</label>
            <select
              id="severity"
              value={severity}
              onChange={(e) => setSeverity(e.target.value as SeverityLevel)}
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          {!existingRiskArea && coordinates && (
            <div className={styles.info}>
              Polygon points: {coordinates.length}
            </div>
          )}

          <div className={styles.actions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              {existingRiskArea ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

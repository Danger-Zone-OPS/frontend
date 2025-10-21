import styles from "./ReadMoreView.module.css";
import { useParams } from "react-router";
import { useRiskAreaStore } from "../../hooks/useRiskAreaStore";
import { FaArrowLeft } from "react-icons/fa";

export function ReadMoreView() {
  const { id } = useParams<{ id: string }>();
  const riskAreas = useRiskAreaStore((state) => state.riskAreas);
  const area = riskAreas.find((a) => a.id === id);

  const severityClass = area ? styles[`severity-${area.severity}`] || "" : "";

  return (
    <div className={styles.overlay}>
      <div className={styles.message}>
        <h2 className={`${styles.heading} ${severityClass}`}>
          {area ? area.title : "Risk Area not found"}
        </h2>
        {area && <p>{area.description}</p>}
        <button className={styles.backButton} onClick={() => history.back()}>
          <FaArrowLeft />
        </button>
      </div>
    </div>
  );
}

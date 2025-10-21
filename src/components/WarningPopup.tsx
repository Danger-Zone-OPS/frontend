import { motion, AnimatePresence } from "framer-motion";
import { MdWarning, MdWarningAmber } from "react-icons/md";
import type { RiskArea } from "../types";
import styles from "./WarningPopup.module.css";

export interface WarningInfo {
  area: RiskArea;
  isInside: boolean;
  distance?: number;
}

interface WarningPopupProps {
  warnings: WarningInfo[];
}

export function WarningPopup({ warnings }: WarningPopupProps) {
  if (warnings.length === 0) return null;

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {warnings.map((warning, index) => {
          const { area, isInside, distance } = warning;
          const isProximity = !isInside;

          return (
            <motion.div
              key={area.id}
              className={`${styles.warning} ${styles[area.severity]} ${
                isProximity ? styles.proximity : ""
              }`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className={styles.iconWrapper}>
                {isProximity ? (
                  <MdWarningAmber size={24} />
                ) : (
                  <MdWarning size={24} />
                )}
              </div>
              <div className={styles.content}>
                <h4 className={styles.title}>
                  {isProximity ? "NEARBY: " : ""}
                  {area.title}
                </h4>
                <p className={styles.description}>{area.description}</p>
                {isProximity && distance !== undefined && (
                  <p className={styles.distance}>
                    {distance < 1000
                      ? `${Math.round(distance)}m away`
                      : `${(distance / 1000).toFixed(1)}km away`}
                  </p>
                )}
                <span className={styles.severity}>
                  {area.severity.toUpperCase()}
                </span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

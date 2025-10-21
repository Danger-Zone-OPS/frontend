import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdMenu, MdClose, MdMyLocation } from "react-icons/md";
import styles from "./Header.module.css";

interface HeaderProps {
  title: string;
  coordinates?: { latitude: number; longitude: number };
}

export function Header({ title, coordinates }: HeaderProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <motion.header
            className={styles.headerExpanded}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.headerContent}>
              <section className={styles.headerLeft}>
                <h3>{title}</h3>
              </section>
              <section className={styles.headerCenter}>
                {coordinates && (
                  <div className={styles.coordinates}>
                    <MdMyLocation size={16} />
                    <span>
                      {coordinates.latitude.toFixed(6)}, {coordinates.longitude.toFixed(6)}
                    </span>
                  </div>
                )}
              </section>
              <section className={styles.headerRight}>
                <button
                  className={styles.toggleButton}
                  onClick={() => setIsExpanded(false)}
                  aria-label="Minimize header"
                >
                  <MdClose size={24} />
                </button>
              </section>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isExpanded && (
          <motion.button
            className={styles.headerMinimized}
            onClick={() => setIsExpanded(true)}
            aria-label="Expand header"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <MdMenu size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

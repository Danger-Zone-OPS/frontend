import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>
          ✕
        </button>
        <>
          <h2>Danger Zone</h2>
          <p>Farligt område!!! Riskläge: Rosengård-level</p>
        </>{" "}
      </div>
    </div>
  );
};

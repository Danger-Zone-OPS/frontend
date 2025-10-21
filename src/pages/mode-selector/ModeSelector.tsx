import styles from "./ModeSelector.module.css";
import { Link } from "react-router";
import { ROUTES } from "../../router";
import { FaPersonMilitaryRifle } from "react-icons/fa6";
import { TbMilitaryRank } from "react-icons/tb";

export function ModeSelector() {
  return (
    <main className={styles.modeSelector}>
      <h1 className={styles.title}>Danger Zone Ops</h1>
      <div className={styles.pageLinkContainer}>
        <Link className={styles.pageLink} to={ROUTES.Commander}>
          <h3>
            <TbMilitaryRank />
            <span>Commander View</span>
          </h3>
          <p>
            Create, edit and remove risk areas. This will then be displayed to
            the infantry.
          </p>
        </Link>
        <Link className={styles.pageLink} to={ROUTES.Infantry}>
          <h3>
            <FaPersonMilitaryRifle />
            <span>Infantry View</span>
          </h3>
          <p>
            Map that helps the infantry by warning and potentially avoiding risk
            areas while out in the field.
          </p>
        </Link>
      </div>
    </main>
  );
}

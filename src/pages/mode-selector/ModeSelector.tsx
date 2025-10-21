import styles from "./ModeSelector.module.css";
import { Link } from "react-router";
import { ROUTES } from "../../router";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineNordicWalking,
} from "react-icons/md";

export function ModeSelector() {
  return (
    <main className={styles.modeSelector}>
      <h1 className={styles.title}>Danger Zone Ops</h1>
      <div className={styles.pageLinkContainer}>
        <Link className={styles.pageLink} to={ROUTES.Commander}>
          <h3>
            <MdOutlineAdminPanelSettings />
            <span>Commander View</span>
          </h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni
            accusantium commodi ab suscipit, labore repellat iste natus
            necessitatibus dolor maiores et, nesciunt dolore at, nobis deserunt
            consequuntur est laboriosam perferendis?
          </p>
        </Link>
        <Link className={styles.pageLink} to={ROUTES.Infantry}>
          <h3>
            <MdOutlineNordicWalking />
            <span>Infantry View</span>
          </h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni
            accusantium commodi ab suscipit, labore repellat iste natus
            necessitatibus dolor maiores et, nesciunt dolore at, nobis deserunt
            consequuntur est laboriosam perferendis?
          </p>
        </Link>
      </div>
    </main>
  );
}

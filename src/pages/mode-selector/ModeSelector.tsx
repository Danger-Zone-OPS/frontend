import { Link } from "react-router";
import { ROUTES } from "../../router";

export function ModeSelector() {
  return (
    <div>
      <Link to={ROUTES.Commander}>Commander View</Link>
      <Link to={ROUTES.Infantry}>Infantry View</Link>
    </div>
  );
}

import { createBrowserRouter } from "react-router";
import { ModeSelector } from "./pages/mode-selector/ModeSelector";
import { CommanderView } from "./pages/commander-view/CommanderView";
import { InfantryView } from "./pages/infantry-view/InfantryView";

export const ROUTES = {
  Index: "/",
  Commander: "/commander",
  Infantry: "/infantry",
} as const;

export type Routes = (typeof ROUTES)[keyof typeof ROUTES];

export const router = createBrowserRouter([
  {
    index: true,
    path: ROUTES.Index,
    element: <ModeSelector />,
  },
  {
    path: ROUTES.Commander,
    element: <CommanderView />,
  },
  {
    path: ROUTES.Infantry,
    element: <InfantryView />,
  },
]);

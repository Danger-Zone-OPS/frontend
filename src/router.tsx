import { createBrowserRouter } from "react-router";
import { App } from "./App";
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
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
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
    ],
  },
]);

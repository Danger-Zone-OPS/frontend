import { useEffect } from "react";
import { Outlet } from "react-router";
import { useRiskAreaStore } from "./hooks/useRiskAreaStore";

export function App() {
  const initialize = useRiskAreaStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <Outlet />;
}

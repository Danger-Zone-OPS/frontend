import { create } from "zustand";
import type { RiskArea } from "../types";

interface RiskAreaStore {
  riskAreas: RiskArea[];
  addRiskAreas: (riskAreas: RiskArea[]) => void;
  updateRiskArea: (id: string, edits: Partial<RiskArea>) => void;
  deleteRiskArea: (id: string) => void;
  clearRiskAreas: () => void;
}

export const useRiskAreaStore = create<RiskAreaStore>((set) => ({
  riskAreas: [],

  addRiskAreas: (riskAreas) =>
    set((state) => ({
      riskAreas: [...state.riskAreas, ...riskAreas],
    })),

  updateRiskArea: (id, edits) =>
    set((state) => ({
      riskAreas: state.riskAreas.map((area) =>
        area.id === id ? { ...area, ...edits } : area
      ),
    })),

  deleteRiskArea: (id) =>
    set((state) => ({
      riskAreas: state.riskAreas.filter((area) => area.id !== id),
    })),

  clearRiskAreas: () =>
    set({
      riskAreas: [],
    }),
}));

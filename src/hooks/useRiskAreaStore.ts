import { create } from "zustand";
import type { RiskArea } from "../types";
import { websocketService, type WebSocketMessage } from "../services/websocket";
import { fetchRiskAreas } from "../services/api";

interface RiskAreaStore {
  riskAreas: RiskArea[];
  isLoading: boolean;
  error: string | null;
  addRiskArea: (riskArea: RiskArea) => void;
  setRiskAreas: (riskAreas: RiskArea[]) => void;
  updateRiskArea: (id: string, edits: Partial<RiskArea>) => void;
  deleteRiskArea: (id: string) => void;
  clearRiskAreas: () => void;
  initialize: () => Promise<void>;
}

export const useRiskAreaStore = create<RiskAreaStore>((set, get) => ({
  riskAreas: [],
  isLoading: false,
  error: null,

  addRiskArea: (riskArea) =>
    set((state) => {
      // Prevent duplicates - only add if ID doesn't already exist
      const exists = state.riskAreas.some((area) => area.id === riskArea.id);
      if (exists) {
        return state;
      }
      return {
        riskAreas: [...state.riskAreas, riskArea],
      };
    }),

  setRiskAreas: (riskAreas) =>
    set({
      riskAreas,
      isLoading: false,
      error: null,
    }),

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

  initialize: async () => {
    set({ isLoading: true, error: null });

    try {
      // Fetch initial data from API
      const riskAreas = await fetchRiskAreas();
      set({ riskAreas, isLoading: false });

      // Connect to WebSocket
      websocketService.connect();

      // Handle WebSocket messages
      websocketService.onMessage((message: WebSocketMessage) => {
        switch (message.type) {
          case "connection":
            console.log("WebSocket connection established:", message.message);
            break;

          case "create":
            if (message.data && "title" in message.data) {
              get().addRiskArea(message.data as RiskArea);
            }
            break;

          case "update":
            if (message.data && "id" in message.data) {
              const updated = message.data as RiskArea;
              get().updateRiskArea(updated.id, updated);
            }
            break;

          case "delete":
            if (message.data && "id" in message.data) {
              get().deleteRiskArea(message.data.id);
            }
            break;
        }
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to initialize",
      });
      console.error("Failed to initialize risk area store:", error);
    }
  },
}));

import { config } from "../config";
import type { RiskArea } from "../types";

export async function fetchRiskAreas(): Promise<RiskArea[]> {
  const response = await fetch(`${config.apiUrl}/api/risk-areas`);
  if (!response.ok) {
    throw new Error(`Failed to fetch risk areas: ${response.statusText}`);
  }
  const json = await response.json();
  return json.data;
}

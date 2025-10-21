import { config } from "../config";
import type { RiskArea, CreateRiskAreaInput, UpdateRiskAreaInput } from "../types";

export async function fetchRiskAreas(): Promise<RiskArea[]> {
  const response = await fetch(`${config.apiUrl}/api/risk-areas`);
  if (!response.ok) {
    throw new Error(`Failed to fetch risk areas: ${response.statusText}`);
  }
  const json = await response.json();
  return json.data;
}

export async function createRiskArea(
  input: CreateRiskAreaInput
): Promise<RiskArea> {
  const response = await fetch(`${config.apiUrl}/api/risk-areas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create risk area");
  }

  const json = await response.json();
  return json.data;
}

export async function updateRiskArea(
  id: string,
  input: UpdateRiskAreaInput
): Promise<RiskArea> {
  const response = await fetch(`${config.apiUrl}/api/risk-areas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update risk area");
  }

  const json = await response.json();
  return json.data;
}

export async function deleteRiskArea(id: string): Promise<void> {
  const response = await fetch(`${config.apiUrl}/api/risk-areas/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete risk area");
  }
}

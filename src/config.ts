const API_HOST = import.meta.env.VITE_API_HOST || "localhost";
const API_PORT = import.meta.env.VITE_API_PORT || "8080";

export const config = {
  apiUrl: `http://${API_HOST}:${API_PORT}`,
  wsUrl: `ws://${API_HOST}:${API_PORT}/ws`,
} as const;

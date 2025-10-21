import { config } from "../config";
import type { RiskArea } from "../types";

export interface WebSocketMessage {
  type: "connection" | "create" | "update" | "delete";
  message?: string;
  data?: RiskArea | { id: string };
}

type MessageHandler = (message: WebSocketMessage) => void;

class WebSocketService {
  private ws: WebSocket | null = null;
  private messageHandlers: Set<MessageHandler> = new Set();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      console.log("WebSocket already connected");
      return;
    }

    console.log(`Connecting to WebSocket: ${config.wsUrl}`);
    this.ws = new WebSocket(config.wsUrl);

    this.ws.onopen = () => {
      console.log("WebSocket connected");
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        console.log("WebSocket message received:", message);
        this.notifyHandlers(message);
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    this.ws.onclose = () => {
      console.log("WebSocket disconnected");
      this.attemptReconnect();
    };
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * this.reconnectAttempts;
      console.log(
        `Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${delay}ms`
      );
      setTimeout(() => this.connect(), delay);
    } else {
      console.error("Max reconnection attempts reached");
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.reconnectAttempts = this.maxReconnectAttempts; // Prevent auto-reconnect
  }

  onMessage(handler: MessageHandler): () => void {
    this.messageHandlers.add(handler);
    // Return cleanup function
    return () => {
      this.messageHandlers.delete(handler);
    };
  }

  private notifyHandlers(message: WebSocketMessage): void {
    this.messageHandlers.forEach((handler) => handler(message));
  }
}

export const websocketService = new WebSocketService();

import { BehaviorSubject } from "rxjs";
import { ElasticsearchConfig, Status } from "../types";
import io, { Socket } from "socket.io-client";

const port = process.env.REACT_APP_ELASTICSEARCH_PORT || 3020;
const host = process.env.REACT_APP_ELASTICSEARCH_HOST || "localhost";

export class ElasticsearchService {
  public elasticsearchEmitter = new BehaviorSubject<Status>("off");
  
  private socket!: Socket;
  private userId!: string;

  constructor() {}

  public async init() {
    return new Promise<void>((resolve, reject) => {
      this.socket = io("http://localhost:3010");

      this.socket.on("connect", () => {
        console.log("Elasticsearch connected");
      });

      this.socket.on("message", (event: any) => {
        const data = JSON.parse(event);

        if (data.type === "connected") {
          this.userId = data.userId;
          console.log(this.userId, data)
          resolve();
        }

        if (data.type === "engine") {
          this.elasticsearchEmitter.next(data.status);
        }
      });

      this.socket.on("", () => {});

      this.socket.on("error", (error: any) => {
        console.error("WebSocket error:", error);
        reject(error);
      });

      this.socket.on("disconnect", () => {
        console.log("WebSocket closed");
      });
    });
  }

  public async switchOn(): Promise<void> {
    const response = await fetch(
      `http://${host}:${port}/api/action?userId=${this.userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "start" }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to switch on: ${response.statusText}`);
    }

    await response;

    return;
  }

  public async switchOff(): Promise<void> {
    const response = await fetch(
      `http://${host}:${port}/api/action?userId=${this.userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "stop" }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update config: ${response.statusText}`);
    }

    await response;

    return;
  }

  public async getStatus() {
    const response = await fetch(
      `http://${host}:${port}/api/status?userId=${this.userId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch status: ${response.statusText}`);
    }

    const data = await response.json();

    return data.status;
  }

  public async getConfig() {
    const response = await fetch(
      `http://${host}:${port}/api/config?userId=${this.userId}`
    );

    console.log("config", response);

    if (!response.ok) {
      throw new Error(`Failed to fetch config: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  }

  public async setConfig(newConfig: ElasticsearchConfig) {
    const response = await fetch(
      `http://${host}:${port}/api/config?userId=${this.userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newConfig),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update config: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  }

  public close() {
    this.socket.close();
  }
}

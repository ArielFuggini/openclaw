// Minimal stub
import type { GatewayService } from "./service.js";

export function getNodeServiceStatus(): null {
  return null;
}

export function resolveNodeService(): GatewayService {
  return {
    label: "openclaw-node",
    loadedText: "loaded",
    notLoadedText: "not loaded",
    isLoaded: async () => false,
    readRuntime: async () => undefined,
    readCommand: async () => null,
  };
}

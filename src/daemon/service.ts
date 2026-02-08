// Minimal stub - daemon service removed
import type { GatewayServiceRuntime } from "./service-runtime.js";

export type GatewayService = {
  label: string;
  loadedText: string;
  notLoadedText: string;
  isLoaded(opts: { env: Record<string, string | undefined> }): Promise<boolean>;
  readRuntime(env: Record<string, string | undefined>): Promise<GatewayServiceRuntime | undefined>;
  readCommand(env: Record<string, string | undefined>): Promise<string | null>;
};

export function isDaemonRunning(): boolean {
  return false;
}

export function getDaemonStatus(): { running: boolean; pid?: number } {
  return { running: false };
}

export async function startDaemon(): Promise<void> {
  throw new Error("Daemon service not available in minimal build");
}

export async function stopDaemon(): Promise<void> {
  // no-op
}

export function resolveGatewayService(): GatewayService {
  return {
    label: "openclaw-gateway",
    loadedText: "loaded",
    notLoadedText: "not loaded",
    isLoaded: async () => false,
    readRuntime: async () => undefined,
    readCommand: async () => null,
  };
}

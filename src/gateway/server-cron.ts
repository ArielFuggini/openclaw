// Minimal stub - gateway cron service builder
import type { CliDeps } from "../cli/deps.js";
import type { loadConfig } from "../config/config.js";
import type { CronService } from "../cron/types.js";
import { createCronService } from "../cron/service.js";

export type GatewayCronState = {
  cron: CronService;
  storePath: string;
};

/**
 * Build a gateway cron service. Returns a no-op cron when the real
 * implementation is not available.
 */
export function buildGatewayCronService(_opts: {
  cfg: ReturnType<typeof loadConfig>;
  deps: CliDeps;
  broadcast: (event: string, payload: unknown, opts?: { dropIfSlow?: boolean }) => void;
}): GatewayCronState {
  return {
    cron: createCronService(),
    storePath: "",
  };
}

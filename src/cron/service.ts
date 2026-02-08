// Minimal stub - cron service removed
import type { CronService } from "./types.js";

export type { CronService };

export function createCronService(): CronService {
  return {
    start: async () => {},
    stop: async () => {},
    listJobs: () => [],
  };
}

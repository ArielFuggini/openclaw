// Minimal stub - cron types
export type CronJob = {
  id: string;
  name?: string;
  schedule: string | { kind: string; atMs: number; [key: string]: unknown };
  command?: string;
  enabled: boolean;
  createdAtMs?: number;
  updatedAtMs?: number;
  sessionTarget?: string;
  wakeMode?: string;
  payload?: Record<string, unknown>;
  state?: Record<string, unknown>;
};

export type CronService = {
  start: () => Promise<void>;
  stop: () => Promise<void>;
  listJobs: () => CronJob[];
};

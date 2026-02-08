// Minimal stub
export type GatewayServiceRuntime = {
  status?: string;
  pid?: number;
  state?: string;
  subState?: string;
  lastExitStatus?: number;
  lastExitReason?: string;
  lastRunResult?: string;
  lastRunTime?: string;
  detail?: string;
  cachedLabel?: boolean;
  missingUnit?: boolean;
};

export function getDaemonServiceRuntime(): null {
  return null;
}

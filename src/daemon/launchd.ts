// Minimal stub - launchd service removed
export function isLaunchdInstalled(): boolean {
  return false;
}

export function resolveGatewayLogPaths(_env?: Record<string, string | undefined>): {
  stdoutPath: string;
  stderrPath: string;
  logDir: string;
} {
  return { stdoutPath: "", stderrPath: "", logDir: "" };
}

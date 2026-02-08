// Minimal stub - daemon constants
export const DAEMON_PORT = 18789;
export const DAEMON_PID_FILE = "";
export const DAEMON_LOG_FILE = "";
export const DAEMON_SERVICE_NAME = "openclaw-gateway";

export function resolveGatewayLaunchAgentLabel(_profile?: string): string {
  return "ai.openclaw.gateway";
}

export function resolveGatewaySystemdServiceName(_profile?: string): string {
  return "openclaw-gateway";
}

export function resolveGatewayWindowsTaskName(_profile?: string): string {
  return "OpenClawGateway";
}

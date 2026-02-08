// Minimal stub
export function createIsolatedCronAgent(): null {
  return null;
}

export async function runCronIsolatedAgentTurn(_params: {
  cfg: unknown;
  deps: unknown;
  job: unknown;
  message: string;
  sessionKey: string;
  lane: string;
}): Promise<{ status: string; summary?: string; error?: string }> {
  return { status: "skipped", summary: "Cron agent not available in minimal build" };
}

// Minimal stub - pairing functionality removed
export async function readChannelAllowFromStore(_channel: string): Promise<string[]> {
  return [];
}

export async function addChannelAllowFromStoreEntry(_params: {
  channel: string;
  entry: string;
}): Promise<void> {
  // no-op
}

export async function removeChannelAllowFromStoreEntry(_params: {
  channel: string;
  entry: string;
}): Promise<void> {
  // no-op
}

export async function upsertChannelPairingRequest(_params: {
  channel: string;
  id: string;
  meta?: Record<string, unknown>;
}): Promise<{ code: string; created: boolean }> {
  return { code: "", created: false };
}

export function listPairingLabels(): string[] {
  return [];
}

export function readPairingStore(): Record<string, unknown> {
  return {};
}

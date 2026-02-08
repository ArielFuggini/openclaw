// Minimal stub for test port allocation
let nextPort = 19000;

export function getTestPort(): number {
  return nextPort++;
}

export function reserveTestPort(): number {
  return getTestPort();
}

export async function getDeterministicFreePortBlock(
  _opts: { offsets: number[] } | number,
): Promise<number> {
  const port = nextPort;
  nextPort += 10;
  return port;
}

// Minimal stub - legacy manifest/config name normalization
const LEGACY_NAME_MAP: Record<string, string> = {};

export function normalizeLegacyName(name: string): string {
  return LEGACY_NAME_MAP[name] ?? name;
}

export function isLegacyName(name: string): boolean {
  return name in LEGACY_NAME_MAP;
}

export function legacyNameEntries(): Array<[string, string]> {
  return Object.entries(LEGACY_NAME_MAP);
}

export const MANIFEST_KEY = "openclaw" as const;
export const LEGACY_MANIFEST_KEYS: string[] = [];

// Minimal stub - systemd hints removed
export function formatSystemdHints(): string {
  return "";
}

export function isSystemdUnavailableDetail(_detail?: string): boolean {
  return false;
}

export function renderSystemdUnavailableHints(_opts?: { wsl?: boolean }): string[] {
  return [];
}

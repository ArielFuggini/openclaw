// Minimal stub - TTS functionality removed
export async function textToSpeechTelephony(): Promise<null> {
  return null;
}

export function isTtsEnabled(): boolean {
  return false;
}

export function resolveTtsProvider(): string | null {
  return null;
}

export function buildTtsSystemPromptHint(_config: unknown): string | undefined {
  return undefined;
}

export async function maybeApplyTtsToPayload(params: {
  payload: { text?: string; mediaUrl?: string; [key: string]: unknown };
  [key: string]: unknown;
}): Promise<{ text?: string; mediaUrl?: string; [key: string]: unknown }> {
  return params.payload;
}

export function normalizeTtsAutoMode(_value: unknown): string | undefined {
  return undefined;
}

export function resolveTtsConfig(_config: unknown): { mode?: string; [key: string]: unknown } {
  return {};
}

export function getTtsMaxLength(_prefsPath?: string): number {
  return 0;
}

export function getTtsProvider(_config: unknown, _prefsPath?: string): string | null {
  return null;
}

export function isSummarizationEnabled(_prefsPath?: string): boolean {
  return false;
}

export function resolveTtsAutoMode(_params: {
  config?: unknown;
  prefsPath?: string;
  sessionAuto?: unknown;
}): string {
  return "off";
}

export function resolveTtsPrefsPath(_config: unknown): string {
  return "";
}

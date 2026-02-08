// Minimal stub - wizard session tracking
export type WizardSession = {
  id: string;
  channelId?: string;
  accountId?: string;
  step?: string;
};

export function createWizardSession(): WizardSession {
  return { id: "stub" };
}

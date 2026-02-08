// Minimal stub - wizard session tracker for gateway
import type { WizardSession } from "../wizard/session.js";

/**
 * Create a wizard session tracker. Returns a no-op tracker when the real
 * implementation is not available.
 */
export function createWizardSessionTracker() {
  const wizardSessions = new Map<string, WizardSession>();

  const findRunningWizard = (): string | null => {
    const entries = Array.from(wizardSessions.entries());
    for (let i = 0; i < entries.length; i++) {
      const [id, session] = entries[i];
      if (session.id) return id;
    }
    return null;
  };

  const purgeWizardSession = (id: string): void => {
    wizardSessions.delete(id);
  };

  return { wizardSessions, findRunningWizard, purgeWizardSession };
}

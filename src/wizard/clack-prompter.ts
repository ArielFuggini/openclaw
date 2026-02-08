// Minimal stub for clack-based CLI prompter
import type { WizardPrompter } from "./prompts.js";

export function createClackPrompter(): WizardPrompter {
  throw new Error("Wizard prompter not available in minimal build");
}

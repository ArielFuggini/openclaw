import type { RuntimeEnv } from "../runtime.js";
import type { WizardSection } from "./configure.shared.js";
import { defaultRuntime } from "../runtime.js";

export async function configureCommand(runtime: RuntimeEnv = defaultRuntime) {
  runtime.error("The configure wizard is not available in this build.");
  runtime.exit(1);
}

export async function configureCommandWithSections(
  _sections: WizardSection[],
  runtime: RuntimeEnv = defaultRuntime,
) {
  runtime.error("The configure wizard is not available in this build.");
  runtime.exit(1);
}

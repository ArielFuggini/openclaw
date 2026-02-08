import type { RuntimeEnv } from "../runtime.js";
import type { OnboardOptions } from "./onboard-types.js";
import { defaultRuntime } from "../runtime.js";

export async function runNonInteractiveOnboarding(
  _opts: OnboardOptions,
  runtime: RuntimeEnv = defaultRuntime,
) {
  runtime.error("Non-interactive onboarding is not available in this build.");
  runtime.exit(1);
}

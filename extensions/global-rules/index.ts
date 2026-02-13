import fs from "node:fs/promises";
import path from "node:path";
import type { OpenClawPluginApi } from "openclaw/plugin-sdk";

// Cache for strict rules (loaded once, ships with plugin).
let cachedStrictRules: string | undefined;

function stripFrontMatter(raw: string): string {
  let content = raw;
  if (content.startsWith("---")) {
    const endIndex = content.indexOf("\n---", 3);
    if (endIndex !== -1) {
      content = content.slice(endIndex + "\n---".length).replace(/^\s+/, "");
    }
  }
  return content.trim();
}

async function loadStrictRules(templatePath: string): Promise<string | undefined> {
  if (cachedStrictRules !== undefined) {
    return cachedStrictRules || undefined;
  }
  try {
    const raw = await fs.readFile(templatePath, "utf-8");
    cachedStrictRules = stripFrontMatter(raw);
    return cachedStrictRules || undefined;
  } catch {
    cachedStrictRules = "";
    return undefined;
  }
}

async function loadOperatorRules(rulesPath: string): Promise<string | undefined> {
  try {
    const content = await fs.readFile(rulesPath, "utf-8");
    const trimmed = content.trim();
    return trimmed || undefined;
  } catch {
    return undefined;
  }
}

async function ensureOperatorRulesFile(rulesPath: string, templatePath: string): Promise<void> {
  try {
    await fs.access(rulesPath);
    return; // already exists
  } catch {
    // missing — create from template
  }
  try {
    const raw = await fs.readFile(templatePath, "utf-8");
    const content = stripFrontMatter(raw);
    await fs.mkdir(path.dirname(rulesPath), { recursive: true });
    await fs.writeFile(rulesPath, content, { encoding: "utf-8", flag: "wx" });
  } catch {
    // template missing or write race — silently skip
  }
}

/** Reset the strict rules cache (for testing). */
export function resetStrictRulesCache(): void {
  cachedStrictRules = undefined;
}

// Exported for testing.
export { loadStrictRules, loadOperatorRules, ensureOperatorRulesFile, stripFrontMatter };

const plugin = {
  id: "global-rules",
  name: "Global Rules",
  description: "Two-layer global rules (Strict Rules + Operator Rules) for agent system prompts",

  register(api: OpenClawPluginApi) {
    const pluginDir = path.dirname(api.source);
    const strictTemplatePath =
      (api.pluginConfig?.strictRulesPath as string | undefined)?.trim() ||
      path.join(pluginDir, "templates", "STRICT_RULES.md");
    const stateDir = api.resolvePath("~/.openclaw");
    const operatorRulesPath =
      (api.pluginConfig?.operatorRulesPath as string | undefined)?.trim() ||
      path.join(stateDir, "RULES.md");
    const operatorTemplatePath = path.join(pluginDir, "templates", "RULES.md");

    // Ensure operator rules file exists on first load.
    ensureOperatorRulesFile(operatorRulesPath, operatorTemplatePath).catch((err) => {
      api.logger.warn?.(`global-rules: failed to ensure operator rules: ${String(err)}`);
    });

    api.on(
      "resolve_system_prompt_sections",
      async () => {
        const [strictContent, operatorContent] = await Promise.all([
          loadStrictRules(strictTemplatePath),
          loadOperatorRules(operatorRulesPath),
        ]);

        const sections: Array<{ heading: string; content: string }> = [];
        if (strictContent) {
          sections.push({ heading: "Strict Rules", content: strictContent });
        }
        if (operatorContent) {
          sections.push({ heading: "Operator Rules", content: operatorContent });
        }

        if (sections.length > 0) {
          api.logger.info?.(`global-rules: injecting ${sections.length} rule section(s)`);
        }

        return { sections };
      },
      { priority: 100 }, // High priority: rules should appear before other plugin sections
    );
  },
};

export default plugin;

import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  ensureOperatorRulesFile,
  loadOperatorRules,
  loadStrictRules,
  resetStrictRulesCache,
  stripFrontMatter,
} from "./index.js";

describe("stripFrontMatter", () => {
  it("strips front matter from content", () => {
    expect(stripFrontMatter("---\ntitle: Rules\n---\nDo not share secrets.")).toBe(
      "Do not share secrets.",
    );
  });

  it("returns content unchanged when no front matter", () => {
    expect(stripFrontMatter("Do not share secrets.")).toBe("Do not share secrets.");
  });

  it("trims whitespace", () => {
    expect(stripFrontMatter("  \n  Some rule.\n\n")).toBe("Some rule.");
  });
});

describe("loadStrictRules", () => {
  afterEach(() => {
    resetStrictRulesCache();
  });

  it("returns content when STRICT_RULES.md exists", async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "strict-rules-"));
    try {
      await fs.writeFile(path.join(tmpDir, "STRICT_RULES.md"), "Do not share secrets.");
      const result = await loadStrictRules(path.join(tmpDir, "STRICT_RULES.md"));
      expect(result).toBe("Do not share secrets.");
    } finally {
      await fs.rm(tmpDir, { recursive: true });
    }
  });

  it("strips front matter before returning content", async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "strict-rules-"));
    try {
      await fs.writeFile(
        path.join(tmpDir, "STRICT_RULES.md"),
        "---\ntitle: Rules\n---\nDo not share secrets.",
      );
      const result = await loadStrictRules(path.join(tmpDir, "STRICT_RULES.md"));
      expect(result).toBe("Do not share secrets.");
    } finally {
      await fs.rm(tmpDir, { recursive: true });
    }
  });

  it("returns undefined when file does not exist", async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "strict-rules-"));
    try {
      const result = await loadStrictRules(path.join(tmpDir, "STRICT_RULES.md"));
      expect(result).toBeUndefined();
    } finally {
      await fs.rm(tmpDir, { recursive: true });
    }
  });

  it("returns undefined when file is empty", async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "strict-rules-"));
    try {
      await fs.writeFile(path.join(tmpDir, "STRICT_RULES.md"), "   \n  ");
      const result = await loadStrictRules(path.join(tmpDir, "STRICT_RULES.md"));
      expect(result).toBeUndefined();
    } finally {
      await fs.rm(tmpDir, { recursive: true });
    }
  });

  it("caches result after first load", async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "strict-rules-"));
    try {
      await fs.writeFile(path.join(tmpDir, "STRICT_RULES.md"), "Rule one.");
      const first = await loadStrictRules(path.join(tmpDir, "STRICT_RULES.md"));
      expect(first).toBe("Rule one.");

      // Modify the file — cached value should persist
      await fs.writeFile(path.join(tmpDir, "STRICT_RULES.md"), "Rule two.");
      const second = await loadStrictRules(path.join(tmpDir, "STRICT_RULES.md"));
      expect(second).toBe("Rule one.");
    } finally {
      await fs.rm(tmpDir, { recursive: true });
    }
  });
});

describe("loadOperatorRules", () => {
  it("returns content when RULES.md exists", async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "operator-rules-"));
    try {
      await fs.writeFile(path.join(tmpDir, "RULES.md"), "Always respond in Spanish.");
      const result = await loadOperatorRules(path.join(tmpDir, "RULES.md"));
      expect(result).toBe("Always respond in Spanish.");
    } finally {
      await fs.rm(tmpDir, { recursive: true });
    }
  });

  it("returns undefined when file does not exist", async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "operator-rules-"));
    try {
      const result = await loadOperatorRules(path.join(tmpDir, "RULES.md"));
      expect(result).toBeUndefined();
    } finally {
      await fs.rm(tmpDir, { recursive: true });
    }
  });

  it("returns undefined when file is empty", async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "operator-rules-"));
    try {
      await fs.writeFile(path.join(tmpDir, "RULES.md"), "  \n  ");
      const result = await loadOperatorRules(path.join(tmpDir, "RULES.md"));
      expect(result).toBeUndefined();
    } finally {
      await fs.rm(tmpDir, { recursive: true });
    }
  });

  it("trims whitespace from content", async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "operator-rules-"));
    try {
      await fs.writeFile(path.join(tmpDir, "RULES.md"), "\n  Some rule.\n\n");
      const result = await loadOperatorRules(path.join(tmpDir, "RULES.md"));
      expect(result).toBe("Some rule.");
    } finally {
      await fs.rm(tmpDir, { recursive: true });
    }
  });
});

describe("ensureOperatorRulesFile", () => {
  it("creates the file from template when missing", async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "ensure-rules-"));
    try {
      const templatePath = path.join(tmpDir, "template.md");
      const rulesPath = path.join(tmpDir, "state", "RULES.md");
      await fs.writeFile(templatePath, "---\ntitle: Rules\n---\nDefault rule.");

      await ensureOperatorRulesFile(rulesPath, templatePath);

      const content = await fs.readFile(rulesPath, "utf-8");
      expect(content).toBe("Default rule.");
    } finally {
      await fs.rm(tmpDir, { recursive: true });
    }
  });

  it("does not overwrite existing file", async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "ensure-rules-"));
    try {
      const templatePath = path.join(tmpDir, "template.md");
      const rulesPath = path.join(tmpDir, "RULES.md");
      await fs.writeFile(templatePath, "Default rule.");
      await fs.writeFile(rulesPath, "Custom rule.");

      await ensureOperatorRulesFile(rulesPath, templatePath);

      const content = await fs.readFile(rulesPath, "utf-8");
      expect(content).toBe("Custom rule.");
    } finally {
      await fs.rm(tmpDir, { recursive: true });
    }
  });
});

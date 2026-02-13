# Customizations

Local modifications to the OpenClaw codebase that diverge from upstream.

## Plugin Hook: `resolve_system_prompt_sections`

A new plugin hook that allows extensions to inject sections into the agent system prompt. Sections are placed after the Safety section and before the CLI Quick Reference, giving them higher authority than workspace/context files.

- **Hook type**: `src/plugins/types.ts` — `PluginHookResolveSystemPromptSectionsEvent/Result`
- **System prompt param**: `systemPromptSections` in `buildAgentSystemPrompt()`
- **Wired in**: all runners (embedded run, compact, CLI, context report)

## Two-Layer Global Rules (Plugin)

Implemented as the `extensions/global-rules` plugin. Uses the `resolve_system_prompt_sections` hook to inject Strict Rules and Operator Rules into the system prompt.

- **Strict Rules**: `extensions/global-rules/templates/STRICT_RULES.md` (ships with plugin, cached)
- **Operator Rules**: `~/.openclaw/RULES.md` (runtime-editable, auto-created from template)
- **Enable**: add `"global-rules"` to `plugins.allow` in config

See `extensions/global-rules/` for details.

# CUSTOMIZATIONS.md — Minimal OpenClaw Fork

This document describes all modifications made to the original `openclaw/openclaw` codebase to create a minimal personal fork. It is intended to be read by AI agents working on this codebase.

---

## Goal

Strip openclaw down to the essentials: **Telegram, WhatsApp, Skills, TUI, Browser, multi-agent system, memory, media-understanding, and API access**. Everything else was removed or stubbed out.

## Branch

`claude/minimal-openclaw-fork-85avz` on `ArielFuggini/openclaw`

## Scale of Changes

- **345,966 lines deleted** across 2,076 files
- **~460 lines added** (stubs + infrastructure fixes)
- Original codebase: ~652k lines → Current: ~306k lines

---

## What Was Deleted

### Top-Level Directories (fully removed)

| Directory | What it was |
|-----------|-------------|
| `Swabble/` | macOS native SwiftUI app (53k lines) |
| `apps/` | iOS, Android, macOS apps + shared Swift kit (82k lines) |
| `assets/` | Chrome extension, images |
| `docs/` | 302 Mintlify documentation files (55k lines) |
| `extensions/` | All 32 channel/feature plugins (73k lines) |
| `packages/` | Monorepo sub-packages (clawdbot, moltbot) |
| `ui/` | Web UI (React/Lit.js) |
| `.pi/` | Pi agent configuration |

### Channel Source Directories (fully removed from `src/`)

| Directory | What it was |
|-----------|-------------|
| `src/discord/` | Discord bot (13k lines) |
| `src/slack/` | Slack integration (9k lines) |
| `src/signal/` | Signal messenger (4k lines) |
| `src/imessage/` | iMessage via BlueBubbles (2.5k lines) |
| `src/line/` | LINE messenger (9k lines) |

### Feature Directories (fully removed from `src/`)

| Directory | What it was |
|-----------|-------------|
| `src/acp/` | Agent control protocol |
| `src/docs/` | Documentation generation commands |
| `src/macos/` | macOS-specific integrations |
| `src/node-host/` | Node host management |
| `src/scripts/` | Internal dev scripts |
| `src/test-helpers/` | Shared test helpers |

### Individual Files Deleted

- Channel-specific agent tools: `discord-actions-*.ts`, `slack-actions.ts`, `cron-tool.ts`, `tts-tool.ts`
- Channel-specific plugins: `actions/discord.ts`, `actions/signal.ts`, `normalize/discord.ts`, `normalize/imessage.ts`, `normalize/slack.ts`
- Onboarding adapters: `onboarding/discord.ts`, `onboarding/imessage.ts`, `onboarding/signal.ts`, `onboarding/slack.ts`
- Outbound adapters: `outbound/discord.ts`, `outbound/imessage.ts`, `outbound/signal.ts`, `outbound/slack.ts`
- CLI subcommands: `pairing-cli.ts`, `acp-cli.ts`, `cron-cli/`, `daemon-cli/`, `node-cli/`, `security-cli.ts`
- Commands: `configure.daemon.ts`, `configure.wizard.ts`, `daemon-install-helpers.ts`, `doctor-gateway-daemon-flow.ts`, `doctor-gateway-services.ts`, `doctor-security.ts`, `onboard-channels.ts`, `onboard-hooks.ts`, `onboard-skills.ts`, `onboard-remote.ts`, `onboard-non-interactive/`, `status.daemon.ts`, `systemd-linger.ts`, `uninstall.ts`, `reset.ts`, `node-daemon-install-helpers.ts`
- Config types: `types.discord.ts`, `types.signal.ts`, `types.slack.ts`, `types.line.ts`
- Gateway methods: `server-methods/wizard.ts`, `server-methods/cron.ts`, `server-methods/tts.ts`, `server-wizard-sessions.ts`, `server-cron.ts`
- Auto-reply: `reply/line-directives.ts`, `reply/commands-tts.ts`
- Security: `audit.ts`, `fix.ts`
- Other: `channels/plugins/slack.actions.ts`, `channels/plugins/group-mentions.ts`, `channels/plugins/status-issues/discord.ts`, `channels/plugins/status-issues/bluebubbles.ts`

---

## Stub Modules Created

These modules were deleted but are imported by many remaining files. Minimal no-op stubs were created so the build compiles without modifying dozens of consumer files.

**Important: These stubs export no-op functions and empty types. They do NOT provide real functionality.**

### `src/wizard/` (CLI interactive prompting)

| File | Exports |
|------|---------|
| `prompts.ts` | `WizardPrompter` type, `WizardSelectOption` type, `WizardCancelledError` class |
| `clack-prompter.ts` | `createClackPrompter()` — throws "not available" |
| `onboarding.ts` | `runOnboardingWizard()` — throws "not available" |
| `session.ts` | `WizardSession` type, `createWizardSession()` — returns stub |

### `src/compat/` (legacy config name mapping)

| File | Exports |
|------|---------|
| `legacy-names.ts` | `MANIFEST_KEY` ("openclaw"), `LEGACY_MANIFEST_KEYS` ([]), `normalizeLegacyName()`, `isLegacyName()`, `legacyNameEntries()` |

### `src/tts/` (text-to-speech)

| File | Exports |
|------|---------|
| `tts.ts` | `textToSpeechTelephony()` → null, `isTtsEnabled()` → false, `resolveTtsProvider()` → null, `buildTtsSystemPromptHint()` → "", `maybeApplyTtsToPayload()` → passthrough, `normalizeTtsAutoMode()` → "off", `resolveTtsConfig()` → null, `getTtsMaxLength()` → 0, `getTtsProvider()` → null, `isSummarizationEnabled()` → false, `resolveTtsAutoMode()` → "off", `resolveTtsPrefsPath()` → "" |

### `src/pairing/` (device pairing)

| File | Exports |
|------|---------|
| `pairing-store.ts` | `readChannelAllowFromStore()` → [], `upsertChannelPairingRequest()` → stub, `addChannelAllowFromStoreEntry()` → no-op, `removeChannelAllowFromStoreEntry()` → no-op |
| `pairing-messages.ts` | `buildPairingReply()` → "" |

### `src/daemon/` (system service management)

| File | Key Exports |
|------|-------------|
| `service.ts` | `isDaemonRunning()` → false, `resolveGatewayService()` → stub |
| `constants.ts` | `DAEMON_PORT`, `resolveGatewayLaunchAgentLabel()`, `resolveGatewaySystemdServiceName()`, `resolveGatewayWindowsTaskName()` |
| `launchd.ts` | `isLaunchdInstalled()` → false, `resolveGatewayLogPaths()` → empty |
| `systemd-hints.ts` | `isSystemdUnavailableDetail()` → null, `renderSystemdUnavailableHints()` → "" |
| `systemd.ts` | `isSystemdAvailable()` → false |
| `inspect.ts` | `inspectDaemon()` → null |
| `runtime-paths.ts` | `getDaemonRuntimePaths()` → empty |
| `service-runtime.ts` | `GatewayServiceRuntime` type, `getDaemonServiceRuntime()` → null |
| `node-service.ts` | `resolveNodeService()` → stub |
| `diagnostics.ts` | `runDaemonDiagnostics()` → null, `readLastGatewayErrorLine()` → null |

### `src/canvas-host/` (A2UI interactive canvas)

| File | Exports |
|------|---------|
| `server.ts` | `CanvasHostServer` type, `CanvasHostHandler` type, `startCanvasHostServer()` → null, `createCanvasHostHandler()` → stub |
| `a2ui.ts` | `getA2uiBundlePath()` → null, `CANVAS_HOST_PATH`, `handleA2uiHttpRequest()` → stub |

### `src/cron/` (scheduled tasks)

| File | Exports |
|------|---------|
| `types.ts` | `CronJob` type (full shape), `CronService` type |
| `service.ts` | `createCronService()` → no-op service |
| `isolated-agent.ts` | `createIsolatedCronAgent()` → null, `runCronIsolatedAgentTurn()` → skipped |

### Other stubs

| File | Exports |
|------|---------|
| `src/polls.ts` | `PollInput` type, `PollResult` type, `normalizePollInput()` → passthrough |
| `src/link-understanding/apply.ts` | `applyLinkUnderstanding()` → null |
| `src/test-utils/ports.ts` | `getTestPort()`, `reserveTestPort()`, `getDeterministicFreePortBlock()` |

---

## Infrastructure Files Modified

These existing files were surgically edited to remove references to deleted channels/features.

### Critical infrastructure (rewritten)

| File | Change |
|------|--------|
| `src/cli/deps.ts` | Removed discord, slack, signal, imessage send functions. Kept only `sendMessageWhatsApp` and `sendMessageTelegram`. |
| `src/plugins/runtime/index.ts` | Removed all discord, slack, signal, imessage, line, pairing, tts channel registrations. Kept only telegram and whatsapp. |
| `src/plugins/runtime/types.ts` | Removed `typeof import(...)` type aliases for all deleted channels. Kept only telegram and whatsapp sections in `PluginRuntime` type. |
| `src/channels/dock.ts` | Removed discord, slack, signal, imessage, googlechat dock entries. Kept only telegram and whatsapp. Changed `DOCKS` from full `Record` to `Partial<Record>`. |
| `src/infra/outbound/deliver.ts` | Removed signal-specific delivery code (styled text, signal chunking). Removed discord/slack/signal/imessage type imports from `OutboundSendDeps`. |
| `src/plugin-sdk/index.ts` | Removed all re-exports for discord, slack, signal, imessage, line, bluebubbles channels. Kept telegram, whatsapp, and shared utilities. |

### Config files

| File | Change |
|------|--------|
| `src/config/types.ts` | Removed re-exports of `types.discord.js`, `types.signal.js`, `types.slack.js` |
| `src/config/types.channels.ts` | Replaced `DiscordConfig`, `SlackConfig`, `SignalConfig` with `Record<string, unknown>` placeholders |
| `src/config/plugin-auto-enable.ts` | Removed `web/accounts.js` import |

### Channel plugins

| File | Change |
|------|--------|
| `src/channels/plugins/index.ts` | Removed re-exports of deleted directory functions |
| `src/channels/plugins/directory-config.ts` | Removed discord/slack directory functions |
| `src/channels/plugins/catalog.ts` | Fixed compat import |

### Auto-reply pipeline

| File | Change |
|------|--------|
| `src/auto-reply/reply/commands-allowlist.ts` | Removed discord/slack/signal/imessage allowlist resolution |
| `src/auto-reply/reply/commands-core.ts` | Removed TTS command registration |
| `src/auto-reply/reply/normalize-reply.ts` | Removed LINE directive parsing |
| `src/auto-reply/reply/get-reply.ts` | Removed link-understanding import |
| `src/auto-reply/reply/dispatch-from-config.ts` | Removed TTS payload application |
| `src/auto-reply/status.ts` | Stubs resolve from tts module |

### Agent system

| File | Change |
|------|--------|
| `src/agents/openclaw-tools.ts` | Removed cron and TTS tool registrations |
| `src/agents/pi-embedded-runner/compact.ts` | Removed signal reaction level branch |
| `src/agents/pi-embedded-runner/run/attempt.ts` | Removed signal reaction level branch |

### Gateway

| File | Change |
|------|--------|
| `src/gateway/server.impl.ts` | Kept mostly intact; references wizard/cron/canvas stubs |
| `src/gateway/server-http.ts` | Removed Slack HTTP request handler |
| `src/gateway/server-methods.ts` | Removed cron/tts/wizard handler registrations |
| `src/gateway/server-close.ts` | Uses canvas-host stub |
| `src/gateway/server-runtime-state.ts` | Uses canvas-host stub |

### CLI

| File | Change |
|------|--------|
| `src/cli/gateway-cli/register.ts` | Replaced daemon CLI imports with stub functions |
| `src/cli/program/register.subclis.ts` | Removed acp, daemon, node, cron, pairing, security subcommand entries |
| `src/cli/program/register.maintenance.ts` | Replaced reset/uninstall with error stubs |
| `src/cli/outbound-send-deps.ts` | Kept only WhatsApp and Telegram |
| `src/cli/update-cli.ts` | Replaced daemon-cli import with stub |

### Commands

| File | Change |
|------|--------|
| `src/commands/doctor.ts` | Removed daemon flow, services, and security doctor imports |
| `src/commands/configure.ts` | Removed wizard configure re-export |
| `src/commands/configure.commands.ts` | Replaced wizard commands with error stubs |
| `src/commands/status.command.ts` | Stubbed security audit and daemon status |
| `src/commands/onboard-non-interactive.ts` | Replaced with error stub |
| `src/commands/channels/capabilities.ts` | Stubbed discord/slack capability checks |

### Infra/outbound

| File | Change |
|------|--------|
| `src/infra/outbound/outbound-session.ts` | Removed discord/slack/signal/imessage session resolvers |
| `src/infra/outbound/message-action-runner.ts` | Stubbed Slack auto-thread resolution |
| `src/infra/outbound/message.ts` | Fixed poll input defaults |

### Other

| File | Change |
|------|--------|
| `src/hooks/frontmatter.ts` | Uses compat stub |
| `src/hooks/install.ts` | Uses compat stub |
| `src/hooks/workspace.ts` | Uses compat stub |
| `src/plugins/install.ts` | Uses compat stub |
| `src/plugins/manifest.ts` | Uses compat stub |
| `src/infra/restart.ts` | Uses daemon stub |
| `src/telegram/bot-handlers.ts` | Uses pairing stub |
| `src/telegram/bot-message-context.ts` | Uses pairing stub |
| `src/telegram/bot-native-commands.ts` | Uses pairing stub |
| `src/security/audit-extra.ts` | Cast config accesses for removed channel types |

---

## Build Changes

| Setting | Before | After |
|---------|--------|-------|
| Build command | `pnpm canvas:a2ui:bundle && tsc ... && copy-a2ui ...` | `tsc ... && OPENCLAW_A2UI_SKIP_MISSING=1 copy-a2ui ...` |
| Workspace packages | `.`, `ui`, `packages/*`, `extensions/*` | `.` only |
| `onlyBuiltDependencies` | 8 entries (including matrix, carbon, pam) | 4 entries (baileys, esbuild, protobufjs, sharp) |

---

## What Remains (Kept Features)

### Channels
- **Telegram** (`src/telegram/`) — full bot, monitoring, probes, send, audit
- **WhatsApp** (`src/web/`, `src/whatsapp/`, `src/channel-web.ts`) — Baileys-based, QR login, outbound, media

### Core Systems
- **Agent system** (`src/agents/`) — multi-agent, subagents, tools, skills, model selection, auth profiles
- **Auto-reply pipeline** (`src/auto-reply/`) — message processing, reply dispatch, debouncing, chunking
- **Gateway server** (`src/gateway/`) — HTTP/WebSocket API, OpenAI-compatible endpoints, config reload
- **Config system** (`src/config/`) — YAML schema, Zod validation, defaults, migration
- **CLI** (`src/cli/`, `src/commands/`) — essential commands (agent, message, configure, status, models, etc.)
- **Routing** (`src/routing/`) — multi-agent message routing
- **Plugins** (`src/plugins/`, `src/plugin-sdk/`) — plugin loading, SDK (trimmed to telegram+whatsapp)
- **Hooks** (`src/hooks/`) — pre/post processing hooks

### Features
- **Skills** (`skills/`) — 48 bundled skills with SKILL.md frontmatter
- **TUI** (`src/tui/`) — terminal UI
- **Browser** (`src/browser/`) — Playwright web automation
- **Memory** (`src/memory/`) — session memory, vector search
- **Media understanding** (`src/media-understanding/`) — image/video/audio AI analysis
- **Media pipeline** (`src/media/`) — fetch, store, convert, MIME detection
- **Sessions** (`src/sessions/`) — conversation session management
- **Security** (`src/security/`) — basic audit (trimmed)
- **Logging** (`src/logging/`) — structured logging, subsystem loggers
- **Terminal** (`src/terminal/`) — table rendering, ANSI formatting, palette
- **Infrastructure** (`src/infra/`) — networking, heartbeat, updates, device identity, outbound delivery

---

## How to Add Global Agent Rules

The system prompt is built in `src/agents/system-prompt.ts`. To add immutable rules for ALL agents:

1. **Hard-coded (truly immutable):** Add a new section function (like `buildSafetySection()`) and include it in the prompt assembly
2. **SOUL.md (project context):** Place a `SOUL.md` in the agent workspace — it gets injected as "Project Context"
3. **Per-channel config:** Set `systemPrompt` in channel group config (Telegram groups, etc.)

Only option 1 is truly immutable across all agents including subagents.

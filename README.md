# opencode-priority-rule-plugin

Priority-rules server plugin for OpenCode. It injects the following block into the first user message:

```xml
<PriorityRules> ALWAYS use the QUESTION TOOL if you need to ask user. ALWAYS think and respond in Traditional Chinese (zh_TW). </PriorityRules>
```

Compatible with OpenCode `>=1.4.6 <2`.

## Install in current project

```sh
opencode plugin opencode-priority-rule-plugin@latest
```

## Global install

```sh
opencode plugin opencode-priority-rule-plugin@latest --global
```

## Config alternative

If you would rather configure plugins directly, use:

```json
{ "plugin": ["opencode-priority-rule-plugin@latest"] }
```

## TUI controls in OpenCode

This plugin has two TUI control surfaces:

1. **Built-in Plugins dialog**: controls whether the whole `opencode-priority-rule-plugin` package is enabled.
2. **`Priority Rules settings` command**: controls only whether PriorityRules injection is enabled while the plugin itself stays installed and active.

Open the command palette and run **`Priority Rules settings`** to manage the PriorityRules injection toggle.

### State combinations

- **Plugin enabled + priority rules enabled**: the plugin is on, and future user messages get the PriorityRules block injected.
- **Plugin enabled + priority rules disabled**: the plugin stays on, but future user messages are sent without the PriorityRules block.
- **Plugin disabled**: the plugin is off from the Plugins dialog, so no PriorityRules injection runs at all.

### Persistence

The state is persisted across restarts.

It uses the existing config-root resolution order:

1. `OPENCODE_CONFIG_DIR`
2. the nearest workspace `.opencode` directory inside the current worktree
3. `XDG_CONFIG_HOME/opencode`
4. `~/.config/opencode`

That means both the plugin-level enabled state and the PriorityRules injection state continue to follow the same config-root behavior OpenCode already uses.

## Local development

From the repository root, build first, then install the local plugin with a path spec:

```sh
npm run build
opencode plugin "$(pwd)" --force
```

After changing code, run `npm run build` again and then reinstall or refresh the local plugin so OpenCode picks up the updated `dist/` output.

## Development

```sh
npm ci
npm test
npm run build
```

## Publish

Use GitHub Actions release workflow only (OIDC trusted publishing).

1. In npm package settings, add this repository workflow as a trusted publisher.
2. Open **Actions -> Release -> Run workflow**.
3. Select bump type (`patch` or `major`) and run on the default branch.

The workflow will automatically:

- run `npm test`
- run `npm run build`
- bump version in `package.json` + `package-lock.json`
- create and push the release commit and `v*` tag
- publish to npm with `npm publish --provenance --access public`

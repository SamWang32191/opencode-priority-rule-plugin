import type { Plugin } from "@opencode-ai/plugin";

import { readEffectiveEnabledState } from "./enabled-state.js";
import { PRIORITY_RULES } from "./priority-rules.js";

const prependPriorityRulesPart = (parts: unknown[]) => {
  parts.unshift({ type: "text", text: PRIORITY_RULES });
};

const PriorityRulePlugin: Plugin = async (input) => ({
  "experimental.chat.messages.transform": async (_transformInput, output) => {
    const enabled = await readEffectiveEnabledState({
      directory: input.directory,
      worktree: input.worktree,
    });

    if (!enabled) {
      return;
    }

    if (!output.messages.length) {
      return;
    }

    const firstUser = output.messages.find((message) => message.info.role === "user");

    if (!firstUser || !firstUser.parts.length) {
      return;
    }

    const firstPart = firstUser.parts[0];

    if (firstPart?.type === "text" && firstPart.text === PRIORITY_RULES) {
      return;
    }

    prependPriorityRulesPart(firstUser.parts);
  },
});

export default PriorityRulePlugin;

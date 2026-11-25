---
layout: default
title: "3. Preparing the Model Request"
parent: "Lab 2: Harness Engineering Overview"
nav_order: 3
permalink: /lessons/harness-engineering/model-request/
---

# 3. Preparing the Model Request

Open [#14]({{ '/downloads/lab1-trace-demo.html' | relative_url }}#/session/ses_e3b26034dffevfCDf3plyBVSPC/record/14){:target="_blank" rel="noopener"} **→ Request → Raw request → REQUEST BODY**. The four input parts from [Prepare model input (step 2)]({{ '/lessons/harness-engineering/overview/#harness-flow' | relative_url }}) in the diagram appear in this request body:

- **`messages`**: instructions, previous messages, and the new user prompt.
- **`tools`**: Tool definitions.

## 3.1 Instructions

The first object in the `messages` array has `role: "system"`. Its `content` field contains OpenCode's instructions, our project instructions from `AGENTS.md`, and run information:

[![#14 Raw request: system role and the beginning of its content]({{ '/assets/lab-02/14-system-message.png' | relative_url }})]({{ '/assets/lab-02/14-system-message.png' | relative_url }}){:target="_blank" rel="noopener"}

The opening comes from a template in [`packages/core/src/session/runner/prompt/system.txt`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/runner/prompt/system.txt#L1):

{% raw %}
```text
You are an AI agent running in OpenCode, a coding agent harness. Help the user accomplish their goals using the tools you have available.

# Harness
...
${OPENCODE_TOOL_GUIDANCE}
...
```
{% endraw %}

In the request body, tool guidance replaces the `${OPENCODE_TOOL_GUIDANCE}` placeholder:

{% raw %}
```text
- Use the write tool to create files or completely replace their content. Prefer using the edit tool for targeted changes.
...
```
{% endraw %}

This guidance comes from another file, [`packages/core/src/session/system-prompt.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/system-prompt.ts#L3), and is inserted as follows:

{% raw %}
```typescript
import PROMPT from "./runner/prompt/system.txt"

export function make(tools: string[]) {
  return render(PROMPT, tools)
}

export function render(prompt: string, tools: string[]) {
  const instructions: string[] = []
  // ...
  if (tools.includes("write")) {
    instructions.push(
      "- Use the write tool to create files or completely replace their content. Prefer using the edit tool for targeted changes.",
    )
  }
  // ...
  return prompt.replace("${OPENCODE_TOOL_GUIDANCE}", instructions.join("\n"))
}
```
{% endraw %}

In our project, `write` is available, so its guidance is included.

**AGENTS.md.** Below these instructions, the same system message contains the text from our project's `AGENTS.md`:

[![#14 Raw request: AGENTS.md source path and contents outlined in red]({{ '/assets/lab-02/14-agents-request-precise.png' | relative_url }})]({{ '/assets/lab-02/14-agents-request-precise.png' | relative_url }}){:target="_blank" rel="noopener"}

In [`packages/core/src/config/plugin/instruction.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/config/plugin/instruction.ts#L65), OpenCode reads the file and keeps its path with the text:

{% raw %}
```typescript
return yield* fs.readFileString(filepath).pipe(
  Effect.map((content) => new InstructionDiscovery.File({ path: filepath, content })),
  // ...
)
```
{% endraw %}

Then `render()` in [`packages/core/src/instruction-discovery.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/instruction-discovery.ts#L81) formats that path and text as shown in the screenshot:

{% raw %}
```typescript
function render(files: ReadonlyArray<File>) {
  return files.map((file) => `Instructions from: ${file.path}\n${file.content}`).join("\n\n")
}
```
{% endraw %}

This formatted text becomes part of `input.initial`, which Section 3.5 adds to the system prompt.

<details markdown="1">
<summary>Sources of the run information</summary>

OpenCode also adds the run information in this system message:

- `# Your Model`: the model and provider, added by [`identity.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/plugin/identity.ts#L10).

- `Today's date: Tue Nov 10 2026` and `<env>`: the date and working environment, supplied by [`builtins.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/instructions/builtins.ts#L24).

- The final worktree guidance: added by [`tool/plugin/opencode.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/tool/plugin/opencode.ts#L92). It is not part of our `AGENTS.md`.

</details>

## 3.2 Previous Messages

After the instructions (`role: "system"`), the request body's `messages` contains the earlier conversation:

- **`user`:** One earlier message contains our prompt: "Plan a Python tool that reads the PDF papers in input/, splits their text into manageable chunks, and saves output/chunks.jsonl."

- **`assistant`:** A previous response from the model begins with "# Plan: PDF Chunking Tool".

- **`tool`: results from previous tool calls executed by OpenCode**, including environment checks and the text read from `.agents/skills/pdf-extraction/SKILL.md`.

**OpenCode's Plan/Build reminder prompts** are also in this part. Near the end of `messages`, immediately after the model's plan, we see a `user` message we did not type: "You are NO LONGER in Plan mode. ..."

[![#14 Raw request: the Plan/Build reminder outlined in red]({{ '/assets/lab-02/05-reminder-highlighted.png' | relative_url }})]({{ '/assets/lab-02/05-reminder-highlighted.png' | relative_url }}){:target="_blank" rel="noopener"}

OpenCode automatically adds this reminder when we switch from Plan to Build. The logic is in [`packages/core/src/plugin/plan.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/plugin/plan.ts#L75):

{% raw %}
```typescript
const text = switchReminder(event, enterReminder)
if (!text) return Effect.void
return ctx.session
  .synthetic({
    sessionID: event.data.sessionID,
    text,
    resume: false,
  })
  // ...
```
{% endraw %}

Here, `synthetic()` stores the reminder; `resume: false` means adding it does not start a model turn. When preparing the request, [`packages/core/src/session/runner/to-llm-message.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/runner/to-llm-message.ts#L274) converts it into a `user` message:

{% raw %}
```typescript
case "synthetic":
  return [Message.make({ id: message.id, role: "user", content: message.text })]
```
{% endraw %}

## 3.3 New User Prompt

Where does the new user prompt asking OpenCode to implement the plan appear in #14?

[![CLI: switching to Build and sending the implementation prompt]({{ '/assets/lab-02/06.png' | relative_url }})]({{ '/assets/lab-02/06.png' | relative_url }}){:target="_blank" rel="noopener"}

It appears as the last `user` message in the request body's `messages`, immediately after the reminder:

[![Lab 2 - #14 Raw request - current]({{ '/assets/lab-02/07.png' | relative_url }})]({{ '/assets/lab-02/07.png' | relative_url }}){:target="_blank" rel="noopener"}

## 3.4 Tool Definitions

The tool definitions in diagram step 2 appear in the request body's `tools` array. For example, the `write` tool definition appears here:

[![Lab 2 - #14 Raw request - tools]({{ '/assets/lab-02/08.png' | relative_url }})]({{ '/assets/lab-02/08.png' | relative_url }}){:target="_blank" rel="noopener"}

[`packages/core/src/tool/plugin/write.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/tool/plugin/write.ts#L24) defines two required string inputs for `write`: `path` and `content`.

{% raw %}
```typescript
export const Input = Schema.Struct({
  path: Schema.String.annotate({
    description: "Path to the file to write to",
  }),
  content: Schema.String.annotate({ description: "Content to write to the file" }),
})
```
{% endraw %}

[`packages/core/src/tool/runtime.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/tool/runtime.ts#L21) combines this input schema with the tool's description to build the definition shown in the screenshot.

## 3.5 Building and Sending the Request

Now let's see how OpenCode combines these parts and sends the request. In [`packages/core/src/session/model-request.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/model-request.ts#L92):

{% raw %}
```typescript
system: [
  input.agent.system
    ? input.agent.system
    : SessionSystemPrompt.make(input.tools.definitions.map((tool) => tool.name)),
  input.initial,
]
  .filter((part) => part.length > 0)
  .map(SystemPart.make),
messages: toLLMMessages(input.messages, input.model.ref, providerMetadataKey),
```
{% endraw %}

- `SessionSystemPrompt.make(...)` combines `system.txt` with the tool guidance from Section 3.1.
- `input.initial` includes the `AGENTS.md` text and run information passed through [`packages/core/src/session/context.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/context.ts#L169). Together with the prompt from `make(...)`, these form `system`, which appears as `messages[0].content` in #14's request body.
- `toLLMMessages(...)` converts the previous messages and the new user prompt into request messages.

Later in the same file, the call to [`LLM.request(...)`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/model-request.ts#L277) combines the instructions (`shaped.system`), previous messages and new user prompt (`shaped.messages`), and available tool definitions (`hooked`):

{% raw %}
```typescript
const base = LLM.request({
  // ...
  system: shaped.system,
  messages: boundImages(unsupportedParts(shaped.messages, model.capabilities, model.model.provider)),
  tools: Array.from(hooked, ([name, t]) => ({ ...t, name })),
  // ...
})
```
{% endraw %}

OpenCode [builds the final request from `base`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/model-request.ts#L313) and passes it to the runner as `input.prepared.request`. In [`packages/core/src/session/runner/step.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/runner/step.ts#L99), `llm.stream()` sends the prepared request and receives the response:

{% raw %}
```typescript
const providerStream = llm.stream(input.prepared.request, input.prepared.options).pipe(
  // ...
)
```
{% endraw %}

Next, we inspect what the model returns in [#14]({{ '/downloads/lab1-trace-demo.html' | relative_url }}#/session/ses_e3b26034dffevfCDf3plyBVSPC/record/14){:target="_blank" rel="noopener"} **→ Response**.

---

[Previous: The Agent Harness: An Overview]({{ '/lessons/harness-engineering/overview/' | relative_url }}) · [Next: Executing the Model's Tool Calls]({{ '/lessons/harness-engineering/tool-execution/' | relative_url }})

---
layout: default
title: "4. Executing the Model's Tool Calls"
parent: "Lab 2: Harness Engineering Overview"
nav_order: 4
permalink: /lessons/harness-engineering/tool-execution/
---

# 4. Executing the Model's Tool Calls

OpenCode has sent the request. In #14, the model asks it to write two files. We will follow OpenCode's tool-execution behavior in [diagram step 5A]({{ '/lessons/harness-engineering/overview/#harness-flow' | relative_url }}), from receiving these calls to writing the files.

## 4.1 Read the Model's Response

Open **#14 → Response → Raw response → RESPONSE BODY**. The model asks for two writes and gives the filename and code for each (boxes 2 and 3). NVIDIA's API sends those calls to OpenCode in the numbered `data:` blocks:

[![#14 Response body with six numbered parts and two tool calls outlined; long Python code omitted]({{ '/assets/lab-02/response14-full-numbered.png' | relative_url }})]({{ '/assets/lab-02/response14-full-numbered.png' | relative_url }}){:target="_blank" rel="noopener"}

1. **The model's role.** Inside `choices[0].delta`, `role` is `assistant`.
2. **Write `chunk_pdfs.py`.** `function.name` is `write`. Its `function.arguments` string contains `path` and `content`: the filename and Python code to write. The outer `delta.content` is ordinary reply text, empty here; it is not the file content.
3. **Write `test_chunk_pdfs.py`.** The second call uses the same tool, with a different `path` and `content`.
4. **How this reply ended.** NVIDIA's API sets `finish_reason: "tool_calls"` because the model requested tools. This field is not part of the model's text.
5. **Token usage.** `usage` reports token counts.
6. **End of this response.** `[DONE]` marks the end of NVIDIA's response stream for #14. OpenCode can start a write as soon as it receives the tool call; it waits for both results before sending #15.

## 4.2 Find and Run the Tool

OpenCode reads the tool name and arguments from the response, finds the matching tool, checks its inputs, and calls its implementation.

[`packages/ai/src/protocols/openai-chat.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/ai/src/protocols/openai-chat.ts#L1118) reads `function.name` and `function.arguments`. [`packages/ai/src/protocols/utils/tool-stream.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/ai/src/protocols/utils/tool-stream.ts#L78) parses the argument string (`raw`) and creates an internal tool-call object:

{% raw %}
```typescript
return parseToolInput(route, tool.name, raw).pipe(
  Effect.map(
    (input): ToolCall =>
      LLMEvent.toolCall({
        id: tool.id,
        name: tool.name,
        // ...
        input,
        // ...
      }),
  ),
  // ...
)
```
{% endraw %}

`LLMEvent.toolCall(...)` creates the complete internal event with `type: "tool-call"`. For the first call, `event.name` is `write`, `event.input.path` is `chunk_pdfs.py`, and `event.input.content` is the Python code to write.

The runner in [`packages/core/src/session/runner/step.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/runner/step.ts#L121) receives this event:

{% raw %}
```typescript
if (event.type !== "tool-call" || event.providerExecuted) return
// ...
restore(executeTool(event)).pipe(
  // ...
)
```
{% endraw %}

This is a tool call, and the model service has not marked it as already executed (`providerExecuted`), so OpenCode calls `executeTool(event)`. The early `return` would skip only this event.

That function [passes the call](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/model-request.ts#L390) to [`packages/core/src/tool.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/tool.ts#L313). There, `direct.get(name)` looks up the implementation registered as `write`:

{% raw %}
```typescript
const tool = direct.get(name)
if (tool) return yield* executeTool(tool, name, event.input, context)
```
{% endraw %}

This second [`executeTool(tool, ...)`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/tool.ts#L115) calls the execution function in [`packages/core/src/tool/runtime.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/tool/runtime.ts#L29), which checks the arguments before calling the selected tool:

{% raw %}
```typescript
const decoded = yield* decodeInput(tool, input)
// ...
const result = yield* tool.execute(decoded, context).pipe(
  // ...
)
```
{% endraw %}

Here, `input` comes from `event.input`. `decodeInput` checks `path` and `content` against the input requirements in the [tool definition we saw in Section 3]({{ '/lessons/harness-engineering/model-request/#34-tool-definitions' | relative_url }}). After validation, `tool.execute` calls the `write` tool's execution function in [`packages/core/src/tool/plugin/write.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/tool/plugin/write.ts#L55), passing `decoded` as that function's `input`.

## 4.3 Approval, File Write, and Result

Before creating `chunk_pdfs.py`, OpenCode asks for approval:

[![CLI: approval before writing chunk\_pdfs.py]({{ '/assets/lab-02/11.png' | relative_url }})]({{ '/assets/lab-02/11.png' | relative_url }}){:target="_blank" rel="noopener"}

Inside that execution function, [`packages/core/src/tool/plugin/write.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/tool/plugin/write.ts#L71) resolves the supplied path, checks permission, and then writes the supplied content:

{% raw %}
```typescript
const target = yield* access.resolve({ path: input.path, kind: "file" })
// ...
yield* permission.assert({
  action: "edit",
  resources: [target.resource],
  // ...
})
const result = yield* fileMutation.writeTextPreservingBom({ target, content: input.content })
```
{% endraw %}

Here, `input.path` is `chunk_pdfs.py`; resolving it gives the file location in `target`. The `edit` permission check triggers the **Edit** approval shown above. Once approved, the write function saves the model's Python code (`input.content`) to that file.

The write operation returns `result`, including the file path and whether it already existed. The [following callback](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/tool/plugin/write.ts#L94) receives it as `output`:

{% raw %}
```typescript
Effect.map((output) => ({ output, content: toModelContent(output) })),
```
{% endraw %}

`toModelContent(output)` in the [same file](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/tool/plugin/write.ts#L39) turns that result into text for the model:

{% raw %}
```typescript
export const toModelContent = (output: Output) =>
  `${output.existed ? "Wrote" : "Created"} file successfully: ${output.resource}`
```
{% endraw %}

The new file produces `Created file successfully: chunk_pdfs.py`; the second write produces the corresponding result for `test_chunk_pdfs.py`. Next, we will see how OpenCode includes these results in another model request.

---

[Previous: Preparing the Model Request]({{ '/lessons/harness-engineering/model-request/' | relative_url }}) · [Next: When OpenCode Continues or Stops]({{ '/lessons/harness-engineering/feedback/' | relative_url }})

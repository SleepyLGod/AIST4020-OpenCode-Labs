---
layout: default
title: "5. When OpenCode Continues or Stops"
parent: "Lab 2: Harness Engineering Overview"
nav_order: 5
permalink: /lessons/harness-engineering/feedback/
---

# 5. When OpenCode Continues or Stops

After writing both files, OpenCode sends the results to the model without waiting for another user prompt. What makes it start #15, and why does it stop after #20?

## 5.1 Add Tool Results to the Next Request

After approval, the terminal shows both writes completed:

[![CLI: chunk_pdfs.py written]({{ '/assets/lab-02/12.png' | relative_url }})]({{ '/assets/lab-02/12.png' | relative_url }}){:target="_blank" rel="noopener"}

[![CLI: test_chunk_pdfs.py written]({{ '/assets/lab-02/13.png' | relative_url }})]({{ '/assets/lab-02/13.png' | relative_url }}){:target="_blank" rel="noopener"}

In the request body for #14, `messages` ended with your prompt. Open **#15 → Request → Raw request → REQUEST BODY**. The same 31 messages are followed by three more:

[![#15 Raw request: A and B pair the write calls with their results]({{ '/assets/lab-02/15-request-paired.png' | relative_url }})]({{ '/assets/lab-02/15-request-paired.png' | relative_url }}){:target="_blank" rel="noopener"}

1. `"role": "assistant"`: OpenCode includes the model's #14 reply. Its `tool_calls` array contains both requests: write `chunk_pdfs.py` (**A**) and write `test_chunk_pdfs.py` (**B**).
2. `"role": "tool"`: OpenCode reports `Created file successfully: chunk_pdfs.py` in `content`. Its `tool_call_id` matches the first call's `id` (**A**).
3. `"role": "tool"`: OpenCode reports `Created file successfully: test_chunk_pdfs.py`. Its `tool_call_id` matches the second call's `id` (**B**).

After each write, [`packages/core/src/session/message-updater.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/message-updater.ts#L345) saves the result in the record for that call. When preparing #15, [`toolResult()` in `packages/core/src/session/runner/to-llm-message.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/runner/to-llm-message.ts#L127) receives that record as `tool`. It takes the result from `tool.state.content` and the call ID from `tool.id`:

{% raw %}
```typescript
const toolResult = (tool: SessionMessage.AssistantTool, providerMetadata: ProviderMetadata | undefined) => {
  if (tool.state.status === "completed") {
    // ...
    const content = tool.state.content
    const single = content.length === 1 ? content[0] : undefined
    return ToolResultPart.make({
      id: tool.id,
      name: tool.name,
      result:
        single?.type === "text"
          ? { type: "text" as const, value: single.text }
          : { type: "content" as const, value: content },
      // ...
    })
  }
  // ...
}
```
{% endraw %}

With that ID and result text, [`packages/ai/src/protocols/openai-chat.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/ai/src/protocols/openai-chat.ts#L515) builds each `tool` message in #15. The ID becomes `tool_call_id`; the text becomes `content`:

{% raw %}
```typescript
const toolMessage = (toolCallID: string, text: string, cacheControl: OpenAIChatCacheControl | undefined) => ({
  role: "tool" as const,
  tool_call_id: toolCallID,
  content: cacheControl === undefined ? text : [{ type: "text" as const, text, cache_control: cacheControl }],
})
```
{% endraw %}

## 5.2 Start the Next Model Turn

Why does OpenCode call the model again without another user prompt? The model asked for two writes, so OpenCode needs another turn to give it the results. In [`packages/core/src/session/runner/publish-llm-event.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/runner/publish-llm-event.ts#L649), those local tool calls set `needsContinuation` to `true`:

{% raw %}
```typescript
needsContinuation: Iterable.some(
  tools.values(),
  (tool) => !tool.providerExecuted && (tool.called || tool.settled),
),
```
{% endraw %}

Before continuing, [`packages/core/src/session/runner/step.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/runner/step.ts#L151) waits for both tools to finish. Its outcome passes the flag to `runStep()` in [`packages/core/src/session/runner/llm.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/runner/llm.ts#L288):

{% raw %}
```typescript
const completed = yield* SessionStep.Outcome.$match(outcome, {
  Completed: Effect.fnUntraced(function* (outcome) {
    // ...
    return outcome.needsContinuation
  }),
  // ...
})
if (completed !== undefined) return completed
```
{% endraw %}

For #14, `runStep()` returns `true`. The [`while` loop below](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/runner/llm.ts#L185) stores that value in `continuing`:

{% raw %}
```typescript
while (true) {
  const next = yield* advanceToStep()
  if (next._tag !== "Ready") return next
  continuing = yield* runStep(next.context, step)
  // ...
  force = false
  // ...
}
```
{% endraw %}

After `runStep()` finishes handling #14, execution goes back to the top of `while`. Before OpenCode sends #15, [`advanceToStep()` in `llm.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/runner/llm.ts#L159) checks whether to stop:
{: #loop-exit-check}

{% raw %}
```typescript
if (!force && !continuing && (!pending || (pending.delivery === "queue" && promotable === "steer")))
  return DrainResult.Complete()
// ...
return { _tag: "Ready" as const, context: yield* context.load(selected) }
```
{% endraw %}

Stopping requires `!continuing`. With `continuing` still true, OpenCode returns `Ready` and calls [`runStep()`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/runner/llm.ts#L226) again without waiting for you. It builds the request as in Section 3, now with the model's two write calls and their results. [`llm.stream()` in `packages/core/src/session/runner/step.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/runner/step.ts#L99) sends it as **#15 Request**.

<details markdown="1">
<summary>Request preparation inside runStep()</summary>

Source excerpt from `packages/core/src/session/runner/llm.ts`. For #15, the step limit is not reached, so `primary()` uses `transcript.messages`:

{% raw %}
```typescript
const transcript = SessionModelRequest.baseTranscript({
  // ...
  messages: loaded.messages,
})
const prepared = yield* context.request
  .primary({
    // ...
    system: transcript.system,
    messages: stepLimitReached
      ? [...transcript.messages, Message.assistant(MAX_STEPS_PROMPT)]
      : transcript.messages,
    // ...
  })
  .pipe(
    // ...
  )
const outcome = yield* steps.attempt({
  // ...
  prepared: {
    ...prepared,
    // ...
  },
  // ...
})
```
{% endraw %}

</details>

## 5.3 The Loop Continues

For example, in **#15 → Response → Raw response**, the model asks OpenCode to run the tests with the `shell` tool:

[![#15 Raw response: shell call and test command]({{ '/assets/lab-02/15.png' | relative_url }})]({{ '/assets/lab-02/15.png' | relative_url }}){:target="_blank" rel="noopener"}

The command reports that `pytest` is missing. OpenCode includes that result in #16 Request, and the model asks it to install `pytest` and retry. The retry reports `2 failed, 5 passed`, so in #17 the model asks for fixes. It requests another test run and PDF processing in #18, then output checks in #19.

## 5.4 Why OpenCode Stops After #20
{: #why-opencode-stops-after-20}

In **#19 Response**, the model requests the `shell` tool to check the output. OpenCode runs the check and sends its result in **#20 Request**. This time the terminal shows a report. Why is there no #21?

[![Terminal: the report's final “Files created” line]({{ '/assets/lab-02/19.png' | relative_url }})]({{ '/assets/lab-02/19.png' | relative_url }}){:target="_blank" rel="noopener"}

Compare the full replies: #14 requested two writes in `delta.tool_calls`; **#20 → Response → Raw response** contains no tool calls. The screenshot below shows just the end of #20's report. OpenCode [appends the `delta.content` fragments as they arrive](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/runner/publish-llm-event.ts#L451); the highlighted text forms the “Files created” line above. The last highlight shows `finish_reason: "stop"` instead of `"tool_calls"`: it describes how the reply ended, not whether OpenCode will call the model again.

[![#20 Raw response: report text highlighted, with finish_reason stop marked separately]({{ '/assets/lab-02/18-highlighted.png' | relative_url }})]({{ '/assets/lab-02/18-highlighted.png' | relative_url }}){:target="_blank" rel="noopener"}

After #14, OpenCode had two write results to send back, so `continuing` was true and it started #15. After #20, there is no new tool call, so `runStep()` returns `false`. With no pending user input and `force` already reset to `false`, the [check in Section 5.2](#loop-exit-check) returns `Complete` instead of `Ready`. OpenCode does not start #21.

One user prompt was enough: the model chose what to do next, and OpenCode's **agent harness** ran the tools, sent back their results, and stopped calling the model after #20.

## References

- [OpenCode 2.2.0 session runner](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/runner/llm.ts)

- [Model request construction](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/model-request.ts)

- [Built-in system instructions](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/system-prompt.ts#L17)

- [Plan mode implementation](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/plugin/plan.ts)

- [Tool-call execution](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/runner/step.ts)

- [Tool lookup and dispatch](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/tool.ts#L313)

- [Argument validation and tool execution](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/tool/runtime.ts#L29)

- [Write tool implementation](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/tool/plugin/write.ts)

- [Tool results in model messages](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/runner/to-llm-message.ts)

- [Tool activity and continuation](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/runner/publish-llm-event.ts#L649)

Source links are pinned to the OpenCode version used in this lab.

---

[Previous: Executing the Model's Tool Calls]({{ '/lessons/harness-engineering/tool-execution/' | relative_url }}) · [Lab 2 Overview]({{ '/lessons/harness-engineering/' | relative_url }})

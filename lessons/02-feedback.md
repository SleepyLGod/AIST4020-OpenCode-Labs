---
layout: default
title: "5. When OpenCode Continues or Stops"
parent: "Lab 2: Harness Engineering Overview"
nav_order: 5
permalink: /lessons/harness-engineering/feedback/
---

# 5. When OpenCode Continues or Stops

After writing both files, OpenCode sends their results in [**#15 Request**]({{ '/downloads/lab1-trace-demo.html' | relative_url }}#/session/ses_e3b26034dffevfCDf3plyBVSPC/record/15){:target="_blank" rel="noopener"} without waiting for another user prompt. The loop stops after #20. How does OpenCode prepare the next request, and decide whether to continue?

First, look at OpenCode's next request: [**#15 → Request → Raw request → REQUEST BODY**]({{ '/downloads/lab1-trace-demo.html' | relative_url }}#/session/ses_e3b26034dffevfCDf3plyBVSPC/record/15){:target="_blank" rel="noopener"}. In [#14]({{ '/downloads/lab1-trace-demo.html' | relative_url }}#/session/ses_e3b26034dffevfCDf3plyBVSPC/record/14){:target="_blank" rel="noopener"}, `messages` ended with your new user prompt. In #15, three entries follow those previous messages:

<div markdown="0">
  <a href="{{ '/assets/lab-02/15-request-numbered.html' | relative_url }}" target="_blank" rel="noopener" aria-label="Enlarge #15 request with numbered messages">
    {% include trace15-numbered.html %}
  </a>
</div>

1. `"role": "assistant"`: OpenCode includes the model's #14 reply. Its `tool_calls` array contains both tool calls: write `chunk_pdfs.py` (**A**) and write `test_chunk_pdfs.py` (**B**).
2. `"role": "tool"`: OpenCode reports `Created file successfully: chunk_pdfs.py` in `content`. Its `tool_call_id` matches the first call's `id` (**A**).
3. `"role": "tool"`: OpenCode reports `Created file successfully: test_chunk_pdfs.py`. Its `tool_call_id` matches the second call's `id` (**B**).

## 5.1 Save Results and Build Messages
{: #51-add-tool-results-to-the-next-request}

These entries come from OpenCode's saved calls and results. After each write, [`packages/core/src/session/message-updater.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/message-updater.ts#L345) saves the result in the record for that call.

When preparing #15, [`packages/core/src/session/runner/to-llm-message.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/runner/to-llm-message.ts#L119) converts the saved calls with `toolCall()`. Its `toolResult()` function below reads each call's result: `tool` is the saved record, `tool.state.content` holds the result, and `tool.id` is the call ID:

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

Next, [`packages/ai/src/protocols/openai-chat.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/ai/src/protocols/openai-chat.ts#L451) puts both calls in the `assistant` message's `tool_calls` array and builds a `tool` message for each result. Below, the call ID becomes `tool_call_id` and the result text becomes `content`:

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

Once [both writes finish](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/runner/step.ts#L151), [`runStep()` in `packages/core/src/session/runner/llm.ts`](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/runner/llm.ts#L288) returns `outcome.needsContinuation`: `true` for #14.

<details markdown="1">
<summary>How runStep() returns the flag</summary>

`Completed` means this step has finished. The value it returns says whether another step is needed:

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

</details>

The [`while` loop](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/runner/llm.ts#L185) stores the value returned by `runStep()` in `continuing`:

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

For example, in [#15]({{ '/downloads/lab1-trace-demo.html' | relative_url }}#/session/ses_e3b26034dffevfCDf3plyBVSPC/record/15){:target="_blank" rel="noopener"} **→ Response → Raw response**, the model asks OpenCode to run the tests with the `shell` tool:

[![#15 Raw response: shell call and test command]({{ '/assets/lab-02/15.png' | relative_url }})]({{ '/assets/lab-02/15.png' | relative_url }}){:target="_blank" rel="noopener"}

The command reports that `pytest` is missing. OpenCode includes that result in #16 Request, and the model asks it to install `pytest` and retry. The retry reports `2 failed, 5 passed`, so in #17 the model asks for fixes. In #18 it asks OpenCode to rerun the tests and process the PDFs.

## 5.4 Why OpenCode Stops After #20
{: #why-opencode-stops-after-20}

In [#19]({{ '/downloads/lab1-trace-demo.html' | relative_url }}#/session/ses_e3b26034dffevfCDf3plyBVSPC/record/19){:target="_blank" rel="noopener"} **→ Response**, the model requests the `shell` tool to check the output. OpenCode runs the check and sends its result in [#20]({{ '/downloads/lab1-trace-demo.html' | relative_url }}#/session/ses_e3b26034dffevfCDf3plyBVSPC/record/20){:target="_blank" rel="noopener"} **→ Request**. The model returns a report, which OpenCode displays in the terminal. Why is there no #21?

[![Terminal: the report's final “Files created” line]({{ '/assets/lab-02/19.png' | relative_url }})]({{ '/assets/lab-02/19.png' | relative_url }}){:target="_blank" rel="noopener"}

Here is the end of [#20]({{ '/downloads/lab1-trace-demo.html' | relative_url }}#/session/ses_e3b26034dffevfCDf3plyBVSPC/record/20){:target="_blank" rel="noopener"} **→ Response → Raw response**:

[![#20 Raw response: report text highlighted, with finish_reason stop marked separately]({{ '/assets/lab-02/18-highlighted.png' | relative_url }})]({{ '/assets/lab-02/18-highlighted.png' | relative_url }}){:target="_blank" rel="noopener"}

The red boxes show how the terminal line was built: one `delta.content` value contains `chunk_pdf`, and the next continues with `s.py`. OpenCode [joins the text in order](https://github.com/anomalyco/opencode/blob/1097e2668b1e08ad63bdf0b1c4860b9bc01e420c/packages/core/src/session/runner/publish-llm-event.ts#L451), so you see `chunk_pdfs.py` in the report. The final highlighted field is `finish_reason: "stop"`, rather than `"tool_calls"` as in [#14]({{ '/downloads/lab1-trace-demo.html' | relative_url }}#/session/ses_e3b26034dffevfCDf3plyBVSPC/record/14){:target="_blank" rel="noopener"}.

The full #20 response contains no tool calls ([diagram step 5B]({{ '/lessons/harness-engineering/overview/#harness-flow' | relative_url }})), so `runStep()` returns `false`. No user input is pending and `force` is already `false`, so the [check in Section 5.2](#loop-exit-check) returns `Complete`. OpenCode does not start #21.

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

---

[Previous: Executing the Model's Tool Calls]({{ '/lessons/harness-engineering/tool-execution/' | relative_url }}) · [Lab 2 Overview]({{ '/lessons/harness-engineering/' | relative_url }})

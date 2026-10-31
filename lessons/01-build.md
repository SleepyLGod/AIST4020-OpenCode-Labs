---
layout: default
title: "3. Develop a Feature with OpenCode"
parent: "Lab 1: Getting Started with OpenCode"
nav_order: 3
permalink: /lessons/getting-started/build/
---

# 3. Develop a Feature with OpenCode

We now know what the website does: it saves article links, but cannot distinguish
read articles from unread ones. Let's ask OpenCode to add reading status and filters.

OpenCode provides **Plan** mode to discuss changes and **Build** mode to implement and check them.

## Discuss the Change

Enter `/agents` and choose **plan**.

[![OpenCode with Plan selected below the input box]({{ '/assets/lab-01/opencode-plan-selected.png' | relative_url }})]({{ '/assets/lab-01/opencode-plan-selected.png' | relative_url }})

Use this reference prompt, or adapt it to the website you want:

```text
Plan this improvement to the website at http://127.0.0.1:4175/:
- Let me mark each article as read or unread.
- Add All, Unread, and Read filters.
- Keep my saved articles and their existing reading status, including after a page reload.
- New articles, and older ones with no reading status, should start unread.
- Keep adding, opening, and deleting articles working.

Include both kinds of checks in the implementation:
1. Add and run tests for these behaviors, including loading articles saved by the old version.
2. Try the website in a fresh, visible test browser, separate from my personal browser:
   - Add two example articles: Alpha at https://example.com/alpha and Beta at https://example.com/beta.
   - Check that both start unread, then mark Beta as read.
   - All should show both; Unread only Alpha; Read only Beta.
   - Refresh, then select All. Both articles should remain, with Alpha unread and Beta read.
     Check all three filters again; the selected filter does not need to survive a refresh.
   - Do not open these example links. Save a screenshot to output/playwright/acceptance.png,
     then close the test browser.

After implementation, summarize the changes and what passed, failed, or could not be checked.
For now, give me a short plan and do not change code.
```

Discuss the proposal until it describes the website you want. We asked for a
shorter explanation of the page changes and checks:

[![Our follow-up question and OpenCode's four-point plan for the controls, filters, saved data, and checks]({{ '/assets/lab-01/opencode-plan-result.png' | relative_url }})]({{ '/assets/lab-01/opencode-plan-result.png' | relative_url }})

## Implement and Check

When the plan looks right, use `/agents` to select **Build** in the same conversation.
Saying yes alone does not change the mode.

Then confirm. Its reply above mentioned opening links, so we reminded it to leave
the example links unopened:

```text
Yes, implement the plan and carry out both the tests and the browser checks. Keep the Alpha and Beta links unopened, as originally requested. Show me the results.
```

[![OpenCode confirms the switch from Plan to Build, followed by our instruction to implement and check]({{ '/assets/lab-01/opencode-build-selected.png' | relative_url }})]({{ '/assets/lab-01/opencode-build-selected.png' | relative_url }})

During implementation, OpenCode asks permission to edit files and run tests. Approve the
work you agreed to. Reject an unexpected action first, then ask OpenCode why it is needed.

Here, adding `read: false` makes new articles start unread:

[![A file-edit approval showing articles.js gaining read: false, with Allow once and Reject options]({{ '/assets/lab-01/opencode-edit-approval.png' | relative_url }})]({{ '/assets/lab-01/opencode-edit-approval.png' | relative_url }})

OpenCode checks that new articles start unread, older saved articles still load,
and reading status survives a reload. It then uses the browser to try the controls.
Here is its results report from our run:

[![OpenCode reports eleven passing tests and completed browser checks, and identifies what it did not check]({{ '/assets/lab-01/opencode-implementation-result.png' | relative_url }})]({{ '/assets/lab-01/opencode-implementation-result.png' | relative_url }})

<details markdown="1">
<summary>Test output from this run</summary>

```text
> test
> node --test

✔ a new browser has an empty list (1.292166ms)
✔ article creation trims titles and normalizes web addresses (1.750708ms)
✔ empty and oversized titles are rejected (0.120625ms)
✔ only public-format HTTP and HTTPS links are accepted (0.079333ms)
✔ saving and reloading preserves article data and order (0.206333ms)
✔ invalid saved data is reported without overwriting it (0.113125ms)
✔ storage errors are not reported as successful saves (0.124625ms)
✔ new articles start unread (0.296667ms)
✔ toggled read status survives saving and reloading (0.0775ms)
✔ articles saved by the old version load as unread (0.091166ms)
✔ saved articles with a non-boolean read status are rejected (0.084791ms)
ℹ tests 11
ℹ suites 0
ℹ pass 11
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 77.761875
```

</details>

If OpenCode reports a failure or skips a requested check, ask it to finish that work.

[![Example completed website with reading-state controls]({{ '/assets/lab-01/after-example.png' | relative_url }})]({{ '/assets/lab-01/after-example.png' | relative_url }})

Now try <http://127.0.0.1:4175/> in your usual browser. Save an article you want to
read, mark it as read, try the filters, and refresh. Your browser has its own list,
separate from OpenCode's test articles. Try opening and deleting an article too.

If something is wrong, tell OpenCode what you did, what happened, and what you
expected. You can also ask for an improvement of your own.

While using Plan or Build mode, you may see **Compaction**:

[![Automatic compaction summarizing the reading-status task during our run]({{ '/assets/lab-01/opencode-auto-compaction.png' | relative_url }})]({{ '/assets/lab-01/opencode-auto-compaction.png' | relative_url }})

OpenCode stores your conversation, tool calls and the results locally in [SQLite](https://sqlite.org/). To stay within the model’s context limit, it automatically summarizes the conversation while keeping recent messages. This is **compaction**. We will explain more in a later lab.

## Continue or Start a New Conversation

Exit OpenCode with `/exit`, reopen it in the same project, and use `/sessions`
to find the conversation:

[![The sessions menu after restarting OpenCode lists the conversation used to develop this website]({{ '/assets/lab-01/opencode-sessions.png' | relative_url }})]({{ '/assets/lab-01/opencode-sessions.png' | relative_url }})

OpenCode names the conversation from your first message. Select it; you can use
`/rename` to change its name.

Continue with a question, for example:

```text
What did we change, and were any checks left unfinished?
Use our earlier conversation; do not run tools. Keep the answer short.
```

Here is the reply from our run:

[![Our question after restoring the conversation, followed by OpenCode's full recap]({{ '/assets/lab-01/opencode-resumed-conversation.png' | relative_url }})]({{ '/assets/lab-01/opencode-resumed-conversation.png' | relative_url }})

Compare its reply with the earlier results report. OpenCode saves the conversation
so you can continue the work.

Now use `/new` to start a separate conversation:

[![A new OpenCode conversation has an empty input area and no earlier messages]({{ '/assets/lab-01/opencode-new-conversation.png' | relative_url }})]({{ '/assets/lab-01/opencode-new-conversation.png' | relative_url }})

You can ask the same question and compare the replies. The new conversation has
no old messages, but uses the same project files, instructions, Skills, and project
settings.

**References**

- [OpenCode 2.2.0 terminal controls](https://github.com/anomalyco/opencode/blob/v2.2.0/services/www/src/docs/content/cli/tui.mdx)
- [Microsoft Playwright CLI](https://github.com/microsoft/playwright-cli)

---

[Previous: Get to Know the Project]({{ '/lessons/getting-started/explore/' | relative_url }})

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

[![OpenCode with Plan selected below the input box]({{ '/assets/lab-01/opencode-plan-selected.png' | relative_url }})]({{ '/assets/lab-01/opencode-plan-selected.png' | relative_url }}){:target="_blank" rel="noopener"}

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

Discuss the proposal until it describes the website you want. Here is a part of
OpenCode's plan from our demo:

[![Part of OpenCode's original plan, showing the proposed checks and Plan mode]({{ '/assets/lab-01/opencode-plan-result.png' | relative_url }})]({{ '/assets/lab-01/opencode-plan-result.png' | relative_url }}){:target="_blank" rel="noopener"}

## Implement and Check

Use `/agents` to switch to **Build**. Ask OpenCode to implement the plan and report
the test results, as shown below:

[![OpenCode confirms the switch from Plan to Build, followed by our instruction to implement and check]({{ '/assets/lab-01/opencode-build-selected.png' | relative_url }})]({{ '/assets/lab-01/opencode-build-selected.png' | relative_url }}){:target="_blank" rel="noopener"}

During implementation, OpenCode asks permission to edit files and run tests. Approve the
work you agreed to. Reject an unexpected action first, then ask OpenCode why it is needed.

For example, here is a request to edit a project file:

[![A file-edit approval showing articles.js gaining read: false, with Allow once and Reject options]({{ '/assets/lab-01/opencode-edit-approval.png' | relative_url }})]({{ '/assets/lab-01/opencode-edit-approval.png' | relative_url }}){:target="_blank" rel="noopener"}

OpenCode will then run the checks in your plan and report the results like this:

[![OpenCode reports eleven passing tests and completed browser checks, and identifies what it did not check]({{ '/assets/lab-01/opencode-implementation-result.png' | relative_url }})]({{ '/assets/lab-01/opencode-implementation-result.png' | relative_url }}){:target="_blank" rel="noopener"}

If OpenCode reports a failure or skips a requested check, ask it to finish that work.

[![Example completed website with reading-state controls]({{ '/assets/lab-01/after-example.png' | relative_url }})]({{ '/assets/lab-01/after-example.png' | relative_url }}){:target="_blank" rel="noopener"}

After OpenCode finishes, try the website yourself at <http://127.0.0.1:4175/>.
Add an article, mark it as read, try the filters, and refresh.

If something is wrong, tell OpenCode what you did, what happened, and what you
expected. You can also ask for an improvement of your own.

While using Plan or Build mode, you may see **Compaction** in OpenCode's terminal interface:

[![The Compaction indicator during our run]({{ '/assets/lab-01/opencode-auto-compaction.png' | relative_url }}){:width="424"}]({{ '/assets/lab-01/opencode-auto-compaction.png' | relative_url }}){:target="_blank" rel="noopener"}

OpenCode stores your conversation, tool calls and the results locally in [SQLite](https://sqlite.org/). To stay within the model’s context limit, it automatically summarizes the conversation while keeping recent messages. This is **compaction**. We will explain more in a later lab.

## Continue or Start a New Conversation

Exit OpenCode with `/exit`, reopen it in the same project, and use `/sessions`
to find the conversation:

[![The sessions menu after restarting OpenCode lists the conversation used to develop this website]({{ '/assets/lab-01/opencode-sessions.png' | relative_url }})]({{ '/assets/lab-01/opencode-sessions.png' | relative_url }}){:target="_blank" rel="noopener"}

OpenCode generated this session name from our first message: "I'm new to this
project. Briefly explain what it does. ..." Select the conversation to continue.
You can also use `/rename` to change its name.

You can continue by asking OpenCode to recall the work without using tools, as below:

[![Our question after restoring the conversation, followed by OpenCode's full recap]({{ '/assets/lab-01/opencode-resumed-conversation.png' | relative_url }})]({{ '/assets/lab-01/opencode-resumed-conversation.png' | relative_url }}){:target="_blank" rel="noopener"}

You can also use `/new` to start a new conversation in the same project folder:

[![A new OpenCode conversation has an empty input area and no earlier messages]({{ '/assets/lab-01/opencode-new-conversation.png' | relative_url }})]({{ '/assets/lab-01/opencode-new-conversation.png' | relative_url }}){:target="_blank" rel="noopener"}

You can ask the same question and compare the replies. The new conversation has
no old messages, but uses the same project files, instructions, Skills, and project
settings.

**References**

- [OpenCode 2.2.0 terminal controls](https://github.com/anomalyco/opencode/blob/v2.2.0/services/www/src/docs/content/cli/tui.mdx)
- [Microsoft Playwright CLI](https://github.com/microsoft/playwright-cli)

---

[Previous: Get to Know the Project]({{ '/lessons/getting-started/explore/' | relative_url }})

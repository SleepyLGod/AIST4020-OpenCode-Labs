---
layout: default
title: "3. Improve the Website"
parent: "Lab 1: Getting Started with OpenCode"
nav_order: 3
permalink: /lessons/getting-started/build/
---

# 3. Improve the Website

The website can save articles, but you cannot tell which ones you have read.
Let's ask OpenCode to add an **Unread / Read** choice and filters.

OpenCode has two modes we will use: **Plan** to discuss the changes without
editing the website, and **Build** to implement them.

## Discuss the Change in Plan Mode

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
   - Add Alpha at https://example.com/alpha and Beta at https://example.com/beta.
   - Check that both start unread, then mark Beta as read.
   - All should show both; Unread only Alpha; Read only Beta.
   - Refresh, then select All. Both articles should remain, with Alpha unread and Beta read.
     Check all three filters again; the selected filter does not need to survive a refresh.
   - Do not open these example links. Save a screenshot to output/playwright/acceptance.png,
     then close the test browser.

After implementation, summarize the changes and what passed, failed, or could not be checked.
For now, give me a short plan and do not change code.
```

The browser check starts with an empty list and uses Alpha and Beta. The program
tests separately check that older saved articles still load.

Discuss how you want the website to work until you are happy with the plan.

## Let Build Mode Implement It

When the plan looks right, use `/agents` to select **Build** in the same conversation.
Confirm the plan, for example:

```text
Yes, implement the plan and carry out both the tests and the browser checks.
Show me the results.
```

OpenCode will request permission to edit files and run test commands. Approve the
work you agreed to. Reject an unexpected action first, then ask OpenCode why it is needed.

[![A file-edit approval showing articles.js gaining read: false, with Allow once and Reject options]({{ '/assets/lab-01/opencode-edit-approval.png' | relative_url }})]({{ '/assets/lab-01/opencode-edit-approval.png' | relative_url }})

*Earlier run: this edit makes new articles start unread.*

Its tests check the code's behavior; the browser checks show whether the page
works when clicked and refreshed. If it reports a failure or skips a check,
ask it to address that before calling the work finished.

An excerpt from an earlier run's `npm test` output:

```text
✔ new articles start unread (0.046208ms)
✔ entries saved by older versions without a read flag load as unread (0.076208ms)
✔ read status round-trips through save and reload (0.09125ms)
✔ a non-boolean read flag is still invalid saved data (0.080875ms)
ℹ tests 11
ℹ suites 0
ℹ pass 11
ℹ fail 0
```

[![OpenCode's browser report lists filter and reload checks, a corrected screenshot command, and checks it did not perform]({{ '/assets/lab-01/opencode-browser-results.png' | relative_url }})]({{ '/assets/lab-01/opencode-browser-results.png' | relative_url }})

*Earlier run: OpenCode reports its browser checks, including what it did not check.*

[![Example completed website with reading-state controls]({{ '/assets/lab-01/after-example.png' | relative_url }})]({{ '/assets/lab-01/after-example.png' | relative_url }})

*Example from an earlier run with Alpha and Beta. Your version may look different.*

## Try Your Website

Open <http://127.0.0.1:4175/> in your usual browser. Save an article you want to
read, mark it as read, try the filters, and refresh. Your browser has its own list,
separate from OpenCode's test articles. Try opening and deleting an article too.

If something is wrong, tell OpenCode what you did, what happened, and what you
expected. You can also ask for an improvement of your own.

## Optional: Continue the Conversation

Enter `/sessions` to find this conversation and its earlier messages. Exit
OpenCode, reopen it in the same project, and use `/sessions` to return to it.
Continue with a question, for example:

```text
What did we change, and were any checks left unfinished?
Use our earlier conversation; do not run tools. Keep the answer short.
```

[![A resumed conversation reports completed changes and tests, with browser checks still unfinished]({{ '/assets/lab-01/opencode-resumed-conversation.png' | relative_url }})]({{ '/assets/lab-01/opencode-resumed-conversation.png' | relative_url }})

*Earlier run: this conversation was resumed before the browser checks.*

Compare its reply with the earlier results report. OpenCode saves the conversation
so you can continue the work. To try a separate conversation, use `/new`; the
original remains in `/sessions`, and your website changes stay in place.

## References

- [OpenCode 2.2.0 terminal controls](https://github.com/anomalyco/opencode/blob/v2.2.0/services/www/src/docs/content/cli/tui.mdx)
- [Microsoft Playwright CLI](https://github.com/microsoft/playwright-cli)

---

[Previous: Explore the Website]({{ '/lessons/getting-started/explore/' | relative_url }})

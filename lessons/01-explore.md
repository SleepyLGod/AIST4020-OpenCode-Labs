---
layout: default
title: "2. Get to Know the Project"
parent: "Lab 1: Getting Started with OpenCode"
nav_order: 2
permalink: /lessons/getting-started/explore/
---

# 2. Get to Know the Project

Let's ask OpenCode to explain the project, prepare its environment, and help us run it.

## Understand and Prepare the Project

Download and unzip [reading-list-starter.zip]({{ '/downloads/reading-list-starter.zip' | relative_url }}).
In the `reading-list` project folder, run `opencode --standalone` and select your
model with `/models` if needed. Reference prompt:

```text
I'm new to this project. Briefly explain what it does.
Check what is needed to run it and what is already installed.
Before installing anything, explain what you need and where it will go, then ask me.
Keep project dependencies and browser downloads inside this project.
Once setup is complete, give me the exact command to start it and the address to open.
If it runs in a browser, use http://127.0.0.1:4175/.
Do not start it yet or change application code.
```

Here is how OpenCode described the project in our run:

[![OpenCode explains that the project saves article links and keeps them across reloads]({{ '/assets/lab-01/opencode-project-explanation.png' | relative_url }})]({{ '/assets/lab-01/opencode-project-explanation.png' | relative_url }})

Discuss what to install and where before agreeing to OpenCode's proposal:

[![OpenCode reports installed tools, missing dependencies, and proposed installations]({{ '/assets/lab-01/opencode-environment.png' | relative_url }})]({{ '/assets/lab-01/opencode-environment.png' | relative_url }})

One correction to this reply: the browser package is for browser checks;
the program tests use Node.js itself.

When it asks to run a command, such as `npm ci` to install this project's dependencies, choose
**Allow once** if it matches your agreement, or **Reject** if it does not.

[![A real permission request to run npm ci, with Allow once and Reject choices]({{ '/assets/lab-01/opencode-install-approval.png' | relative_url }})]({{ '/assets/lab-01/opencode-install-approval.png' | relative_url }})

[![OpenCode's setup report lists installed dependencies, seven passing starter tests, and the website ready to start]({{ '/assets/lab-01/opencode-setup-result.png' | relative_url }})]({{ '/assets/lab-01/opencode-setup-result.png' | relative_url }})

## See What the Website Does

In a new terminal in the project folder, run the command OpenCode just provided:

```sh
PORT=4175 npm start
```

Once you see `Reading List: http://127.0.0.1:4175`, leave the server running
and return to OpenCode.

Ask OpenCode to try the website. Reference prompt:

```text
I've started the website at http://127.0.0.1:4175/.
Open it in a separate visible test browser, not my personal browser.
Add these two articles without opening their links:
- Web Notes: https://example.com/web-notes
- Testing Notes: https://example.com/testing-notes
Refresh the page and check whether both articles remain.
Do not change code.
Briefly explain what you could do on the page and what happened after refreshing.
Save a screenshot to output/playwright/explore.png, then close the test browser.
```

We included the **playwright-cli Skill**, a guide to the browser tool.
This request asks to read it:

[![OpenCode requests permission to read the playwright-cli Skill]({{ '/assets/lab-01/opencode-skill-approval.png' | relative_url }})]({{ '/assets/lab-01/opencode-skill-approval.png' | relative_url }})

OpenCode then asks to check the website's address and open the test browser:

[![A separate approval to check the local website and open the test browser]({{ '/assets/lab-01/opencode-browser-open-approval.png' | relative_url }})]({{ '/assets/lab-01/opencode-browser-open-approval.png' | relative_url }})

[![OpenCode reports that both articles survived the refresh and notes its unsuccessful attempt to start a second server]({{ '/assets/lab-01/opencode-explore-result.png' | relative_url }})]({{ '/assets/lab-01/opencode-explore-result.png' | relative_url }})

This run used an earlier prompt that did not say the website was already running.
After a duplicate start failed, OpenCode used the running website.

[![The starter website after adding Web Notes and Testing Notes]({{ '/assets/lab-01/before.png' | relative_url }})]({{ '/assets/lab-01/before.png' | relative_url }})

In this example, the two saved articles remain after refreshing, but the page has no reading-status
or filter controls. OpenCode's test browser has its own list; these entries will
not appear in your usual browser.

We also prepared **AGENTS.md** with instructions for working in this project,
such as explaining installations before running them. Read it with:

```sh
cat AGENTS.md
```

Later labs will explain how OpenCode uses these project instructions.

---

[Previous: Set Up OpenCode]({{ '/lessons/getting-started/install/' | relative_url }}) |
[Next: Develop a Feature with OpenCode]({{ '/lessons/getting-started/build/' | relative_url }})

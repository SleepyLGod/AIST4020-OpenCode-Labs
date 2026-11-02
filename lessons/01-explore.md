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
In the `reading-list` project folder, run `opencode --standalone`. Reference prompt:

```text
I'm new to this project. Briefly explain what it does.
Check what is needed to run it and what is already installed.
Before installing anything, explain what you need and where it will go, then ask me.
Keep project dependencies and browser downloads inside this project.
Once setup is complete, give me the exact command to start it and the address to open.
If it runs in a browser, use http://127.0.0.1:4175/.
Do not start it yet or change application code.
```

Here is an example of OpenCode's project description:

[![OpenCode explains that the project saves article links and keeps them across reloads]({{ '/assets/lab-01/opencode-project-explanation.png' | relative_url }})]({{ '/assets/lab-01/opencode-project-explanation.png' | relative_url }}){:target="_blank" rel="noopener"}

You can discuss what to install and where with OpenCode before agreeing on the
final environment configuration. Here is OpenCode's environment check from our demo:

[![OpenCode's environment check shows installed tools and missing project dependencies and test browser]({{ '/assets/lab-01/opencode-environment.png' | relative_url }})]({{ '/assets/lab-01/opencode-environment.png' | relative_url }}){:target="_blank" rel="noopener"}

In this demo, the project dependencies and test browser still needed to be installed.

When it asks to run a command, choose
**Allow once** if it matches your agreement, or **Reject** if it does not.

[![A real permission request to run npm ci, with Allow once and Reject choices]({{ '/assets/lab-01/opencode-install-approval.png' | relative_url }})]({{ '/assets/lab-01/opencode-install-approval.png' | relative_url }}){:target="_blank" rel="noopener"}

Here is an example setup report:

[![OpenCode's setup report lists installed dependencies, seven passing starter tests, and the website ready to start]({{ '/assets/lab-01/opencode-setup-result.png' | relative_url }})]({{ '/assets/lab-01/opencode-setup-result.png' | relative_url }}){:target="_blank" rel="noopener"}

## See What the Website Does

Run the command OpenCode provided in a new terminal in the project folder:

```sh
PORT=4175 npm start
```

Once you see `Reading List: http://127.0.0.1:4175`, leave the server running
and return to OpenCode.

You can try the website yourself, or ask OpenCode to explore it for you. Reference prompt:

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

We've included the **playwright-cli Skill** in the project folder to guide browser
testing. OpenCode may ask permission to load it:

[![OpenCode requests permission to read the playwright-cli Skill]({{ '/assets/lab-01/opencode-skill-approval.png' | relative_url }})]({{ '/assets/lab-01/opencode-skill-approval.png' | relative_url }}){:target="_blank" rel="noopener"}

OpenCode may also ask permission to check the website's address and open the test browser:

[![A separate approval to check the local website and open the test browser]({{ '/assets/lab-01/opencode-browser-open-approval.png' | relative_url }})]({{ '/assets/lab-01/opencode-browser-open-approval.png' | relative_url }}){:target="_blank" rel="noopener"}

Here is what OpenCode found when it tried the website:

In this earlier run, our reference prompt did not say the website was already
running, so OpenCode tried to start it again.

[![OpenCode reports that both articles survived the refresh and notes its unsuccessful attempt to start a second server]({{ '/assets/lab-01/opencode-explore-result.png' | relative_url }})]({{ '/assets/lab-01/opencode-explore-result.png' | relative_url }}){:target="_blank" rel="noopener"}

In this run, both articles remained after refreshing, but you can see this reading
list website still lacks read/unread controls and filters.

[![The starter website after adding Web Notes and Testing Notes]({{ '/assets/lab-01/before.png' | relative_url }})]({{ '/assets/lab-01/before.png' | relative_url }}){:target="_blank" rel="noopener"}

OpenCode's test browser has its own list; these entries will not appear in your usual browser.

We also prepared **AGENTS.md** with instructions for working in this project,
such as explaining installations before running them. Read it with:

```sh
cat AGENTS.md
```

Later labs will explain what these project instructions are and how OpenCode uses them.

---

[Previous: Set Up OpenCode]({{ '/lessons/getting-started/install/' | relative_url }}) |
[Next: Develop a Feature with OpenCode]({{ '/lessons/getting-started/build/' | relative_url }})

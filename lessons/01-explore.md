---
layout: default
title: "2. Explore the Website"
parent: "Lab 1: Getting Started with OpenCode"
nav_order: 2
permalink: /lessons/getting-started/explore/
---

# 2. Explore the Website

Now that OpenCode is connected, let's use it to understand and run a website project.

## Understand and Prepare the Project

[Download the website project]({{ '/downloads/reading-list-starter.zip' | relative_url }})
and unzip it wherever you keep your projects. Exit the OpenCode you opened earlier,
then run it from the extracted `reading-list` folder:

```sh
opencode --standalone
```

Select your connected model with `/models`. Ask OpenCode to explain the project
and prepare what it needs. Reference prompt:

```text
I'm new to this web project. Briefly explain what it does.
Check what it needs to run and test, and what is already installed.
Before installing anything, explain what you need and where it will go, then ask for approval.
After I approve, prepare the environment. Keep project dependencies and browser downloads inside this project.
Use port 4175 for the website. After setup, give me the exact startup command and local address.
Do not change application code or install system-wide tools.
```

[![OpenCode reports installed tools, missing dependencies, and proposed installations]({{ '/assets/lab-01/opencode-environment.png' | relative_url }})]({{ '/assets/lab-01/opencode-environment.png' | relative_url }})

*Environment check from an earlier run. Your computer may need different installations.*

If something is missing, discuss the proposed installation and its location with
OpenCode, then confirm the plan in the conversation. When it asks to run a
command, such as `npm ci` to install this project's dependencies, choose
**Allow once** if it matches your agreement, or **Reject** if it does not.

[![A real permission request to run npm ci, with Allow once and Reject choices]({{ '/assets/lab-01/opencode-install-approval.png' | relative_url }})]({{ '/assets/lab-01/opencode-install-approval.png' | relative_url }})

*The installation approval in that run.*

## Run and Explore the Website

After setup, run the startup command OpenCode gives you in another terminal in
the project folder. For the supplied project on port 4175:

```sh
PORT=4175 npm start
```

When the terminal prints `Reading List: http://127.0.0.1:4175`, the website is
running. Leave this command running and return to OpenCode for the browser check below.

Now let OpenCode demonstrate the website rather than just describe the code.
Reference prompt:

```text
Open http://127.0.0.1:4175/ in a separate visible test browser, not my personal browser.
Add these two articles without opening their links:
- Web Notes: https://example.com/web-notes
- Testing Notes: https://example.com/testing-notes
Refresh the page and check whether both articles remain.
Do not change code.
Briefly explain what you could do on the page and what happened after refreshing.
Save a screenshot to output/playwright/explore.png, then close the test browser.
```

We included the **playwright-cli Skill** in the project: a guide OpenCode can
read to use the browser tool. If it asks to load this Skill, it is asking to
read that guide.

[![OpenCode loads the playwright-cli Skill and requests permission to open the website in a browser]({{ '/assets/lab-01/opencode-browser-action.png' | relative_url }})]({{ '/assets/lab-01/opencode-browser-action.png' | relative_url }})

*Earlier run: OpenCode loaded the Skill, then asked to open the test browser.*

[![The starter website after adding Web Notes and Testing Notes]({{ '/assets/lab-01/before.png' | relative_url }})]({{ '/assets/lab-01/before.png' | relative_url }})

*Example of the starter website after adding the two articles.*

The page is a personal reading list: you can save an article's title and link,
open it later, or remove it. Did both entries remain after refreshing?
OpenCode's test browser stores its own list, so these entries will not appear
in your usual browser.

We also prepared **AGENTS.md** with instructions for working in this project,
such as explaining installations before running them. Read it with:

```sh
cat AGENTS.md
```

Later labs will explain how OpenCode uses these project instructions.

---

[Previous: Set Up OpenCode]({{ '/lessons/getting-started/install/' | relative_url }}) |
[Next: Improve the Website]({{ '/lessons/getting-started/build/' | relative_url }})

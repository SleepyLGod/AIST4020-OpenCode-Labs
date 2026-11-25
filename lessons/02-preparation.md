---
layout: default
title: "1. Preparation"
parent: "Lab 2: Harness Engineering Overview"
nav_order: 1
permalink: /lessons/harness-engineering/preparation/
---

# 1. Preparation

## 1.1 Install and Use A Tracer

We will use a course-adapted version of the open-source [opencode-trace](https://github.com/aixmoyu/opencode-trace). It automatically records OpenCode's requests to the model and the model's responses, and provides a browser dashboard for inspecting them.

The walkthrough uses the provided [Trace Demo]({{ '/lessons/harness-engineering/trace/' | relative_url }}); record numbers in your own run may differ.

**Check the environment.** Use OpenCode 2.2.0 from Lab 1. Run `node --version`; [install or update Node.js](https://nodejs.org/en/download) only if it is missing or below version 22.

**Install the tracer in a fresh Lab 1 project.** Download and unzip the [Lab 1 project]({{ '/downloads/opencode-lab1.zip' | relative_url }}) into a new folder. Place the [**tracer installer**]({{ '/downloads/opencode-tracer-0.1.1.tgz' | relative_url }}) inside **opencode-lab1/**, then open a terminal there and run:

{% raw %}
```sh
npx --yes --package ./opencode-tracer-0.1.1.tgz opencode-tracer install .
```
{% endraw %}

**Open OpenCode and the dashboard.** Create **AGENTS.md** as in Lab 1 Section 2, then restart OpenCode:

{% raw %}
```sh
opencode --standalone
```
{% endraw %}

In another terminal in the same project folder, start the dashboard:

{% raw %}
```sh
node .opencode/opencode-tracer-0.1.1/cli.mjs view . 3218
```
{% endraw %}

Open [**http://127.0.0.1:3218**](http://127.0.0.1:3218).

**Repeat the project workflow.** In a new session, follow Lab 1 Sections 2 and 3, from Skill installation through Plan and Build. The tracer saves model requests and responses in **.opencode-trace/** and displays them in the dashboard.

> P.S., Press **Ctrl+C** in that terminal to stop the dashboard. More options: [Tracer usage guide]({{ '/downloads/opencode-tracer-usage.md' | relative_url }}).

We also provide the trace from the same run shown in the opening screenshot. Open [Trace Demo]({{ '/lessons/harness-engineering/trace/' | relative_url }}){:target="_blank" rel="noopener"} and select the session:

[![PDF task demo trace overview]({{ '/assets/lab-02/02.png' | relative_url }})]({{ '/assets/lab-02/02.png' | relative_url }}){:target="_blank" rel="noopener"}

Each trace entry records **one model call**: OpenCode's request and the model's response.

- **#1:** Generate the session title: "Install PDF extraction skill for OpenCode".

- **#2–12:** Install the Skill and prepare the environment.

- **#13:** Plan the PDF tool (Plan mode).

- **#14–20:** Implement, test, check the output, and report (Build mode). **This is the part we’ll focus on.**

Open [#14]({{ '/downloads/lab1-trace-demo.html' | relative_url }}#/session/ses_e3b26034dffevfCDf3plyBVSPC/record/14){:target="_blank" rel="noopener"} in the demo. Select **Request → Raw request** to see what OpenCode sent, or **Response → Raw response** to see what it received:

[![#14 Request: Raw request and the beginning of the request body]({{ '/assets/lab-02/03.png' | relative_url }})]({{ '/assets/lab-02/03.png' | relative_url }}){:target="_blank" rel="noopener"}

In **#14–#20**, one user request led to several model turns, coordinated by the **OpenCode program**. **How does OpenCode connect these turns? What goes into each model request, what triggers the next turn, and when does OpenCode stop and return control to you?**

<details markdown="1">
<summary>1.2 Source Code (Optional Download)</summary>

The walkthrough in later sections links to source files on GitHub. You can also download the course version to read locally:

{% raw %}
```sh
git clone --depth 1 --branch v2.2.0 https://github.com/anomalyco/opencode.git opencode-source
```
{% endraw %}

Lab 1 installed the OpenCode executable, not this source.

</details>

---

[Previous: Lab 2 Overview]({{ '/lessons/harness-engineering/' | relative_url }}) · [Next: The Agent Harness: An Overview]({{ '/lessons/harness-engineering/overview/' | relative_url }})

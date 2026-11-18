---
layout: default
title: "2. The Agent Harness: An Overview"
parent: "Lab 2: Harness Engineering Overview"
nav_order: 2
permalink: /lessons/harness-engineering/overview/
---

# 2. The Agent Harness: An Overview

The diagram below shows how OpenCode organizes the work seen in the [opening terminal screenshot]({{ '/lessons/harness-engineering/#implementation-screenshot' | relative_url }}). You provide the task; OpenCode coordinates the repeated model calls and tool execution that follow.

<div markdown="0">
  <a id="harness-flow" class="harness-diagram-link" href="{{ '/assets/lab-02/diagram.html' | relative_url }}" target="_blank" rel="noopener" aria-label="Open flow diagram in a new tab">
    <iframe class="harness-diagram" src="{{ '/assets/lab-02/diagram.html' | relative_url }}" title="One prompt and repeated model calls" tabindex="-1"></iframe>
  </a>
</div>

OpenCode sends requests to the model, executes the requested tools, and includes their results in the next request. The model uses this feedback to choose the next operation, without a new user prompt at each step.

The software around the model that organizes this work is the **agent harness**. Designing how these parts work together is **harness engineering**.

We will now follow the first cycle, from your implementation prompt through the model's reply and OpenCode's file writes, to the next model call.

---

[Previous: Preparation]({{ '/lessons/harness-engineering/preparation/' | relative_url }}) · [Next: Preparing the Model Request]({{ '/lessons/harness-engineering/model-request/' | relative_url }})

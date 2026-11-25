---
layout: default
title: "Lab 2: Harness Engineering Overview"
nav_order: 3
has_children: true
has_toc: false
permalink: /lessons/harness-engineering/
---

# Lab 2: Harness Engineering Overview

In Lab 1, we prepared the PDF project, discussed a plan with OpenCode, switched to Build, and sent:

{% raw %}
```text
Yes, implement the plan, run the tool and tests, and briefly report the results and where the output is saved.
```
{% endraw %}

OpenCode created files, ran commands, checked results, and continued without a new user prompt for each step. The screenshot below shows this process in one successful run; long code listings are shortened with `...`.

[![OpenCode implementation from prompt to final report, long code omitted]({{ '/assets/lab-02/01.png' | relative_url }})]({{ '/assets/lab-02/01.png' | relative_url }}){:target="_blank" rel="noopener"}
{: #implementation-screenshot}

We'll use the terminal, model-call trace, and OpenCode's source code to see how it handled this request, from start to final report. Together, they give us an overview of harness engineering.

1. [Preparation]({{ '/lessons/harness-engineering/preparation/' | relative_url }})
2. [The Agent Harness: An Overview]({{ '/lessons/harness-engineering/overview/' | relative_url }})
3. [Preparing the Model Request]({{ '/lessons/harness-engineering/model-request/' | relative_url }})
4. [Executing the Model's Tool Calls]({{ '/lessons/harness-engineering/tool-execution/' | relative_url }})
5. [When OpenCode Continues or Stops]({{ '/lessons/harness-engineering/feedback/' | relative_url }})

[Trace Demo]({{ '/lessons/harness-engineering/trace/' | relative_url }}): the recorded model requests and responses used in this walkthrough.

{% include lesson-navigation.html previous_url="/lessons/getting-started/build/" previous_title="Build with OpenCode" next_url="/lessons/harness-engineering/preparation/" next_title="Preparation" %}

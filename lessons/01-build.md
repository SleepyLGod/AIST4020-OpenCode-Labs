---
layout: default
title: "3. Build with OpenCode"
parent: "Lab 1: Getting Started with OpenCode"
nav_order: 3
permalink: /lessons/getting-started/build/
---

# 3. Build with OpenCode

With the Skill and environment ready, let's ask OpenCode to plan and build the PDF tool.

## Discuss the Plan

OpenCode provides **Plan** mode to discuss changes and **Build** mode to implement and check them. Return to the terminal running OpenCode. Enter `/agents` and choose **Plan**.

[![OpenCode Plan mode selection menu]({{ '/assets/lab-01-pdf/plan-mode.png' | relative_url }})]({{ '/assets/lab-01-pdf/plan-mode.png' | relative_url }}){:target="_blank" rel="noopener"}

Ask OpenCode for an implementation plan by pasting this prompt into the conversation:

```text
Plan a Python tool that reads the PDF papers in input/, splits their text into manageable chunks, and saves output/chunks.jsonl. Each record should contain the text, source filename, page number, and a chunk ID. Keep the original PDFs unchanged.

The tool must run locally without calling a language model or external processing service. Write and run automated tests, then run it on the supplied papers. Check that the text is readable and the source filenames and page numbers are correct.

Keep the implementation simple. Briefly explain your plan; do not implement it yet. Use the installed PDF Skill where it helps.
```

You can adjust the plan to your needs or discuss it further with OpenCode. Here is a complete plan offered by OpenCode in our run:

[![Complete saved Plan reply]({{ '/assets/lab-01-pdf/plan-complete.png' | relative_url }})]({{ '/assets/lab-01-pdf/plan-complete.png' | relative_url }}){:target="_blank" rel="noopener"}

## Let OpenCode Build and Check

When the plan is ready, use `/agents` to select **Build** in the same session:

[![OpenCode Build mode selection menu]({{ '/assets/lab-01-pdf/build-mode.png' | relative_url }})]({{ '/assets/lab-01-pdf/build-mode.png' | relative_url }}){:target="_blank" rel="noopener"}

Paste this prompt into OpenCode to implement the plan and run the checks:

```text
Yes, implement the plan, run the tool and tests, and briefly report the results and where the output is saved.
```

As in the previous section, OpenCode may ask permission to edit files or run commands. Approve the work you agreed to; ask about anything unexpected. Here, OpenCode is asking to edit `extract_chunks.py`:

[![Permission to create the PDF processing tool]({{ '/assets/lab-01-pdf/edit-permission.png' | relative_url }})]({{ '/assets/lab-01-pdf/edit-permission.png' | relative_url }}){:target="_blank" rel="noopener"}

After implementation, OpenCode reports what it created and checked. Here is an excerpt from our run:

[![Excerpt from the saved Build results]({{ '/assets/lab-01-pdf/build-results.png' | relative_url }})]({{ '/assets/lab-01-pdf/build-results.png' | relative_url }}){:target="_blank" rel="noopener"}

If a requested check fails or the output file is missing, ask OpenCode to resolve it before continuing. To see the result, open the JSONL file at the path OpenCode reports.

While working in Plan or Build mode, you may see a **Compaction** indicator in the OpenCode CLI:

[![Example of OpenCode's Compaction indicator]({{ '/assets/lab-01-pdf/compaction-example.png' | relative_url }})]({{ '/assets/lab-01-pdf/compaction-example.png' | relative_url }}){:target="_blank" rel="noopener"}

When the conversation approaches the model's context limit, OpenCode summarizes earlier messages while keeping recent ones. This continues the same session; it does not start a new one. You **may not** see compaction during your run. Later labs will explain how it works.

## Continue or Start a New Session

OpenCode saves each conversation as a session. Exit with `/exit` and run `opencode --standalone` again in **opencode-lab1/**. Enter `/sessions` to open the list shown below, then select your earlier session:

[![Select the earlier PDF Extraction session]({{ '/assets/lab-01-pdf/sessions.png' | relative_url }})]({{ '/assets/lab-01-pdf/sessions.png' | relative_url }}){:target="_blank" rel="noopener"}

OpenCode generated this session name from our first message: *"Install PDF Extraction locally in this project for OpenCode: ..."* You can also use `/rename` to change it.

Continue with this reference prompt:

```text
What did we build, and were any requested checks left unfinished? Use our earlier conversation; do not run tools. Keep the answer short.
```

Here is the question and reply from our reopened session:

[![Full question and reply after reopening the session]({{ '/assets/lab-01-pdf/session-reply.png' | relative_url }})]({{ '/assets/lab-01-pdf/session-reply.png' | relative_url }}){:target="_blank" rel="noopener"}

You can also use `/new` to start a new session in the same project folder. It does not inherit the previous session's conversation history, but shares the project files, instructions, installed Skills and settings.

[![New session label, empty input and project path]({{ '/assets/lab-01-pdf/new-session.png' | relative_url }})]({{ '/assets/lab-01-pdf/new-session.png' | relative_url }}){:target="_blank" rel="noopener"}

## References

- [OpenCode documentation](https://opencode.ai/v2/docs/)
- [Agent Skills overview and specification](https://agentskills.io/home)
- PDF Extraction: [Skill listing](https://www.skills.sh/claude-office-skills/skills/pdf-extraction) and [source repository](https://github.com/claude-office-skills/skills)

---

[Previous: Prepare Your Project with OpenCode]({{ '/lessons/getting-started/explore/' | relative_url }}) · [Lab 1]({{ '/lessons/getting-started/' | relative_url }})

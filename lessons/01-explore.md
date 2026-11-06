---
layout: default
title: "2. Prepare Your Project with OpenCode"
parent: "Lab 1: Getting Started with OpenCode"
nav_order: 2
permalink: /lessons/getting-started/explore/
---

# 2. Prepare Your Project with OpenCode

Let’s vibe-code a project from scratch with OpenCode: build a tool that turns PDF papers into text chunks, saved as JSONL with metadata such as filenames and page numbers. This simulates document preprocessing for RAG.

Download and unzip [**opencode-lab1.zip**]({{ '/downloads/opencode-lab1.zip' | relative_url }}), then open the **opencode-lab1/** folder. It contains five PDF papers in **input/** and the project settings, but no program yet.

## Give OpenCode Your Working Instructions

Create **AGENTS.md** in **opencode-lab1/** and paste the following content:

```markdown
# Project working instructions

- Understand the goal first. Ask when an important requirement is unclear.
- Prefer the simplest solution that meets the requirements.
- Use Python as the primary programming language. Use uv and keep dependencies in this project.
- Explain what needs installing and where, and ask before installing it.
- Keep the original files in input/ unchanged. Put generated files in output/.
- You may revise files you create for this task. Ask before overwriting existing files. Never permanently delete files.
- Prefer relevant skills when they can simplify the work or improve the result. Do not modify Skills or permissions.
- Run the tool and tests yourself. Briefly report results and any remaining problems.
```

These are your working instructions for OpenCode in this project. Later labs will explain how OpenCode uses them.

Open a terminal in **opencode-lab1/** and run `opencode --standalone`.

## Find and Install a Skill

A [Skill](https://agentskills.io/home) gives an agent reusable guidance for a particular kind of task. For example, when you ask an agent to review a pull request, it can load a code-review Skill to help it spot and explain problems in the proposed changes.

Let's find a PDF extraction Skill for this project. Search for **PDF Extraction** on GitHub or on [skills.sh](https://skills.sh/), Vercel's directory of agent skills. Here are the results from skills.sh:

[![Search results for PDF Extraction]({{ '/assets/lab-01-pdf/skills-search-user.png' | relative_url }})]({{ '/assets/lab-01-pdf/skills-search-user.png' | relative_url }}){:target="_blank" rel="noopener"}

Open the first result shown above: [pdf-extraction](https://www.skills.sh/claude-office-skills/skills/pdf-extraction) by **claude-office-skills**. On the Skill page, the **Command** tab under **Installation** shows the install command. The link under **Repository** on the right opens the source on GitHub.

[![PDF Extraction source and installation]({{ '/assets/lab-01-pdf/skill-page.png' | relative_url }})]({{ '/assets/lab-01-pdf/skill-page.png' | relative_url }}){:target="_blank" rel="noopener"}

We will install it locally in the project folder so OpenCode can find it again in future sessions. Paste this reference prompt into OpenCode:

```text
Install PDF Extraction locally in this project for OpenCode:
npx skills add https://github.com/claude-office-skills/skills --skill pdf-extraction -a opencode

Check the existing environment and install any missing tools and dependencies needed to use this Skill for PDF text extraction. Keep project dependencies local.

Explain the installations, request approval, and continue until setup is complete. Verify that OpenCode recognizes the Skill and that the dependencies work. Show me where the Skill files are installed.

Do not implement the project yet.
```

OpenCode may ask you to approve installing the Skill and the software it needs. If required tools are missing, OpenCode may ask to install them—for example, Node.js/npm for the Skill installer, or uv and Python for PDF processing. Here, we approved both proposed installations:

[![Installation confirmation question and answer from the saved session]({{ '/assets/lab-01-pdf/install-confirmation.png' | relative_url }})]({{ '/assets/lab-01-pdf/install-confirmation.png' | relative_url }}){:target="_blank" rel="noopener"}

Installing the Skill and its dependencies involves running commands. OpenCode may ask for permission before running them:

[![Permission to run the Skill installation command]({{ '/assets/lab-01-pdf/command-permission.png' | relative_url }})]({{ '/assets/lab-01-pdf/command-permission.png' | relative_url }}){:target="_blank" rel="noopener"}

Choose how to respond to the request:

- **Allow once**: approve this operation only.
- **Reject**: decline an unexpected or unclear operation, then ask OpenCode to explain.
- **Always allow**: also allow future operations covered by the request. Choose this only if you accept that scope.

After installation, OpenCode can read the Skill's instructions. You may see an entry like this:

[![OpenCode loading the pdf-extraction Skill]({{ '/assets/lab-01-pdf/skill-loaded.png' | relative_url }})]({{ '/assets/lab-01-pdf/skill-loaded.png' | relative_url }}){:target="_blank" rel="noopener"}

When setup is complete, OpenCode reports what it installed and where:

[![OpenCode reports that Skill setup is complete]({{ '/assets/lab-01-pdf/setup-complete.png' | relative_url }})]({{ '/assets/lab-01-pdf/setup-complete.png' | relative_url }}){:target="_blank" rel="noopener"}

To inspect the installed Skill, open another terminal in **opencode-lab1/**. Find its file, then read it using the returned path.

On macOS or Linux:

```bash
find .agents/skills -path '*/pdf-extraction/SKILL.md'
cat .agents/skills/pdf-extraction/SKILL.md
```

On Windows PowerShell:

```powershell
Get-ChildItem .agents/skills -Recurse -Filter SKILL.md | Where-Object { $_.Directory.Name -eq 'pdf-extraction' } | Select-Object -ExpandProperty FullName
Get-Content .agents/skills/pdf-extraction/SKILL.md
```

[![OpenCode setup report on the left and Skill file commands on the right]({{ '/assets/lab-01-pdf/skill-files.png' | relative_url }})]({{ '/assets/lab-01-pdf/skill-files.png' | relative_url }}){:target="_blank" rel="noopener"}

This Skill consists of a single file, **SKILL.md**.

---

[Previous: Set Up OpenCode]({{ '/lessons/getting-started/install/' | relative_url }}) · [Next: Build with OpenCode]({{ '/lessons/getting-started/build/' | relative_url }})

---
layout: default
title: Troubleshooting
nav_exclude: true
search_exclude: true
permalink: /help/
---

# Troubleshooting

## Installation and model connection

- **Command not found:** open a new terminal. If `~/.opencode/bin/opencode --version` works, use that full path or follow the installer's PATH instructions.
- **NVIDIA model missing:** start OpenCode in the extracted project folder containing `opencode.json`. This file supplies the example model's connection settings.
- **Authorization or quota error:** check the key and account at NVIDIA Build. Free endpoints and limits can change.
- [OpenCode troubleshooting](https://opencode.ai/v2/docs/troubleshooting) and [provider connections](https://opencode.ai/v2/docs/cli/providers).

## Project setup

Copy the error into OpenCode and ask it to explain the cause before proposing a fix.

- **Node.js missing:** this website needs Node.js 22 or newer. Have OpenCode explain an installation option and its location before you approve it. The project does not permit system-wide installation commands.
- **Port 4175 busy:** use the existing server if it is this project. Otherwise, ask OpenCode to choose another port and update `.playwright/cli.config.json` (`network.allowedOrigins`). Use the same new address in browser prompts; changing ports gives the website a different saved list.
- **Browser missing:** ask whether `npm ci` and `npm run browser:install` completed. The first browser download can take a while.
- **Browser cache approval on macOS:** Playwright CLI may use a project-specific folder under `~/Library/Caches/ms-playwright/`. This is tool cache, not a personal browser profile. Check the requested path before approving it.
- [Playwright CLI documentation](https://github.com/microsoft/playwright-cli).

To stop the website, interrupt `npm start` in its terminal (usually Ctrl+C).

[Return to Lab 1]({{ '/lessons/getting-started/' | relative_url }})

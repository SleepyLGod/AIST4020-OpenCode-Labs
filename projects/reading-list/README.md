# Reading List

A small website for an OpenCode lab. It can add, open, and delete articles and
keep them after a reload. Your task in the lab is to add reading status and filters.

Open a terminal in this folder and start OpenCode:

```sh
opencode --standalone
```

The project includes NVIDIA and DeepSeek model settings. Connect one account in
`/connect`, then select its model in `/models`. Never put an API key in project files.

Ask OpenCode to check the environment before installing anything. The website
and tests require Node.js 22 or newer; browser tools are installed in this project.

## Website and tests

In a second terminal, in this folder:

```sh
PORT=4175 npm start
```

Open <http://127.0.0.1:4175/>. Keep the terminal running while using the website.

```sh
npm test
```

## Browser tools

These are the project-local commands OpenCode can request approval to run:

```sh
npm ci
npm run browser:install
npm run browser -- open http://127.0.0.1:4175/
```

The browser opens in a separate visible window with its own data. Dependencies
go in `node_modules/`, downloads in `.cache/`, and screenshots in
`output/playwright/`. On macOS, the browser tool may also use its system cache.

The shell scripts target macOS/Linux. This lab's instructions cover macOS.
See `THIRD_PARTY.md` for the browser Skill and icon licenses.

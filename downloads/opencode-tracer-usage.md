# OpenCode Course Trace

Adapted from [aixmoyu/opencode-trace](https://github.com/aixmoyu/opencode-trace)
(upstream 0.0.7) for OpenCode 2.2.0. This course edition uses the
2.2.0 plugin hooks and presents model requests and responses separately.
The upstream LICENSE is included. Course changes cover the native plugin
adapter, installation, request labels, read-only viewing, and offline export.

## Trace your own run

Use OpenCode 2.2.0 with the model connection you used in Lab 1.
Check `node --version`: the installer and viewer require Node.js 22 or newer.
If Node.js is missing or older, install a supported version from
[nodejs.org](https://nodejs.org/en/download).
The course adapter has been tested with NVIDIA's HTTP streaming connection.
Download `opencode-tracer-0.1.1.tgz` into your project folder. Run:

```sh
npx --yes --package ./opencode-tracer-0.1.1.tgz opencode-tracer install .
```

No manual extraction is needed. If the archive is elsewhere, replace its path
and quote paths containing spaces. The final `.` means the current project directory.
The plugin records this project's model
calls; it is not installed globally. Installation downloads JavaScript dependencies
into this project. It does
not change your model configuration or permissions. Restart OpenCode in the
project and use it normally. Subsequent model requests are saved in
`.opencode-trace/`; earlier runs cannot be recovered by installing the tracer later.

In a second terminal in the same project:

```sh
node .opencode/opencode-tracer-0.1.1/cli.mjs view . 3218
```

The installer includes this viewer. Start OpenCode in the project first so the
plugin creates `.opencode-trace/`, then open the local URL printed by the viewer.
The viewer reads saved traces; it does not start or stop recording. If port 3218
is occupied, use:

```sh
node .opencode/opencode-tracer-0.1.1/cli.mjs view . 3219
```

Stop the viewer with Ctrl+C. Exit OpenCode with `/exit` to end the current traced
run. To disable tracing for later runs, quit OpenCode and
move `.opencode/plugins/course-trace.js` to Trash before restarting it. Keep the
`.opencode/opencode-tracer-0.1.1/` folder while using the plugin or viewer.

To repeat Lab 1 from scratch, extract its starter archive into a separate
location and install the tracer in that copy's `opencode-lab1/` folder. Follow
Sections 2 and 3 in one new session. A new session in an old project does not
remove its generated programs or dependencies.

## Read an example trace

Open `lab1-trace-demo.html` in a browser. It works offline and needs
neither OpenCode nor a model account. Each numbered record is one HTTP request
to the model service, not one user prompt. Request organizes the input into
instructions, tool definitions, and messages; Raw request retains the JSON body,
including model settings. Response assembles that call's streamed output for
reading, with Raw response available alongside it. The course viewer hides the
redundant Conversation tab. The formatted views are not complete copies of the HTTP exchange.

Authentication headers are excluded, but traces can contain prompts, source
files, tool output, paths, and other sensitive information. Review a trace before
sharing it. Your own OpenCode runs still use your model account and its limits.


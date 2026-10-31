# Screenshot Sources

Screenshots illustrate OpenCode 2.2.0. No model text, approval state, or test
result was rewritten inside an image. Terminal images are contiguous crops of
native ANSI recordings replayed with xterm.js, not recreated interfaces.

## Current Project Conversation: 2026-10-31

Sections 2 and 3 now use one NVIDIA GLM-5.3-Flash conversation in a fresh copy of
the published starter. Configuration, permissions, model limits, and the Plan
and Build step budgets were unchanged. Approvals were made individually in the
TUI. OpenCode made all application and test edits; the operator did not repair
the implementation.

Local source: `/private/tmp/lab1-coherent.b6bA5P/terminal.log` (120 columns, 40 rows).
Session: `ses_e6eb174a8ffeExA2kp1TIrLqGn`.
Offsets below are exclusive byte endpoints; rows and columns are zero-based,
with exclusive ends. Unlisted columns use the full terminal width.

| Current asset | Endpoint | Rows | Purpose |
| --- | ---: | --- | --- |
| `opencode-project-explanation.png` | 433434 | 3-9 | Complete project-description paragraph. |
| `opencode-environment.png` | 503066 | 4-30 | Environment check and installation proposal. |
| `opencode-install-approval.png` | 634235 | 21-39 | User agrees to installation; actual `npm ci` approval. |
| `opencode-setup-result.png` | 1606195 | 19-30 | Installed packages, starter tests, and the exact startup command and URL supplied by OpenCode. |
| `opencode-skill-approval.png` | 1670502 | 28-39 | Request to load `playwright-cli`; not a browser command. |
| `opencode-browser-open-approval.png` | 2055834 | 30-39 | Separate approval for the address check and browser-open command. |
| `opencode-explore-result.png` | 3501344 | 9-30 | Exploration results, including the duplicate-server attempt. |
| `opencode-plan-selected.png` | 7700408 | 33-38; columns 2-76 | Actual Plan state in this conversation. |
| `opencode-plan-result.png` | 7700408 | 10-32 | Follow-up asking for a simpler plan, and the real four-point reply. |
| `opencode-build-selected.png` | 8111642 | 1-7 | Actual Plan-to-Build switch and implementation confirmation. |
| `opencode-edit-approval.png` | 8111642 | 24-39 | Actual request to add `read: false` to `articles.js`. |
| `opencode-implementation-result.png` | 16580654 | 14-30 | Combined program-test and browser report, including untested behavior. |
| `opencode-sessions.png` | 16659884 | 10-20; columns 17-102 | Session picker after exiting and restarting OpenCode. |
| `opencode-resumed-conversation.png` | 16924575 | 1-31 | The actual question and reply after restoring the completed conversation. |
| `opencode-resumed-checks.png` | 16924575 | 17-31 | Continuous excerpt of the same reply: check results and unchecked behavior. The full question and reply remain available in a collapsed section. |
| `opencode-new-conversation.png` | 16935686 | 14-28; columns 22-98 | Empty conversation after `/new`; no model request was sent in it. |
| `before.png` | Browser artifact | Full image | OpenCode's `output/playwright/explore.png`, after adding Web Notes and Testing Notes. |
| `after-example.png` | Browser artifact | Full image | OpenCode's `output/playwright/acceptance.png`, after completing the read/filter/reload checks. |

Important qualifications:

- The preparation prompt, full Plan prompt, Build confirmation, and resumed
  question match the run. The shorter Plan reply followed the question visible
  in its screenshot; it is not presented as the first Plan response.
- The exploration prompt originally started with `Open http://127.0.0.1:4175/`.
  OpenCode attempted a second server start after the operator had already run
  its supplied startup command. That attempt was approved and failed because
  the port was occupied. OpenCode checked the address and used the running server.
  The lesson now explicitly tells it the site is already running. That wording
  improvement has not been rerun; the original failure remains visible.
- The Plan follow-up mentioned opening links. The implementation confirmation
  explicitly restored the original instruction not to open Alpha/Beta links.
- OpenCode automatically compacted history twice. No manual compaction was
  requested. During acceptance it prefixed browser commands with an environment
  variable, causing additional approvals under the unchanged rules.
- The model's installation proposal says the browser dependency is needed for
  tests. This is imprecise: `npm test` uses Node's built-in test runner. The
  screenshot is unchanged; a short correction follows it in the lesson.
- Actual tool output confirms 11 passing tests. Browser snapshots confirm the
  two defaults, read toggle, filters, reload, and filters after reload. The
  restored answer requested no tools and made no tool calls. A separate local
  check of desktop/mobile behavior is not presented as an agent action.
- Before and after browser images use different example articles and isolated
  browser instances; they are not evidence of migrating the same browser data.

Saved reply IDs:

| Reply | ID |
| --- | --- |
| Project and environment | `msg_1914ecdc8001pLGYPNkD42xFqc` |
| Setup and startup command | `msg_191504735001RPrR0eWL4HAc99` |
| Exploration report | `msg_19153091c001fl0w9VC0PnI10q` |
| Shorter Plan reply | `msg_19156626e0018j7SiBYN2hA7f9` |
| Final implementation/check report | `msg_19166ba25001N5NvMEptH6ZTuV` |
| Resumed reply | `msg_19168c97c001Z8crNk95h63a1E` |

The collapsed test output in Section 3 is copied verbatim from the `npm test`
tool result in `messages.json`, message `msg_1915e9b160015ugVrE91oVvYs1`, tool
`a8579214-4fe6-445d-9e4d-86e18298ac10`. Only the surrounding blank line is omitted.
The command completed with exit code 0; its reported test counts are unchanged.

SHA-256:

- Terminal recording: `6942935892bbd76ff6c6914ff0d9151e74c487078743823e92d494b85112c94d`.
- Sanitized messages: `feb8b3661a3d44c55fccfa89722f5d12b21ea2b4198ce5459b3305f341e14055`.
- Exploration image: `d68d9e6e8cd6cbd3b5ec4b9f4634c94b29b5cf52f4de014181f3294b1c89e8d5`.
- Acceptance image: `fd58a5651e7af0e8d7e698411b11ff9218fee87c1b0a54a2406322808d350482`.

## Earlier Captures

The first-section images below remain in use. For assets listed in the current
table above, these are records of the previous image versions, not their current
provenance. Other unused images are retained unchanged.

| Asset | Source |
| --- | --- |
| `opencode-version.png` | Local version command, without a model request. |
| `opencode-unconfigured.png`, `opencode-connect-clean.png`, `opencode-key-clean.png` | Isolated native UI with no credentials; no key or message submitted. |
| `nvidia-api-key.png` | Public NVIDIA Build model page, captured without signing in or generating a key. |
| `opencode-hello.png` | Earlier NVIDIA conversation, terminal replay endpoint 385758. |
| `opencode-environment.png` | Earlier environment check, endpoint 3021009. |
| `opencode-install-approval.png` | Earlier `npm ci` approval, endpoint 3602115. |
| `opencode-setup-result.png` | Earlier completed setup reply, endpoint 6234830; rows 1-25. |
| `opencode-explore-result.png` | Earlier completed website exploration reply, endpoint 11374336; rows 12-25. |
| `opencode-plan-result.png` | Earlier completed Plan reply, endpoint 12458008; rows 8-25. Excerpt covers old articles and proposed checks. |
| `opencode-implementation-result.png` | Earlier implementation reply's test summary, endpoint 20637519; rows 18-25. Browser acceptance was still pending. |
| `opencode-browser-action.png` | Earlier Skill load and browser-open approval, endpoint 7426787; screen rows 11-34. |
| `opencode-edit-approval.png` | Earlier approval to add `read: false` in `articles.js`, endpoint 15320119; rows 20-34. |
| `opencode-resumed-conversation.png` | Earlier resumed question and reply before browser acceptance, endpoint 21201312; rows 1-27. |
| `opencode-browser-results.png` | Earlier browser acceptance report, endpoint 29558867; rows 7-23. Preserves the reported tool error and unperformed checks. |
| `opencode-plan-selected.png` | Isolated native UI after selecting Plan, without sending a model request; endpoint 52543; rows 15-21. |
| `opencode-models-nvidia.png` | Native 2.2.0 model picker in an empty directory with no project config. Existing NVIDIA credential was passed in memory; remote proxy disabled and no message submitted. Endpoint 29104; rows 9-20, columns 32-86. |
| `opencode-build-selected.png` | Same isolated UI after switching Plan to Build through `/agents`; endpoint 82933; rows 18-22, columns 22-97. No implementation was run. |
| `opencode-new-conversation.png` | Same isolated UI after `/new`; endpoint 87176; rows 11-22, columns 22-97. Empty conversation, not a generated answer. |
| `before.png` | Independent browser check of the starter after adding Web Notes and Testing Notes. Not an agent run. |
| `after-example.png` | Earlier NVIDIA trial's browser screenshot, with Alpha unread and Beta read. |

Terminal endpoints are zero-based, exclusive byte offsets in the original
recordings, replayed without changing their contents. Row numbers are zero-based.
The NVIDIA recording used 120 columns and 36 rows; the isolated Plan UI used
112 columns and 32 rows.
The additional native model/Build/new-conversation recording used 120 columns
and 36 rows. It uses the built-in NVIDIA model catalogue, not the course's
custom model definition. No credential was saved in the capture files.

- NVIDIA terminal recording SHA-256:
  `e44a9b67441826e89383ee5f109db4969c477e905e19035bedc2a0dcbfe26386`.
- Isolated Plan UI recording SHA-256:
  `1316625809629ba6531e549cd6c6cf83a7e8e1e8ba7406aa68acfde1d738cb32`.
- Finished website screenshot SHA-256:
  `60716eb04c972820f1eeec3d298195cd0662bcf47d885053ff532241221b0e2b`.
- Native model/Build/new-conversation recording SHA-256:
  `9363411bcf6b9c7d6a3e1cd26698bf47e41f75caaf14f909c4da02815e4f526a`.

The browser report corresponds to saved message `msg_1882c5183001S8b6Z0RqzX7m5V`.
Additional replies correspond to these saved messages:

| Excerpt | Message |
| --- | --- |
| Setup completed | `msg_1880db5460013SAoLsKrorTJwJ` |
| Website exploration | `msg_18812f6f30014poeTdQpTFNB61` |
| Plan | `msg_188141ef6001JOOBGami9SZ4Cd` |
| Implementation and tests | `msg_18820c55b001sOItsjrkXQBMSs` |
| Full `npm test` output in the expandable section | `msg_188201ba3001mVN2lsMieP6v0F`, shell tool `18895c99-774d-4629-bdd4-9f94dd05aea9` |

The historical Plan proposed some browser checks that were not carried out in
the later acceptance pass. Its text is preserved as proposed work, not proof of
completion; the browser report retains the omissions. The setup report follows
the earlier environment-only prompt, not the current combined explanation prompt.
Raw recordings and local account state are not distributed with the course.

An earlier revision used three verbatim phrase excerpts from Plan message
`msg_188141ef6001JOOBGami9SZ4Cd` instead of `opencode-plan-result.png`.
They show the proposed button, filters, and treatment of older articles without
the file-level implementation details. The original image remains unchanged.

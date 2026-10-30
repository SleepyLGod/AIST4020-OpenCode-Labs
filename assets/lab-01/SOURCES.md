# Screenshot Sources

Screenshots illustrate OpenCode 2.2.0. Historical replies are examples, not
results produced by the current student prompts. No model text, approval state,
or test result was rewritten inside an image.

| Asset | Source |
| --- | --- |
| `opencode-version.png` | Local version command, without a model request. |
| `opencode-unconfigured.png`, `opencode-connect-clean.png`, `opencode-key-clean.png` | Isolated native UI with no credentials; no key or message submitted. |
| `nvidia-api-key.png` | Public NVIDIA Build model page, captured without signing in or generating a key. |
| `opencode-hello.png` | Earlier NVIDIA conversation, terminal replay endpoint 385758. |
| `opencode-environment.png` | Earlier environment check, endpoint 3021009. |
| `opencode-install-approval.png` | Earlier `npm ci` approval, endpoint 3602115. |
| `opencode-browser-action.png` | Earlier Skill load and browser-open approval, endpoint 7426787; screen rows 11-34. |
| `opencode-edit-approval.png` | Earlier approval to add `read: false` in `articles.js`, endpoint 15320119; rows 20-34. |
| `opencode-resumed-conversation.png` | Earlier resumed question and reply before browser acceptance, endpoint 21201312; rows 1-27. |
| `opencode-browser-results.png` | Earlier browser acceptance report, endpoint 29558867; rows 7-23. Preserves the reported tool error and unperformed checks. |
| `opencode-plan-selected.png` | Isolated native UI after selecting Plan, without sending a model request; endpoint 52543; rows 15-21. |
| `before.png` | Independent browser check of the starter after adding Web Notes and Testing Notes. Not an agent run. |
| `after-example.png` | Earlier NVIDIA trial's browser screenshot, with Alpha unread and Beta read. |

Terminal endpoints are zero-based, exclusive byte offsets in the original
recordings, replayed without changing their contents. Row numbers are zero-based.
The NVIDIA recording used 120 columns and 36 rows; the isolated Plan UI used
112 columns and 32 rows.

- NVIDIA terminal recording SHA-256:
  `e44a9b67441826e89383ee5f109db4969c477e905e19035bedc2a0dcbfe26386`.
- Isolated Plan UI recording SHA-256:
  `1316625809629ba6531e549cd6c6cf83a7e8e1e8ba7406aa68acfde1d738cb32`.
- Finished website screenshot SHA-256:
  `60716eb04c972820f1eeec3d298195cd0662bcf47d885053ff532241221b0e2b`.

The browser report corresponds to saved message `msg_1882c5183001S8b6Z0RqzX7m5V`.
Raw recordings and local account state are not distributed with the course.

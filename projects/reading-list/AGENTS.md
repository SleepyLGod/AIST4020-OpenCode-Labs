# Working instructions

- Check the existing environment before suggesting installations.
- Explain installation commands and ask before running them.
- Keep project dependencies local.
- Use `npm ci` for the locked dependencies, `npm run browser:install` for the test browser, and `npm run browser -- <command>` for browser actions. These scripts keep their downloads in this project.
- For browser checks, use a separate visible window with its own data, not the user's personal browser profile.
- After changes, run relevant tests and report what passed or failed.

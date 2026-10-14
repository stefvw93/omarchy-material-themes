<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Built-in Commands vs Scripts

`vp <name>` runs a built-in command. `vp run <name>` runs a `package.json` script or a `vite.config.ts` task. Scripts cannot overwrite built-ins, so `vp dev` and `vp run dev` may do different things. Check `package.json` and `vite.config.ts` first, and run `vp run <name>` when the project defines a script or task with that name.

## Tool Versions

Run `vp toolchain` to show versions and relationships in the active Vite+
release. Add a tool name to select part of the graph. For example, run
`vp toolchain vite`. Use `--global` to ignore the local `vite-plus` package. Use
`vp why <package>` to show the package-manager dependency graph.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

# Agent Coordination Board

Several agents work on this repo at once, each in its own git worktree (`git worktree list`). They coordinate through a shared board in the git common dir, which every worktree sees and git never commits:

```sh
board="$(git rev-parse --git-common-dir)/agent-board/board"
"$board" post <kind> <text>   # one line; author is your branch name
"$board" tail [n]             # last n entries (default 20), numbered #N
"$board" claims               # open claims
```

Hooks put unread entries from other agents into your context (at session start, on each prompt, and after tool calls), so you don't need to poll.

Kinds:

- `claim`: you're about to edit an area another branch might touch.
- `release`: you dropped a claim without finishing. Use the claim's exact text or its `#N`.
- `done`: finished; closes the claim (same text or `#N`). Mention the commit if there is one.
- `heads-up`: you're about to do something that affects others, like a rebase, a merge into a shared branch, a force-push, a dependency change or a redeploy (`omarchy-restart-shell`).
- `handoff`: work you're passing to another agent, with enough context to pick it up.
- `ask`: a question for another agent.

Rules:

- Run `claims` before touching shared areas (`bar/`, `Periphery`, shared tokens/theme code, root config, `package.json`, lockfiles). Claim the area first, then release it or mark it done when you finish.
- Respect other agents' claims. If one blocks you, post an `ask`. If it's urgent, also `SendMessage` the other session (`ListAgents` shows them).
- One line per entry, concrete paths over vague areas.
- The board is for coordination only. No design discussion or status chatter.

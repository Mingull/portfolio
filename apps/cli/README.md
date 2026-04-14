# 🧙 The Wand CLI

A personal TypeScript-based magical CLI/TUI tool to streamline development workflows, focusing on Git management, pull request assistance, and service monitoring.

---

## 🚀 Overview

Wand CLI is designed to improve day-to-day developer productivity by combining common workflows into a single tool. It provides both command-line utilities and an interactive TUI (Terminal UI) for more complex tasks.

The CLI uses a magical theme, where you “wave your wand” to cast spells (subcommands) like lumos, accio, and reparo.

---

## ✨ Features

### 🌿 Interactive Branch Cleanup

Easily manage and clean up local Git branches.

- Select branches interactively for deletion
- Filter branches by:
    - Merged
    - Gone (remote deleted)
    - Stale (inactive for a while – optional future feature)

- Prevent deletion of protected branches (e.g. `main`, `develop`)
- Preview before deletion

Example magical command:

```bash
wand accio branches
```

---

### 🔀 PR Helper (Work in Progress)

Assist with creating and managing pull requests.

**Initial ideas:**

- Create a new branch from current changes
- Move accidental commits from `main` into a new branch
- Push branch and prepare PR
- Generate PR title/description from commits
- Open PR page in browser

**Future ideas:**

- Validate branch naming conventions
- Run pre-PR checks (lint/tests)
- Show diff summary before creating PR

Example magical command:

```bash
wand reparo pr
```

---

### 📊 Service Monitor (TUI)

Interactive terminal dashboard for running services.

**Docker:**

- List running containers
- View logs in real-time
- Restart/stop containers

**Remote (SSH):**

- Connect to remote servers
- Stream logs from services
- Basic command execution

**UI ideas:**

- Split panels (services / logs)
- Keyboard navigation
- Live updates

Example magical command:

```bash
wand lumos logs
```

---

## 🪄 CLI Commands & Aliases

- **Main command**: `wand`
- **Playful alias**: `wave-wand`
- **Shortcut**: `ww`

Example usage:

```bash
wand lumos logs # Open TUI logs
wand accio branches # Fetch / clean branches
ww reparo pr # Fix accidental PR commits
wave-wand lumos # Same as above, more playful
```

---

## 🪄 Spell Map (Subcommands)

```plaintext
                    ┌──────────────┐
                    │     wand     │
                    │  (main CLI)  │
                    └──────┬───────┘
                           │
            ┌──────────────┼────────────────┐
            │              │                │
    ┌───────▼───┐  ┌───────▼─────────┐  ┌───▼───────┐
    │   lumos   │  │      accio      │  │  reparo   │
    │(logs/TUI) │  │(fetch branches) │  │(PR helper)│
    └─────┬─────┘  └───────┬─────────┘  └───┬───────┘
          │                │                │
  ┌───────▼───────┐  ┌─────▼─────┐   ┌──────▼─────┐
  │  Docker Logs  │  │Branch List│   │Move commits│
  │  Remote Logs  │  │  Filter   │   │Push branch │
  │TUI Dashboards │  │  Delete   │   │Open PR     │
  └───────────────┘  └───────────┘   └────────────┘
```

| Spell      | Description                                                                       | Example Usage                 |
| ---------- | --------------------------------------------------------------------------------- | ----------------------------- |
| lumos      | Illuminate logs or TUI dashboards (e.g., Docker logs, remote services)            | wand lumos logs               |
| accio      | Summon or fetch items (e.g., list branches, filter branches)                      | wand accio branches           |
| reparo     | Fix mistakes or PR issues (e.g., move accidental commits, prep PRs)               | wand reparo pr                |
| nox        | Extinguish / stop services or exit TUI                                            | wand nox                      |
| wingardium | Lightweight action spell (placeholder for small utilities, e.g., cleanup scripts) | wand wingardium cache-clean   |
| obliviate  | Forget / remove things permanently (e.g., delete branches, logs)                  | wand obliviate branches stale |

---

## 🛠 Tech Stack

- **Language:** TypeScript
- **CLI Framework:** commander
- **TUI Framework:** ink (React for CLI)
- **Prompts:** `@clack/prompts` (via `@mingull/cli-core`)
- **Runtime:** tsx

---

## 📦 Project Structure (initial idea)

This is a package inside a monorepo, so it should be self-contained and focused on CLI/TUI functionality.
The structure is modular to allow for easy addition of new commands and features.

```
/src
  /commands
    branch.ts
    pr.ts
    services.ts
  /tui
    ServiceDashboard.tsx
    LogViewer.tsx
  /utils
    git.ts
    docker.ts
    ssh.ts
  index.ts
```

---

## 🎯 Goals

- Build something actually useful in daily development
- Keep it modular and extensible
- Learn deeper CLI + TUI patterns
- Avoid overengineering early

---

## 🧠 Notes

- Start simple → expand later
- Focus on one feature at a time (branch cleanup first)
- TUI should only be used where it adds real value (e.g. logs, dashboards)
- Magical theme: subcommands are “spells” (lumos, accio, reparo)
- All spells can also be used via aliases:

```bash
ww lumos logs
wave-wand accio branches
```

- New spells can be added as the tool grows (e.g., CI/CD helpers, env management).
- This creates a consistent magical UX: main command = wand, spell = action.

---

## 📌 TODO (MVP Order)

1. Branch cleanup (interactive + filters)
2. Basic PR helper (move commits → branch)
3. Docker service list + logs (TUI)
4. SSH log streaming
5. Improve UX + polish

---

## 🔥 Future Ideas

- Git history visualizer (TUI)
- Monorepo-aware tooling
- CI/CD helpers
- Environment (.env) manager

---

## 🧑‍💻 Author

Personal dev tool — built for learning and productivity.

# Git State Simulator

A visual simulator of Git's core workflow — working area, staging area, and commits.

---

## Features

- Create named files in the **Working Area**
- Stage files (move to **Staging Area**) — mimics `git add`
- Unstage files back to Working Area — mimics `git restore --staged`
- Delete files from Working Area
- Commit all staged files with a message — mimics `git commit -m`
- Squash (undo) a commit — moves its files back to the Staging Area

---

## File Structure

```
git-simulator/
├── index.html    — three-column layout: Working Area, Staging Area, Commits
├── index.css     — column and card styling
└── script.js     — all file and commit management logic
```

---

## How It Works

### Data
- `workingFiles` — array of file name strings in the Working Area
- `stagedFiles` — array of file name strings in the Staging Area
- `commits` — array of commit objects

Each commit object looks like:
```js
{ id: Date.now(), message: "commit message", files: ["index.html", "style.css"] }
```

### Core Logic

| Event / Function | What it does |
|---|---|
| `createBtn` click | Reads file name from input, pushes to `workingFiles`, re-renders |
| `deleteFile(index)` | Removes file from `workingFiles` using `splice()` |
| `stageFile(index)` | Moves file from `workingFiles` to `stagedFiles` using `splice()` + `push()` |
| `unstageFile(index)` | Moves file from `stagedFiles` back to `workingFiles` |
| `commitBtn` click | Bundles all `stagedFiles` into a new commit object, pushes to `commits`, clears `stagedFiles` |
| `squashCommit(id)` | Finds commit by `id`, pushes its files back to `stagedFiles`, removes commit via `splice()` |

### Render Functions
- `renderWorkingFiles()` — renders each file with a delete (✖) and stage (➕) button
- `renderStagedFiles()` — renders each file with an unstage (➖) button
- `renderCommits()` — renders each commit with its message, file chips, and a squash (✖) button

---

## Git Concept Mapping

| Simulator Action | Git Equivalent |
|---|---|
| Create file | Creating/modifying a file locally |
| Stage file (➕) | `git add <file>` |
| Unstage file (➖) | `git restore --staged <file>` |
| Commit | `git commit -m "message"` |
| Squash commit | Undoing the last commit (like `git reset --soft HEAD~1`) |

---

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript

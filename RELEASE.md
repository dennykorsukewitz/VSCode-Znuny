# [2.0.0]

## Breaking

- Renamed command `znuny.generateFilelist` to `znuny.insertFilelist` and settings key `znuny.generateFilelist.mode` to `znuny.insertFilelist.mode`. Update keybindings, `tasks.json`, and `settings.json` if you still reference the old IDs.
- Removed built-in **Quote with Marker** and **Add / Remove Folder from Workspace** commands. Use the standalone extensions `dennykorsukewitz.QuoteWithMarker` and `dennykorsukewitz.AddFolderToWorkspace` instead (see README.md).

## Added

- Extension rewritten in **TypeScript** and built with **esbuild** (`dist/extension.js`).
- Command and UI logic split into `src/features/` (customizer, insert filelist, insert `@ObjectDependencies`, status bar) with shared types under `src/types/`.
- Optional **companion-extension** install prompts when Quote With Marker or Add Folder To Workspace is missing (install, later, or never ask).

## Changed

- Snippet generator JSON inputs moved from `src/` to **`src/snippets-data/`**; `bin/znuny.GenerateVSCSnippets.pl` default paths updated.
- **`doc/images/`** asset filenames normalized to **PascalCase** (icon, demo GIFs, including filelist / object-dependencies demos aligned with current command names).
- Readme introduction, marketplace **`description`**, and related repository metadata text expanded.
- GitHub Actions: updated **actions/checkout**, **actions/setup-node**, **schneegans/dynamic-badges-action**, and tidied the release workflow.

## Dependencies

- Bump glob from 11.1.0 to 13.0.6 (#32)
- Bump ESLint from 9.39.4 to 10.1.0 (#34)
- Bump TypeScript from 5.9.3 to 6.0.2 (#35)
- Bump @types/node from 22.18.13 through 24.9.2 to 25.5.0 (#25, #36)
- Bump schneegans/dynamic-badges-action from 1.7.0 to 1.8.0 (#33)
- Bump actions/checkout from 4 to 5 to 6 (#27)
- Bump actions/setup-node from 4 to 6 (#24)

# Project layout

```text
.
├── crates/app-core/      Your app's logic. Plain Rust, no Tauri.
│   └── src/
│       ├── lib.rs        Error type, public API
│       ├── greeting.rs   The example command
│       └── settings.rs   A JSON settings file (the storage example)
├── src-tauri/            The desktop shell
│   ├── src/lib.rs        Opens the window, registers commands
│   ├── src/commands.rs   Commands the UI can call
│   ├── src/window_fit.rs Keeps the window inside the screen
│   ├── capabilities/     What the UI is allowed to do
│   ├── icons/            App icons for every platform
│   ├── tauri.conf.json   Name, window, bundle settings
│   └── tauri.macos.conf.json  macOS keeps its native traffic lights
├── ui/                   The window's contents (React + Vite)
│   ├── src/App.tsx       Layout: title bar, sidebar, page
│   ├── src/api.ts        Typed wrappers around Rust commands
│   ├── src/components/   TitleBar, Sidebar, WikiPage, demos
│   ├── src/wiki/         These pages, as Markdown
│   └── src/styles.css    Colours and layout
├── scripts/rename.mjs    Rename the app in one go
└── .github/workflows/    CI and the release build
```

## Why two Rust crates?

`app-core` holds the logic and knows nothing about windows. `src-tauri` is a thin layer that turns core functions into commands. The split pays off quickly:

- Core code is tested with a plain `cargo test`, no window needed.
- You can add a command-line tool or a server later that reuses the same core.
- Tauri upgrades only touch the thin layer.

A good rule: if a function does not need `AppHandle`, `State` or a window, it belongs in `app-core`.

## Adding a crate

```sh
cargo new --lib crates/app-sync
```

Add it to `members` in the root `Cargo.toml`, then depend on it from `src-tauri/Cargo.toml`:

```toml
app-sync = { path = "../crates/app-sync" }
```

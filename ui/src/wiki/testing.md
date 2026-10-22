# Tests and CI

## Running tests

```sh
cargo test --workspace         # Rust: app-core and src-tauri
npm --prefix ui test           # UI: Vitest + Testing Library
npm --prefix ui run typecheck  # TypeScript
npm --prefix ui run lint       # oxlint
```

Rust tests live next to the code in `#[cfg(test)] mod tests`. UI tests live in `ui/tests/`.

Put most of your tests in `app-core`. They are fast, need no window, and cover the logic that matters. Test the UI for behaviour users see: what renders, what a click does.

## Running the UI in a browser

`npm --prefix ui run dev` serves the UI at `http://localhost:5173` without Rust. `ui/src/api.ts` notices that Tauri is missing and answers with sample data, which is handy for styling and for UI tests. Keep that fallback in sync when you add commands, or remove it if you don't need it.

## CI

`.github/workflows/ci.yml` runs on every pull request and push to `main`:

1. **UI**: install, typecheck, lint, test, build.
2. **Rust**: `cargo fmt --check`, `cargo clippy -D warnings`, `cargo test`.
3. **Windows and macOS**: the Rust tests again, since paths and file systems differ.
4. **Bundle**: builds a `.deb` to prove packaging still works.

Run the same checks locally before pushing:

```sh
cargo fmt --all && cargo clippy --workspace --all-targets -- -D warnings
```

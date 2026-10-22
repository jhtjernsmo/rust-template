# Make it your app

When you no longer need this wiki, replace it with your first real screen. Nothing else depends on it.

## Remove the wiki

1. Delete `ui/src/wiki/` and `ui/src/components/WikiPage.tsx`, `Demos.tsx` and `Sidebar.tsx` (or keep the sidebar for your own navigation).
2. In `ui/src/App.tsx`, render your own component where `<WikiPage />` is.
3. Remove `react-markdown` and `remark-gfm` from `ui/package.json` if you don't render Markdown.
4. Delete the `greet` command (core, `commands.rs`, `lib.rs`, `api.ts`) once you have your own.

Keep `TitleBar.tsx`: it is the window frame.

## A checklist before your first release

- [ ] Renamed with `scripts/rename.mjs`, with your own identifier
- [ ] Your own icon (`tauri icon`)
- [ ] `README.md` describes your app, not the template
- [ ] License: keep MIT/Apache-2.0 or pick your own, and put your name in `LICENSE-MIT`
- [ ] `bundle.category` and `shortDescription` in `tauri.conf.json`
- [ ] Tests pass in CI
- [ ] A test release (`v0.1.0`) installs on each platform you support

## Learn more

- [Tauri docs](https://v2.tauri.app): everything about the desktop side
- [The Rust Book](https://doc.rust-lang.org/book/): if Rust is new to you
- [React docs](https://react.dev/learn): the UI side

Happy building.

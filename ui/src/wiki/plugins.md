# Plugins and permissions

Tauri's UI cannot touch the system unless you allow it. That keeps a bug or an injected script in the web view from reading files or running programs.

## Capabilities

`src-tauri/capabilities/default.json` lists what the main window may do. When a call fails with *"... not allowed"*, the fix is almost always a missing line here.

## Adding a plugin

Official plugins cover the common needs: file dialogs, notifications, the clipboard, global shortcuts, a shell, auto-updates and more. See the [plugin list](https://v2.tauri.app/plugin/).

Most can be added with one command from the repository root:

```sh
npx --prefix ui tauri add dialog
```

That adds the Rust crate, the npm package, the `.plugin(...)` line in `lib.rs` and a default permission. Then use it:

```ts
import { open } from '@tauri-apps/plugin-dialog'
const file = await open({ filters: [{ name: 'Text', extensions: ['txt', 'md'] }] })
```

## Opening links

External links in this wiki open in the default browser through the **opener** plugin (see `ui/src/links.ts`). Links in your own screens work the same way:

```ts
import { openUrl } from '@tauri-apps/plugin-opener'
await openUrl('https://example.com')
```

## Content Security Policy

`tauri.conf.json` sets a strict CSP: scripts, styles and images load only from the app itself. If you fetch from an API in the UI, add its origin to `connect-src`. Often it is simpler and safer to make the request from Rust (with `reqwest`) and expose it as a command.

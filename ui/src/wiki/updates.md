# Auto-updates

The template does not ship with auto-updates, because they need a signing key that only you should hold. Adding them takes about ten minutes.

## 1. Make a key pair

```sh
npx --prefix ui tauri signer generate -w ~/.tauri/myapp.key
```

Keep the private key safe and **never commit it**. If you lose it, installed apps can no longer update.

## 2. Add the plugin

```sh
npx --prefix ui tauri add updater
npx --prefix ui tauri add process
```

In `tauri.conf.json`, add the public key (the contents of `myapp.key.pub`) and where to look for updates:

```json
"plugins": {
  "updater": {
    "pubkey": "PASTE THE PUBLIC KEY",
    "endpoints": ["https://github.com/OWNER/REPO/releases/latest/download/latest.json"]
  }
},
"bundle": { "createUpdaterArtifacts": true }
```

## 3. Sign releases in CI

Add the repository secrets `TAURI_SIGNING_PRIVATE_KEY` (the file's contents) and `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`. In `release.yml`, set `includeUpdaterJson: true` on the `tauri-action` step. The workflow already passes the secrets through.

## 4. Check for updates in the UI

```ts
import { check } from '@tauri-apps/plugin-updater'
import { relaunch } from '@tauri-apps/plugin-process'

const update = await check()
if (update) {
  await update.downloadAndInstall()
  await relaunch()
}
```

Show a banner and let the user choose when to restart, rather than restarting by surprise.

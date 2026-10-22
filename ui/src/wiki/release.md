# Installers and releases

## Building on your own machine

```sh
npx --prefix ui tauri build
```

The installers land in `target/release/bundle/`. You can only build for the OS you are on: `.deb`, `.rpm` and `.AppImage` on Linux, `.msi` and `.exe` on Windows, `.dmg` and `.app` on macOS.

## Releasing for every platform

`.github/workflows/release.yml` builds all of them on GitHub when you push a version tag:

```sh
git tag v0.1.0
git push origin v0.1.0
```

About fifteen minutes later a **draft release** appears on GitHub with:

| Platform | Files |
| --- | --- |
| Linux | `.deb`, `.rpm`, `.AppImage` |
| Windows | `.msi`, `-setup.exe` |
| macOS | `.dmg` for Apple Silicon and Intel |

Check it, write release notes and press **Publish**.

## Code signing

Unsigned apps work, but the OS warns people the first time:

- **macOS** blocks unsigned apps by default. Users must right-click → Open, or run `xattr -cr /Applications/YourApp.app`. To remove the warning you need an [Apple Developer account](https://developer.apple.com/programs/) (paid). Add these repository secrets and the workflow signs and notarizes automatically: `APPLE_CERTIFICATE`, `APPLE_CERTIFICATE_PASSWORD`, `APPLE_SIGNING_IDENTITY`, `APPLE_ID`, `APPLE_PASSWORD`, `APPLE_TEAM_ID`. See [Tauri's macOS signing guide](https://v2.tauri.app/distribute/sign/macos/).
- **Windows** shows a SmartScreen warning ("Windows protected your PC" → More info → Run anyway) until the app builds reputation or is signed. Options are in [Tauri's Windows signing guide](https://v2.tauri.app/distribute/sign/windows/). Publishing to the Microsoft Store avoids the warning too.
- **Linux** needs no signing.

## Other channels

Once you have releases, you can add Homebrew (macOS), winget (Windows), Flathub or the AUR (Linux). Each one points at the files in your GitHub release.

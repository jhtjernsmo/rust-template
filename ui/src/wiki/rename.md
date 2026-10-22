# Name, identifier and icon

## Rename the app

One command changes the name everywhere it appears (window title, installers, package names, README, release workflow):

```sh
node scripts/rename.mjs "Paper Lantern" com.yourname.paperlantern
```

- **Name**: what users see. Spaces are fine.
- **Identifier**: reverse-domain, unique to your app. It decides the data folder and the macOS bundle ID. Pick it once; changing it later moves users' data to a new folder.

The script prints every file it changed. Review with `git diff`, then commit.

## Change the icon

Make a square PNG or SVG, at least 1024 × 1024, with some empty margin. Then:

```sh
npx --prefix ui tauri icon path/to/icon.png
```

That writes every size and format (`.ico`, `.icns`, PNGs, Windows Store tiles) into `src-tauri/icons/`. The template's own icon is `src-tauri/icons/icon.svg` if you want to start from it.

The small icon in the wiki's sidebar is `ui/public/favicon.svg`.

## Version number

The version lives in three places that must match: `Cargo.toml` (`[workspace.package]`), `src-tauri/tauri.conf.json` and `ui/package.json`. The release workflow reads the tag (`v0.2.0`), so bump all three before tagging.

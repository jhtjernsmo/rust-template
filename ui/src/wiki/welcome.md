# Welcome

This window is your app. Right now it shows a small wiki on how to keep building it; when you are ready, replace it with your own screens (the last page shows how).

Everything you see is ordinary code in this repository:

- **Rust** does the work: files, data, network, anything heavy. It lives in `crates/app-core` and `src-tauri`.
- **React + TypeScript** draws the window. It lives in `ui/`.
- **Tauri** glues them together and builds installers for Linux, Windows and macOS.

## Run it

You need [Rust](https://rustup.rs), [Node.js 22+](https://nodejs.org) and, on Linux, the WebKitGTK packages:

```sh
# Debian / Ubuntu
sudo apt install libwebkit2gtk-4.1-dev libssl-dev librsvg2-dev patchelf
# Arch
sudo pacman -S webkit2gtk-4.1 openssl librsvg patchelf
# Fedora
sudo dnf install webkit2gtk4.1-devel openssl-devel librsvg2-devel
```

Then, from the repository root:

```sh
npm --prefix ui install
npx --prefix ui tauri dev
```

`tauri dev` starts the UI with hot reload and rebuilds the Rust side when you save a `.rs` file. Edit `ui/src/wiki/welcome.md`, save, and this page changes.

## Where to go next

1. **Project layout**: what each folder is for.
2. **Commands**: call Rust from the UI. There is a live example to try.
3. **Name and icon**: make it yours with one command.
4. **Installers and releases**: push a tag, get installers for every platform.

Use the sidebar, or `Ctrl` + `↓` / `↑` to move between pages.

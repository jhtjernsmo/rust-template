# The interface and the window frame

## Colours

All colours are CSS variables at the top of `ui/src/styles.css`:

| Variable | Used for |
| --- | --- |
| `--bg` | Window background |
| `--bg-2` | Sidebar and title bar side |
| `--panel`, `--panel-2` | Cards, inputs, hover |
| `--line`, `--line-2` | Borders |
| `--text`, `--muted`, `--dim` | Text, from strongest to faintest |
| `--accent` | Buttons, links, focus rings (`#7aa6b8`) |
| `--danger`, `--ok`, `--warn` | Status colours |

Change `--accent` and the whole app follows. Use `color-mix()` for tints instead of new hard-coded colours:

```css
.badge { background: color-mix(in oklab, var(--accent) 15%, transparent); }
```

## The window frame

The window has no system title bar (`"decorations": false` in `tauri.conf.json`). The app draws its own in `ui/src/components/TitleBar.tsx`, so the sidebar and page run all the way to the top edge:

- **Dragging**: any element with `data-tauri-drag-region` moves the window. Double-click maximizes.
- **Buttons**: minimize, maximize/restore and close are drawn on Windows and Linux. The close button turns red on hover, like native Windows.
- **macOS** keeps its native traffic lights. `tauri.macos.conf.json` turns decorations back on with `"titleBarStyle": "Overlay"`, so the lights float over the same bar.

The buttons need these permissions in `capabilities/default.json`, already added:

```json
"core:window:allow-minimize",
"core:window:allow-toggle-maximize",
"core:window:allow-close",
"core:window:allow-start-dragging"
```

Prefer the system frame? Set `"decorations": true`, delete `tauri.macos.conf.json` and remove `<TitleBar />` from `App.tsx`.

## Adding a screen

There is no router by default; `App.tsx` keeps the current page in state. For a handful of screens that is enough:

```tsx
const [screen, setScreen] = useState<'home' | 'settings'>('home')
```

Reach for a router (React Router, TanStack Router) once you need deep links or history.

## Icons

[Lucide](https://lucide.dev/icons) is included: `import { Folder } from 'lucide-react'`, then `<Folder size={16} />`.

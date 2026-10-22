// The app's own title bar: continues the sidebar and the page up to the top
// edge, drags the window, and draws minimize / maximize / close on Windows and
// Linux. macOS keeps its native traffic lights (overlaid, see
// src-tauri/tauri.macos.conf.json).
import { useEffect, useState } from 'react'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { Copy, Minus, Square, X } from 'lucide-react'
import { IN_TAURI } from '../api'

export const IS_MAC = typeof navigator !== 'undefined' && /Mac/i.test(navigator.userAgent)

function useMaximized(): boolean {
  const [maximized, setMaximized] = useState(false)
  useEffect(() => {
    if (!IN_TAURI) return
    const win = getCurrentWindow()
    const sync = () => win.isMaximized().then(setMaximized).catch(() => undefined)
    sync()
    let unlisten: (() => void) | undefined
    win
      .onResized(sync)
      .then((fn) => (unlisten = fn))
      .catch(() => undefined)
    return () => unlisten?.()
  }, [])
  return maximized
}

function WindowControls() {
  const maximized = useMaximized()
  const run = (action: (win: ReturnType<typeof getCurrentWindow>) => Promise<void>) => () => {
    if (IN_TAURI) void action(getCurrentWindow()).catch(() => undefined)
  }
  return (
    <div className="window-controls">
      <button onClick={run((w) => w.minimize())} aria-label="Minimize" title="Minimize">
        <Minus size={15} strokeWidth={1.4} />
      </button>
      <button onClick={run((w) => w.toggleMaximize())} aria-label="Maximize" title={maximized ? 'Restore' : 'Maximize'}>
        {maximized ? <Copy size={12} strokeWidth={1.4} style={{ transform: 'scaleX(-1)' }} /> : <Square size={12} strokeWidth={1.4} />}
      </button>
      <button className="close" onClick={run((w) => w.close())} aria-label="Close" title="Close">
        <X size={16} strokeWidth={1.4} />
      </button>
    </div>
  )
}

/** `title` is shown faintly in the middle, like a document name. */
export function TitleBar({ title }: { title?: string }) {
  return (
    <div className={`titlebar ${IS_MAC ? 'mac' : ''}`} data-tauri-drag-region>
      <div className="titlebar-side" data-tauri-drag-region />
      <div className="titlebar-main" data-tauri-drag-region>
        <span className="titlebar-title" data-tauri-drag-region>
          {title}
        </span>
        {!IS_MAC && <WindowControls />}
      </div>
    </div>
  )
}

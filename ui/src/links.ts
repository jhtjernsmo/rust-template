// Links to the web open in the user's browser instead of inside the app window.
import { openUrl } from '@tauri-apps/plugin-opener'
import { IN_TAURI } from './api'

export function isExternal(href: string | undefined): href is string {
  return !!href && /^(https?:|mailto:)/i.test(href)
}

export function openExternal(href: string): void {
  if (IN_TAURI) void openUrl(href).catch(() => undefined)
  else window.open(href, '_blank', 'noopener')
}

// Typed wrappers around the Rust commands in src-tauri/src/commands.rs.
// Every call goes through `call`, which turns Rust's error strings into Errors.
//
// Outside Tauri (plain `npm run dev` in a browser, or tests) there is no Rust
// side, so `call` answers from SAMPLE instead. Keep it in sync when you add a
// command, or delete it if you always run inside Tauri.
import { invoke } from '@tauri-apps/api/core'

export interface AppInfo {
  name: string
  version: string
  dataDir: string
}

export interface Settings {
  name: string
  lastPage: string
}

export const IN_TAURI = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window

let sampleSettings: Settings = { name: '', lastPage: 'welcome' }

const SAMPLE: Record<string, (args: Record<string, unknown>) => unknown> = {
  app_info: () => ({ name: 'Rust Template', version: '0.1.0', dataDir: '~/.local/share/com.example.rusttemplate' }),
  greet: ({ name }) => {
    const trimmed = String(name ?? '').trim()
    if (!trimmed) throw 'Type a name first.'
    return `Hello, ${trimmed}! This text came from Rust (well, the browser sample).`
  },
  get_settings: () => sampleSettings,
  save_settings: ({ settings }) => {
    sampleSettings = settings as Settings
  },
}

async function call<T>(command: string, args: Record<string, unknown> = {}): Promise<T> {
  try {
    if (IN_TAURI) return await invoke<T>(command, args)
    const sample = SAMPLE[command]
    if (!sample) throw `No browser sample for "${command}". Run the app with \`tauri dev\`.`
    return sample(args) as T
  } catch (e) {
    throw new Error(typeof e === 'string' ? e : e instanceof Error ? e.message : String(e))
  }
}

export const appInfo = () => call<AppInfo>('app_info')
export const greet = (name: string) => call<string>('greet', { name })
export const getSettings = () => call<Settings>('get_settings')
export const saveSettings = (settings: Settings) => call<void>('save_settings', { settings })

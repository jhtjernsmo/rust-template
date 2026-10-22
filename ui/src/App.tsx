// The window's layout: the title bar on top, the sidebar on the left and the
// current wiki page on the right. Replace <WikiPage /> with your own screen
// when you start building (see the wiki page "Make it your app").
import { useEffect, useState } from 'react'
import * as api from './api'
import { Sidebar } from './components/Sidebar'
import { TitleBar } from './components/TitleBar'
import { WikiPage } from './components/WikiPage'
import { neighbour, pageById } from './wiki'

export default function App() {
  const [info, setInfo] = useState<api.AppInfo | null>(null)
  const [settings, setSettings] = useState<api.Settings | null>(null)
  const pageId = settings?.lastPage ?? 'welcome'
  const page = pageById(pageId)

  useEffect(() => {
    api.appInfo().then(setInfo).catch(() => undefined)
    api
      .getSettings()
      .then(setSettings)
      .catch(() => setSettings({ name: '', lastPage: 'welcome' }))
  }, [])

  const update = (patch: Partial<api.Settings>) => {
    setSettings((current) => {
      const next = { ...(current ?? { name: '', lastPage: 'welcome' }), ...patch }
      api.saveSettings(next).catch(() => undefined)
      return next
    })
  }
  const open = (id: string) => update({ lastPage: id })

  // Ctrl/Cmd + arrow keys move between pages.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey) || (e.key !== 'ArrowDown' && e.key !== 'ArrowUp')) return
      e.preventDefault()
      open(neighbour(pageId, e.key === 'ArrowDown' ? 1 : -1).id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div className="app">
      <TitleBar title={`${page.title} · ${info?.name ?? ''}`} />
      <Sidebar info={info} current={page.id} onOpen={open} />
      <main className="main">
        {settings && <WikiPage page={page} onOpen={open} name={settings.name} onName={(name) => update({ name })} />}
      </main>
    </div>
  )
}

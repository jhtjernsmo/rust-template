// The wiki's pages, in sidebar order. Each page is a Markdown file in this
// folder; edit them freely or delete the folder when you replace the wiki.
import welcome from './welcome.md?raw'
import structure from './structure.md?raw'
import commands from './commands.md?raw'
import interfacePage from './interface.md?raw'
import data from './data.md?raw'
import plugins from './plugins.md?raw'
import rename from './rename.md?raw'
import testing from './testing.md?raw'
import release from './release.md?raw'
import updates from './updates.md?raw'
import next from './next.md?raw'

export interface WikiPage {
  id: string
  title: string
  section: string
  body: string
}

export const PAGES: WikiPage[] = [
  { id: 'welcome', title: 'Welcome', section: 'Start', body: welcome },
  { id: 'structure', title: 'Project layout', section: 'Start', body: structure },
  { id: 'commands', title: 'Commands', section: 'Build', body: commands },
  { id: 'interface', title: 'Interface and window', section: 'Build', body: interfacePage },
  { id: 'data', title: 'Storing data', section: 'Build', body: data },
  { id: 'plugins', title: 'Plugins and permissions', section: 'Build', body: plugins },
  { id: 'rename', title: 'Name and icon', section: 'Ship', body: rename },
  { id: 'testing', title: 'Tests and CI', section: 'Ship', body: testing },
  { id: 'release', title: 'Installers and releases', section: 'Ship', body: release },
  { id: 'updates', title: 'Auto-updates', section: 'Ship', body: updates },
  { id: 'next', title: 'Make it your app', section: 'Ship', body: next },
]

export const pageById = (id: string): WikiPage => PAGES.find((p) => p.id === id) ?? PAGES[0]

/** The page `step` positions away from `id`, clamped to the ends. */
export function neighbour(id: string, step: number): WikiPage {
  const index = PAGES.findIndex((p) => p.id === id)
  return PAGES[Math.min(PAGES.length - 1, Math.max(0, (index < 0 ? 0 : index) + step))]
}

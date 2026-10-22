import { BookOpen, Code2, Database, FolderTree, Hammer, Package, Palette, PartyPopper, RefreshCw, Shield, Tag, type LucideIcon } from 'lucide-react'
import type { AppInfo } from '../api'
import { PAGES } from '../wiki'

const ICONS: Record<string, LucideIcon> = {
  welcome: BookOpen,
  structure: FolderTree,
  commands: Code2,
  interface: Palette,
  data: Database,
  plugins: Shield,
  rename: Tag,
  testing: Hammer,
  release: Package,
  updates: RefreshCw,
  next: PartyPopper,
}

const SECTIONS = [...new Set(PAGES.map((p) => p.section))]

export function Sidebar({ info, current, onOpen }: { info: AppInfo | null; current: string; onOpen: (id: string) => void }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <img src="/favicon.svg" alt="" width={28} height={28} />
        <div>
          <div className="brand-name">{info?.name ?? ' '}</div>
          <div className="brand-version">{info ? `v${info.version}` : ' '}</div>
        </div>
      </div>
      <nav aria-label="Wiki">
        {SECTIONS.map((section) => (
          <div key={section} className="nav-section">
            <div className="nav-heading">{section}</div>
            {PAGES.filter((p) => p.section === section).map((p) => {
              const Icon = ICONS[p.id] ?? BookOpen
              return (
                <button
                  key={p.id}
                  className={`nav-item ${p.id === current ? 'active' : ''}`}
                  aria-current={p.id === current ? 'page' : undefined}
                  onClick={() => onOpen(p.id)}
                >
                  <Icon size={15} strokeWidth={1.7} />
                  {p.title}
                </button>
              )
            })}
          </div>
        ))}
      </nav>
    </aside>
  )
}

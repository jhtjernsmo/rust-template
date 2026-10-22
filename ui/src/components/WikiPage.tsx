import { createContext, useContext, useEffect, useRef, type ComponentPropsWithoutRef } from 'react'
import Markdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { isExternal, openExternal } from '../links'
import { neighbour, type WikiPage as Page } from '../wiki'
import { Demo } from './Demos'

interface DemoProps {
  name: string
  onName: (name: string) => void
}

// Demos read the saved name through context, so MARKDOWN_COMPONENTS can stay
// a constant. A new components object on every render would remount the demos
// and wipe their state.
const DemoContext = createContext<DemoProps>({ name: '', onName: () => undefined })

function DemoBlock({ kind }: { kind: string }) {
  const { name, onName } = useContext(DemoContext)
  return <Demo kind={kind} name={name} onName={onName} />
}

const MARKDOWN_COMPONENTS: Components = {
  a: ({ href, title, children }: ComponentPropsWithoutRef<'a'>) => (
    <a
      href={href}
      title={title}
      onClick={(e) => {
        if (!isExternal(href)) return
        e.preventDefault()
        openExternal(href)
      }}
    >
      {children}
    </a>
  ),
  // ```demo blocks become live examples; everything else is a code block.
  pre: ({ children }) => <>{children}</>,
  code: ({ className, children }) => {
    const text = String(children ?? '')
    const lang = /language-(\S+)/.exec(className ?? '')?.[1]
    if (lang === 'demo') return <DemoBlock kind={text.trim()} />
    if (lang === undefined && !text.includes('\n')) return <code>{children}</code>
    return (
      <pre className="code" data-lang={lang}>
        <code>{text.replace(/\n$/, '')}</code>
      </pre>
    )
  },
}

interface Props extends DemoProps {
  page: Page
  onOpen: (id: string) => void
}

export function WikiPage({ page, onOpen, name, onName }: Props) {
  const scroller = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = 0
  }, [page.id])

  const prev = neighbour(page.id, -1)
  const next = neighbour(page.id, 1)

  return (
    <div className="page-scroll" ref={scroller}>
      <DemoContext.Provider value={{ name, onName }}>
        <article className="markdown">
          <Markdown remarkPlugins={[remarkGfm]} components={MARKDOWN_COMPONENTS}>
            {page.body}
          </Markdown>
        </article>
      </DemoContext.Provider>
      <footer className="page-nav">
        {prev.id !== page.id ? (
          <button className="page-link" onClick={() => onOpen(prev.id)}>
            <ArrowLeft size={15} />
            <span>
              <small>Previous</small>
              {prev.title}
            </span>
          </button>
        ) : (
          <span />
        )}
        {next.id !== page.id && (
          <button className="page-link next" onClick={() => onOpen(next.id)}>
            <span>
              <small>Next</small>
              {next.title}
            </span>
            <ArrowRight size={15} />
          </button>
        )}
      </footer>
    </div>
  )
}

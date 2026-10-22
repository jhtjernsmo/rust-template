// Live examples embedded in the wiki with a fenced block:
//
//   ```demo
//   greet
//   ```
import { useEffect, useState, type FormEvent } from 'react'
import { Play } from 'lucide-react'
import * as api from '../api'

function GreetDemo({ name, onName }: { name: string; onName: (name: string) => void }) {
  const [value, setValue] = useState(name)
  const [result, setResult] = useState<{ ok: boolean; text: string } | null>(null)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      setResult({ ok: true, text: await api.greet(value) })
      onName(value.trim())
    } catch (err) {
      setResult({ ok: false, text: (err as Error).message })
    }
  }

  return (
    <form className="demo" onSubmit={submit}>
      <div className="demo-label">Try it: calls <code>greet</code> in Rust</div>
      <div className="demo-row">
        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Your name" aria-label="Your name" maxLength={80} />
        <button className="btn primary" type="submit">
          <Play size={14} /> Run
        </button>
      </div>
      {result && (
        <output className={`demo-result ${result.ok ? 'ok' : 'error'}`} role="status">
          {result.text}
        </output>
      )}
    </form>
  )
}

function AppInfoDemo() {
  const [info, setInfo] = useState<api.AppInfo | null>(null)
  const [error, setError] = useState('')
  useEffect(() => {
    api.appInfo().then(setInfo).catch((e: Error) => setError(e.message))
  }, [])
  return (
    <div className="demo">
      <div className="demo-label">Live: from the <code>app_info</code> command</div>
      {error ? (
        <div className="demo-result error">{error}</div>
      ) : (
        <dl className="demo-info">
          <dt>Name</dt>
          <dd>{info?.name}</dd>
          <dt>Version</dt>
          <dd>{info?.version}</dd>
          <dt>Data folder</dt>
          <dd>
            <code>{info?.dataDir}</code>
          </dd>
        </dl>
      )}
    </div>
  )
}

export function Demo({ kind, name, onName }: { kind: string; name: string; onName: (name: string) => void }) {
  if (kind === 'greet') return <GreetDemo name={name} onName={onName} />
  if (kind === 'app-info') return <AppInfoDemo />
  return <div className="demo-result error">Unknown demo "{kind}"</div>
}

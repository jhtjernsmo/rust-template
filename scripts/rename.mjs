#!/usr/bin/env node
// Renames the app everywhere it appears.
//
//   node scripts/rename.mjs "Paper Lantern" com.yourname.paperlantern
//
// Reads the current name from src-tauri/tauri.conf.json, so it can be run
// again later to rename a second time.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const [name, identifier] = process.argv.slice(2)

function fail(message) {
  console.error(`${message}\n\nUsage: node scripts/rename.mjs "App Name" com.yourname.appname`)
  process.exit(1)
}

if (!name || !identifier) fail('Give both a name and an identifier.')
if (name.length > 60 || /["\\<>`$]/.test(name)) fail('Keep the name under 60 characters, without quotes, backslashes, < > ` or $.')
if (!/^[a-zA-Z][a-zA-Z0-9-]*(\.[a-zA-Z][a-zA-Z0-9-]*)+$/.test(identifier)) {
  fail('The identifier must look like com.yourname.appname (letters, digits and dashes, dot-separated).')
}

const slug = name.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
if (!slug) fail('The name needs at least one letter or digit.')

const conf = JSON.parse(readFileSync(join(root, 'src-tauri/tauri.conf.json'), 'utf8'))
const oldName = conf.productName
const oldId = conf.identifier
const oldSlug = /^name = "(.+)"$/m.exec(readFileSync(join(root, 'src-tauri/Cargo.toml'), 'utf8'))[1]

const jsonString = (s) => JSON.stringify(s)
const edits = {
  'src-tauri/tauri.conf.json': [
    [`"productName": ${jsonString(oldName)}`, `"productName": ${jsonString(name)}`],
    [`"title": ${jsonString(oldName)}`, `"title": ${jsonString(name)}`],
    [`"identifier": ${jsonString(oldId)}`, `"identifier": ${jsonString(identifier)}`],
  ],
  'src-tauri/tauri.macos.conf.json': [[`"title": ${jsonString(oldName)}`, `"title": ${jsonString(name)}`]],
  'src-tauri/Cargo.toml': [[`name = "${oldSlug}"`, `name = "${slug}"`]],
  'Cargo.lock': [[`name = "${oldSlug}"`, `name = "${slug}"`]],
  'ui/package.json': [[`"name": "${oldSlug}-ui"`, `"name": "${slug}-ui"`]],
  'ui/package-lock.json': [[`"name": "${oldSlug}-ui"`, `"name": "${slug}-ui"`]],
  'ui/index.html': [[`<title>${oldName}</title>`, `<title>${name}</title>`]],
  'ui/src/api.ts': [
    [`name: '${oldName}'`, `name: '${name.replaceAll("'", "\\'")}'`],
    [oldId, identifier],
  ],
  '.github/workflows/release.yml': [[`releaseName: ${oldName} `, `releaseName: ${name} `]],
  'README.md': [[`# ${oldName}\n`, `# ${name}\n`]],
}

const changed = []
for (const [file, pairs] of Object.entries(edits)) {
  const path = join(root, file)
  if (!existsSync(path)) continue
  const before = readFileSync(path, 'utf8')
  let after = before
  for (const [from, to] of pairs) after = after.replaceAll(from, to)
  if (after !== before) {
    writeFileSync(path, after)
    changed.push(file)
  }
}

console.log(`Renamed "${oldName}" (${oldId}) to "${name}" (${identifier}).`)
console.log(changed.length ? changed.map((f) => `  changed ${f}`).join('\n') : '  nothing to change')
console.log('\nNext: review with `git diff`, replace the icon (`npx --prefix ui tauri icon your-icon.png`) and update README.md.')

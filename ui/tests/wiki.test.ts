import { describe, expect, test } from 'vitest'
import { PAGES, neighbour, pageById } from '../src/wiki'

describe('wiki pages', () => {
  test('every page has a unique id and starts with a heading', () => {
    expect(new Set(PAGES.map((p) => p.id)).size).toBe(PAGES.length)
    for (const page of PAGES) expect(page.body.trimStart().startsWith('# ')).toBe(true)
  })

  test('an unknown id falls back to the first page', () => {
    expect(pageById('nope').id).toBe('welcome')
  })

  test('neighbour stops at both ends', () => {
    expect(neighbour('welcome', -1).id).toBe('welcome')
    expect(neighbour('welcome', 1).id).toBe(PAGES[1].id)
    expect(neighbour(PAGES.at(-1)!.id, 1).id).toBe(PAGES.at(-1)!.id)
  })
})

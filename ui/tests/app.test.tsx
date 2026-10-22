import { afterEach, expect, test } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import App from '../src/App'

afterEach(cleanup)

test('opens on the welcome page and moves through the wiki', async () => {
  render(<App />)
  expect(await screen.findByRole('heading', { level: 1, name: 'Welcome' })).toBeTruthy()

  fireEvent.click(screen.getByRole('button', { name: /Next\s*Project layout/ }))
  expect(await screen.findByRole('heading', { level: 1, name: 'Project layout' })).toBeTruthy()

  fireEvent.click(screen.getByRole('button', { name: 'Commands' }))
  expect(await screen.findByRole('heading', { level: 1, name: /Commands/ })).toBeTruthy()
})

test('the greet demo shows the answer, and the error for an empty name', async () => {
  render(<App />)
  fireEvent.click(await screen.findByRole('button', { name: 'Commands' }))

  fireEvent.click(await screen.findByRole('button', { name: 'Run' }))
  expect((await screen.findByRole('status')).textContent).toBe('Type a name first.')

  fireEvent.change(screen.getByLabelText('Your name'), { target: { value: 'Ada' } })
  fireEvent.click(screen.getByRole('button', { name: 'Run' }))
  expect((await screen.findByText(/Hello, Ada!/)).textContent).toContain('Hello, Ada!')
})

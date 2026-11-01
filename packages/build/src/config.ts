import { join } from 'node:path'
import { root } from './root.ts'

// Main measured 558,768 bytes on Linux and Windows, and 558,840 on macOS.
// Command shortcut labels measured 614,172 bytes on Linux and Windows.
// Keep modest headroom above the measured feature cost with the memory gate enabled.
export const threshold = 619_000

export const instantiations = 8_000

export const instantiationsPath = join(root, 'packages', 'quick-pick-worker')

export const workerPath = join(root, '.tmp/dist/dist/quickPickWorkerMain.js')

export const playwrightPath = new URL('../../../node_modules/playwright/index.mjs', import.meta.url).toString()

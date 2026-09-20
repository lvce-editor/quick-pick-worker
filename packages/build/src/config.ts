import { join } from 'node:path'
import { root } from './root.js'

// Intentionally increased to 560,000 bytes at the maintainer's request for PR #131.
// Modest increases are acceptable for expected worker growth and platform variation.
export const threshold = 560_000

export const instantiations = 8_000

export const instantiationsPath = join(root, 'packages', 'quick-pick-worker')

export const workerPath = join(root, '.tmp/dist/dist/quickPickWorkerMain.js')

export const playwrightPath = new URL('../../../node_modules/playwright/index.mjs', import.meta.url).toString()

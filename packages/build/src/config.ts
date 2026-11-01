import { join } from 'node:path'
import { root } from './root.ts'

// URI resolution measured 561,860 bytes versus a 560,968-byte baseline.
// Allow modest headroom above the 561,932-byte macOS measurement.
export const threshold = 563_000

export const instantiations = 8_000

export const instantiationsPath = join(root, 'packages', 'quick-pick-worker')

export const workerPath = join(root, '.tmp/dist/dist/quickPickWorkerMain.js')

export const playwrightPath = new URL('../../../node_modules/playwright/index.mjs', import.meta.url).toString()

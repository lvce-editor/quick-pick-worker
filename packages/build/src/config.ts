import { join } from 'node:path'
import { root } from './root.js'

export const threshold = 510_000

export const instantiations = 8_000

export const instantiationsPath = join(root, 'packages', 'quick-pick-worker')

export const workerPath = join(root, '.tmp/dist/dist/quickPickWorkerMain.js')

export const playwrightPath = new URL('../../e2e/node_modules/playwright/index.mjs', import.meta.url).toString()

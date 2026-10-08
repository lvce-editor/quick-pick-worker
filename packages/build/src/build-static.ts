import { exportStatic } from '@lvce-editor/shared-process'
import { cp, readFile, readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { root } from './root.ts'

process.env.PATH_PREFIX = '/quick-pick-worker'
const { commitHash } = await exportStatic({
  root,
  extensionPath: '',
})

const rendererWorkerPath = join(root, 'dist', commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js')

export const getRemoteUrl = (path: string): string => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

const content = await readFile(rendererWorkerPath, 'utf8')
const workerPath = join(root, '.tmp/dist/dist/quickPickWorkerMain.js')
const remoteUrl = getRemoteUrl(workerPath)

const occurrence = `\`${remoteUrl}\``
const replacement = `\`\${assetDir}/packages/quick-pick-worker/dist/quickPickWorkerMain.js\``
if (!content.includes(occurrence)) {
  throw new Error('quick pick worker URL occurrence not found')
}
await writeFile(rendererWorkerPath, content.replace(occurrence, replacement))

await cp(workerPath, join(root, 'dist', commitHash, 'packages', 'quick-pick-worker', 'dist', 'quickPickWorkerMain.js'))

const distPath = join(root, 'dist')
const productionUrl = `/quick-pick-worker/${commitHash}/packages/quick-pick-worker/dist/quickPickWorkerMain.js`
for (const path of await readdir(distPath, { recursive: true })) {
  if (!path.endsWith('.html')) continue
  const htmlPath = join(distPath, path)
  const html = await readFile(htmlPath, 'utf8')
  if (html.includes(remoteUrl)) {
    await writeFile(htmlPath, html.replaceAll(remoteUrl, productionUrl))
  }
}
await cp(distPath, join(root, '.tmp', 'static'), { recursive: true })

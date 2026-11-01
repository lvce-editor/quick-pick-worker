import { readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { patchWaitingAssertions } from './patchWaitingAssertions.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const root = join(__dirname, '..', '..', '..')

export const getRemoteUrl = (path) => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

const nodeModulesPath = join(root, 'node_modules')

const fileSearchWorkerPath = join(root, '.tmp', 'dist', 'dist', 'quickPickWorkerMain.js')

const serverStaticPath = join(nodeModulesPath, '@lvce-editor', 'static-server', 'static')

const RE_COMMIT_HASH = /^[a-z\d]+$/
const isCommitHash = (dirent) => {
  return dirent.length === 7 && dirent.match(RE_COMMIT_HASH)
}

const dirents = await readdir(serverStaticPath)
const commitHash = dirents.find(isCommitHash) || ''
const rendererWorkerMainPath = join(serverStaticPath, commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js')

const content = await readFile(rendererWorkerMainPath, 'utf-8')
const remoteUrl = getRemoteUrl(fileSearchWorkerPath)
if (!content.includes(remoteUrl)) {
  const occurrence = `\`\${assetDir}/packages/renderer-worker/node_modules/@lvce-editor/quick-pick-worker/dist/quickPickWorkerMain.js\``
  const newContent = content.replace(occurrence, `\`${remoteUrl}\``)
  if (newContent === content) {
    throw new Error('quick pick worker URL occurrence not found')
  }
  await writeFile(rendererWorkerMainPath, newContent)
}

const indexHtmlPath = join(serverStaticPath, 'index.html')
const indexHtml = await readFile(indexHtmlPath, 'utf8')
const workerUrlPattern = /("develop\.quickPickWorkerPath"\s*:\s*)"[^"]*"/
if (!workerUrlPattern.test(indexHtml)) {
  throw new Error('quick pick runtime URL not found')
}
await writeFile(
  indexHtmlPath,
  indexHtml.replace(workerUrlPattern, (_, key) => key + JSON.stringify(remoteUrl)),
)

const rendererProcessPath = join(serverStaticPath, commitHash, 'packages', 'renderer-process', 'dist', 'rendererProcessMain.js')
const rendererProcessContent = await readFile(rendererProcessPath, 'utf8')
const patchedRendererProcessContent = patchWaitingAssertions(rendererProcessContent)
if (patchedRendererProcessContent !== rendererProcessContent) {
  await writeFile(rendererProcessPath, patchedRendererProcessContent)
}

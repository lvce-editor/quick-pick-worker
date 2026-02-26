import { cp, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { root } from './root.js'

const sharedProcessPath = join(root, 'packages', 'server', 'node_modules', '@lvce-editor', 'shared-process', 'index.js')

const sharedProcessUrl = pathToFileURL(sharedProcessPath).toString()

const sharedProcess = await import(sharedProcessUrl)

process.env.PATH_PREFIX = '/quick-pick-worker'
const { commitHash } = await sharedProcess.exportStatic({
  root,
  extensionPath: '',
})

const rendererWorkerPath = join(root, 'dist', commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js')

export const getRemoteUrl = (path) => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

// @ts-ignore
const content = await readFile(rendererWorkerPath, 'utf8')
const workerPath = join(root, '.tmp/dist/dist/quickPickWorkerMain.js')
// @ts-ignore
const remoteUrl = getRemoteUrl(workerPath)

// if (content.includes('// const fileSearchWorkerUrl = ')) {
//   const occurrence = `// const fileSearchWorkerUrl = \`\${assetDir}/packages/quick-pick-worker/dist/quickPickWorkerMain.js\`
//   const fileSearchWorkerUrl = \`${remoteUrl}\``
//   const replacement = `const fileSearchWorkerUrl = \`\${assetDir}/packages/quick-pick-worker/dist/quickPickWorkerMain.js\``
//   const newContent = content.replace(occurrence, replacement)
//   await writeFile(rendererWorkerPath, newContent)
// }

await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })

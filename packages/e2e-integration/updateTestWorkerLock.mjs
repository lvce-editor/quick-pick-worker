import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

if (!process.argv[2]) {
  throw new Error('Pass the path to the disposable LVCE checkout')
}

const application = resolve(process.argv[2])
const packageJson = JSON.parse(await readFile(resolve(application, 'package.json'), 'utf8'))
if (packageJson.name !== 'lvce-editor') {
  throw new Error('Expected an LVCE application checkout')
}

const lockPath = resolve(application, 'package-lock.json')
const packageLock = JSON.parse(await readFile(lockPath, 'utf8'))
const testWorker = packageLock.packages?.['node_modules/@lvce-editor/test-worker']
if (!testWorker) {
  throw new Error('Expected @lvce-editor/test-worker in the LVCE application lockfile')
}

Object.assign(testWorker, {
  version: '17.31.0',
  resolved: 'https://registry.npmjs.org/@lvce-editor/test-worker/-/test-worker-17.31.0.tgz',
  integrity: 'sha512-EkM7YYz0tndcuCUx3K+roe6JGHqp75Ry3j38Ywmuey8QG3PBQmycLDBjDqchXJlfLJ/gdr3gUiwep7cfkEm66g==',
})

await writeFile(lockPath, `${JSON.stringify(packageLock, null, 2)}\n`)

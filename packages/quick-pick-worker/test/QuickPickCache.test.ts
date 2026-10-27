import { expect, test } from '@jest/globals'
import * as CacheWorker from '../src/parts/CacheWorker/CacheWorker.ts'
import * as QuickPickCache from '../src/parts/QuickPickCache/QuickPickCache.ts'

const createCacheResponse = (
  body: string,
  expires = new Date(Date.now() + 1000 * 60).toUTCString(),
): { readonly body: ArrayBuffer; readonly headers: { readonly expires: string } } => ({
  body: new TextEncoder().encode(body).buffer,
  headers: { expires },
})

test('reads a valid unexpired cache entry', async () => {
  const entry = { hash: 'a'.repeat(64), results: ['a.ts', 'b.ts'] }
  const invocations: unknown[][] = []
  CacheWorker.set({
    invoke(method: string, ...args: readonly unknown[]) {
      invocations.push([method, ...args])
      return createCacheResponse(JSON.stringify(entry))
    },
  } as any)

  await expect(QuickPickCache.get('/workspace')).resolves.toEqual(entry)
  expect(invocations[0][0]).toBe('Cache.getCacheStorageItem')
  expect(String(invocations[0][1])).toBe('https://quick-pick-cache.invalid/cache/v1/file/workspace')
})

test('builds readable cache paths for remote workspaces and safely encodes path segments', async () => {
  const requests: string[] = []
  CacheWorker.set({
    invoke(_method: string, request: string) {
      requests.push(request)
      return null
    },
  } as any)

  await QuickPickCache.get('remote-ssh://89.167.102.168/home/simon/Documents/levivilet/backend-2')
  await QuickPickCache.get('vscode-remote://ssh-remote+host/home/a folder?x#y')
  await QuickPickCache.get('vscode-remote://ssh-remote+other/home/a folder?x#y')
  await QuickPickCache.get('file:///home/a%20folder/文件#name')

  expect(requests).toEqual([
    'https://quick-pick-cache.invalid/cache/v1/remote-ssh/89.167.102.168/home/simon/Documents/levivilet/backend-2',
    'https://quick-pick-cache.invalid/cache/v1/vscode-remote/ssh-remote%2Bhost/home/a%20folder%3Fx%23y',
    'https://quick-pick-cache.invalid/cache/v1/vscode-remote/ssh-remote%2Bother/home/a%20folder%3Fx%23y',
    'https://quick-pick-cache.invalid/cache/v1/file/home/a%20folder/%E6%96%87%E4%BB%B6%23name',
  ])
})

test('uses the same key when reading and writing a remote workspace', async () => {
  const requests: string[] = []
  CacheWorker.set({
    invoke(method: string, request: string) {
      requests.push(`${method}:${request}`)
      return method === 'Cache.getCacheStorageItem' ? null : { success: true }
    },
  } as any)

  const workspace = 'remote-ssh://89.167.102.168/home/simon/Documents/levivilet/backend-2'
  await QuickPickCache.get(workspace)
  await QuickPickCache.set(workspace, { hash: 'd'.repeat(64), results: [] })

  expect(requests[0].slice(requests[0].indexOf(':') + 1)).toBe(requests[1].slice(requests[1].indexOf(':') + 1))
})

test('ignores expired and malformed cache entries', async () => {
  CacheWorker.set({
    invoke(_method: string, ...args: readonly unknown[]) {
      const request = String(args[0])
      if (request.includes('expired')) {
        return createCacheResponse(JSON.stringify({ hash: 'a'.repeat(64), results: [] }), new Date(Date.now() - 1000).toUTCString())
      }
      return createCacheResponse('{')
    },
  } as any)

  await expect(QuickPickCache.get('/expired')).resolves.toBeUndefined()
  await expect(QuickPickCache.get('/malformed')).resolves.toBeUndefined()
})

test('writes entries with a 90 day expiry header', async () => {
  let invocation: unknown[] = []
  CacheWorker.set({
    invoke(...args: readonly unknown[]) {
      invocation = [...args]
      return { success: true }
    },
  } as any)

  const before = Date.now()
  const entry = { hash: 'b'.repeat(64), results: ['a.ts'] }
  await QuickPickCache.set('/workspace', entry)
  const headers = invocation[4] as Record<string, string>
  const body = String(invocation[2])
  expect(invocation[0]).toBe('Cache.setCacheStorageItem')
  expect(JSON.parse(body)).toEqual(entry)
  expect(headers['content-type']).toBe('application/json')
  expect(headers['content-length']).toBe(String(new TextEncoder().encode(body).byteLength))
  expect(Date.parse(headers.expires)).toBeGreaterThanOrEqual(before + 90 * 24 * 60 * 60 * 1000 - 1000)
  expect(Date.parse(headers.expires)).toBeLessThanOrEqual(Date.now() + 90 * 24 * 60 * 60 * 1000 + 1000)
})

test('sets content length to the UTF-8 byte size for non-ASCII cache entries', async () => {
  let invocation: unknown[] = []
  CacheWorker.set({
    invoke(...args: readonly unknown[]) {
      invocation = [...args]
      return { success: true }
    },
  } as any)

  const entry = { hash: 'c'.repeat(64), results: ['/workspace/文件.ts', '/workspace/🙂.ts'] }
  await QuickPickCache.set('/workspace', entry)

  const body = String(invocation[2])
  const headers = invocation[4] as Record<string, string>
  expect(headers['content-length']).toBe(String(new TextEncoder().encode(body).byteLength))
  expect(Number(headers['content-length'])).toBeGreaterThan(body.length)
})

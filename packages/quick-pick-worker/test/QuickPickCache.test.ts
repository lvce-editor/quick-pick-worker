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
  expect(String(invocations[0][1])).toContain('folder=%2Fworkspace')
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
  expect(invocation[0]).toBe('Cache.setCacheStorageItem')
  expect(JSON.parse(String(invocation[2]))).toEqual(entry)
  expect(Date.parse(headers.expires)).toBeGreaterThanOrEqual(before + 90 * 24 * 60 * 60 * 1000 - 1000)
  expect(Date.parse(headers.expires)).toBeLessThanOrEqual(Date.now() + 90 * 24 * 60 * 60 * 1000 + 1000)
})

import { expect, test } from '@jest/globals'
import * as CacheWorker from '../src/parts/CacheWorker/CacheWorker.ts'
import * as CommandQuickPickCache from '../src/parts/CommandQuickPickCache/CommandQuickPickCache.ts'

const createResponse = (entry: unknown): { readonly body: ArrayBuffer; readonly headers: { readonly expires: string } } => ({
  body: new TextEncoder().encode(JSON.stringify(entry)).buffer,
  headers: { expires: new Date(Date.now() + 60_000).toUTCString() },
})

const entry: CommandQuickPickCache.CommandQuickPickCacheEntry = {
  builtin: { commands: [{ id: 'Layout.toggleSidebar', label: 'Toggle Sidebar' }], hash: 'a'.repeat(64) },
  extensions: { commands: [{ args: ['value'], id: 'ext.sample.command', label: 'Sample Command' }], hash: 'b'.repeat(64) },
  version: 1,
}

test('reads versioned cached command contributions for the same context', async () => {
  const urls: string[] = []
  CacheWorker.set({
    invoke(method: string, url: string) {
      if (method === 'Cache.getCacheStorageItem') {
        urls.push(url)
        return createResponse(entry)
      }
      return { success: true }
    },
  } as any)

  await expect(CommandQuickPickCache.get('app-a', '/static', 1)).resolves.toEqual(entry)
  await expect(CommandQuickPickCache.get('app-b', '/static', 1)).resolves.toEqual(entry)
  expect(urls[0]).not.toBe(urls[1])
  expect(urls[0]).toContain(encodeURIComponent('app-a'))
  expect(urls[1]).toContain(encodeURIComponent('app-b'))
})

test('ignores expired, malformed and unsupported command cache entries', async () => {
  CacheWorker.set({
    invoke(_method: string, url: string) {
      if (url.includes(encodeURIComponent('expired'))) {
        return { ...createResponse(entry), headers: { expires: new Date(Date.now() - 60_000).toUTCString() } }
      }
      if (url.includes(encodeURIComponent('malformed'))) {
        return { ...createResponse(entry), body: new TextEncoder().encode('{').buffer }
      }
      return createResponse({ ...entry, version: 2 })
    },
  } as any)

  await expect(CommandQuickPickCache.get('expired', '/static', 1)).resolves.toBeUndefined()
  await expect(CommandQuickPickCache.get('malformed', '/static', 1)).resolves.toBeUndefined()
  await expect(CommandQuickPickCache.get('old-version', '/static', 1)).resolves.toBeUndefined()
})

test('cache storage failures do not escape command cache reads or writes', async () => {
  CacheWorker.set({
    invoke() {
      throw new Error('cache storage unavailable')
    },
  } as any)

  await expect(CommandQuickPickCache.get(undefined, '/static', 1)).resolves.toBeUndefined()
  await expect(CommandQuickPickCache.set(undefined, '/static', 1, entry)).resolves.toBeUndefined()
})

test('rejects command arguments that cannot be safely serialized', () => {
  const circular: { self?: unknown } = {}
  circular.self = circular
  expect(CommandQuickPickCache.isCacheableCommands([{ args: [{ key: 'value' }], id: 'valid', label: 'Valid' }])).toBe(true)
  expect(CommandQuickPickCache.isCacheableCommands([{ args: [(): void => {}], id: 'function', label: 'Function' }])).toBe(false)
  expect(CommandQuickPickCache.isCacheableCommands([{ args: [circular], id: 'circular', label: 'Circular' }])).toBe(false)
})

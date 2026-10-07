import * as CacheWorker from '../CacheWorker/CacheWorker.ts'

const cacheName = 'quick-pick-files-v1'
const cacheUrl = (workspace: string): string => {
  const path = workspace.replaceAll('\\', '/').replace(/^\/+/, '').split('/').map(encodeURIComponent).join('/')
  return `https://quick-pick-cache.invalid/cache/v1/file/${path}`
}

interface QuickPickCacheEntry {
  readonly hash: string
  readonly results: readonly string[]
}

interface CacheStorageItem {
  readonly body: ArrayBuffer
  readonly headers: Readonly<Record<string, string>>
}

const isEntry = (value: unknown): value is QuickPickCacheEntry => {
  if (!value || typeof value !== 'object') {
    return false
  }
  const entry = value as QuickPickCacheEntry
  return (
    typeof entry.hash === 'string' &&
    /^[\da-f]{64}$/.test(entry.hash) &&
    Array.isArray(entry.results) &&
    entry.results.every((result) => typeof result === 'string')
  )
}

export const get = async (workspace: string): Promise<QuickPickCacheEntry | undefined> => {
  try {
    const cached = await CacheWorker.invoke<CacheStorageItem | null>('Cache.getCacheStorageItem', cacheUrl(workspace), cacheName)
    if (!cached) {
      return undefined
    }
    const expires = Date.parse(cached.headers.expires || '')
    if (!Number.isFinite(expires) || expires <= Date.now()) {
      return undefined
    }
    const entry: unknown = JSON.parse(new TextDecoder().decode(cached.body))
    return isEntry(entry) ? entry : undefined
  } catch {
    return undefined
  }
}

export const set = async (workspace: string, entry: QuickPickCacheEntry): Promise<void> => {
  const expires = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toUTCString()
  const body = JSON.stringify(entry)
  const headers = {
    'cache-control': 'private, max-age=7776000',
    'content-length': String(new TextEncoder().encode(body).byteLength),
    'content-type': 'application/json',
    expires,
  }
  try {
    await CacheWorker.invoke('Cache.setCacheStorageItem', cacheUrl(workspace), body, cacheName, headers)
  } catch {
    // Caching is optional; a storage failure must not break file search.
  }
}

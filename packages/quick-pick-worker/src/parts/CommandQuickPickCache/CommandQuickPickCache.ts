import * as CacheWorker from '../CacheWorker/CacheWorker.ts'

const cacheName = 'quick-pick-commands-v1'
const version = 1

export interface CachedCommand {
  readonly args?: unknown
  readonly id: string
  readonly label: string
}

export interface CommandContribution {
  readonly commands: readonly CachedCommand[]
  readonly hash: string
}

export interface CommandQuickPickCacheEntry {
  readonly builtin: CommandContribution
  readonly extensions: CommandContribution
  readonly version: 1
}

interface CacheStorageItem {
  readonly body: ArrayBuffer
  readonly headers: Readonly<Record<string, string>>
}

const isJsonValue = (value: unknown): boolean => {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') {
    return true
  }
  if (typeof value === 'number') {
    return Number.isFinite(value)
  }
  if (Array.isArray(value)) {
    return value.every(isJsonValue)
  }
  if (typeof value !== 'object') {
    return false
  }
  const prototype = Object.getPrototypeOf(value)
  return (prototype === Object.prototype || prototype === null) && Object.values(value).every(isJsonValue)
}

const canSerialize = (value: unknown): boolean => {
  try {
    JSON.stringify(value)
    return true
  } catch {
    return false
  }
}

const isCommand = (value: unknown): value is CachedCommand => {
  if (!value || typeof value !== 'object') {
    return false
  }
  const command = value as CachedCommand
  if (typeof command.id !== 'string' || typeof command.label !== 'string') {
    return false
  }
  if (command.args === undefined) {
    return true
  }
  return canSerialize(command.args) && isJsonValue(command.args)
}

const isContribution = (value: unknown): value is CommandContribution => {
  if (!value || typeof value !== 'object') {
    return false
  }
  const contribution = value as Partial<CommandContribution>
  if (typeof contribution.hash !== 'string' || !/^[\da-f]{64}$/.test(contribution.hash) || !Array.isArray(contribution.commands)) {
    return false
  }
  return contribution.commands.every(isCommand)
}

export const isCacheableCommands = (commands: readonly CachedCommand[]): boolean => {
  try {
    return commands.every(isCommand)
  } catch {
    return false
  }
}

const isEntry = (value: unknown): value is CommandQuickPickCacheEntry => {
  if (!value || typeof value !== 'object') {
    return false
  }
  const entry = value as CommandQuickPickCacheEntry
  return entry.version === version && isContribution(entry.builtin) && isContribution(entry.extensions)
}

const getCacheUrl = (applicationId: string | undefined, assetDir: string, platform: number): string => {
  const context = JSON.stringify({ applicationId: applicationId ?? null, assetDir, platform })
  return `https://quick-pick-cache.invalid/cache/v1/commands/${encodeURIComponent(context)}`
}

export const get = async (applicationId: string | undefined, assetDir: string, platform: number): Promise<CommandQuickPickCacheEntry | undefined> => {
  try {
    const cached = await CacheWorker.invoke<CacheStorageItem | null>(
      'Cache.getCacheStorageItem',
      getCacheUrl(applicationId, assetDir, platform),
      cacheName,
    )
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

export const set = async (
  applicationId: string | undefined,
  assetDir: string,
  platform: number,
  entry: CommandQuickPickCacheEntry,
): Promise<void> => {
  const expires = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toUTCString()
  const body = JSON.stringify(entry)
  const headers = {
    'cache-control': 'private, max-age=7776000',
    'content-length': String(new TextEncoder().encode(body).byteLength),
    'content-type': 'application/json',
    expires,
  }
  try {
    await CacheWorker.invoke('Cache.setCacheStorageItem', getCacheUrl(applicationId, assetDir, platform), body, cacheName, headers)
  } catch {
    // Caching is optional; storage failures must not break command selection.
  }
}

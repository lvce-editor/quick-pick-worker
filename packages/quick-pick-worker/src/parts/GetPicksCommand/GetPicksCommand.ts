import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as CollectWarnings from '../CollectWarnings/CollectWarnings.ts'
import * as CommandQuickPickCache from '../CommandQuickPickCache/CommandQuickPickCache.ts'
import * as ErrorHandling from '../ErrorHandling/ErrorHandling.ts'
import * as MenuEntriesState from '../MenuEntriesState/MenuEntriesState.ts'

const changeLanguageModePick = {
  id: 'QuickPick.changeLanguageMode',
  label: 'Change Language Mode',
}

interface CommandProviderResponse {
  readonly commands?: readonly unknown[]
  readonly hash: string
  readonly matchesCache: boolean
}

type CommandProviderResult = readonly unknown[] | CommandProviderResponse | undefined

const isCommandProviderResponse = (value: unknown): value is CommandProviderResponse => {
  return !!value && typeof value === 'object' && !Array.isArray(value) && 'matchesCache' in value && 'hash' in value
}

const getBuiltinPicks = async (ifNonMatch: string | null | undefined): Promise<readonly unknown[] | CommandProviderResponse> => {
  const result = await RendererWorker.invoke('Layout.getAllQuickPickMenuEntries', ifNonMatch)
  if (isCommandProviderResponse(result)) {
    const response = result
    return response.commands ? { ...response, commands: [...response.commands, changeLanguageModePick] } : response
  }
  return Array.isArray(result) ? [...result, changeLanguageModePick] : [...(await MenuEntriesState.getAll()), changeLanguageModePick]
}

const getBuiltinFallback = async (): Promise<readonly unknown[]> => {
  const builtinPicks = await MenuEntriesState.getAll()
  return [...builtinPicks, changeLanguageModePick]
}

const getBuiltinCommands = async (
  response: CommandProviderResult,
  cached: CommandQuickPickCache.CommandQuickPickCacheEntry | undefined,
): Promise<readonly unknown[]> => {
  if (isCommandProviderResponse(response)) {
    if (response.matchesCache) {
      return cached?.builtin.commands ?? []
    }
    return response.commands ?? getBuiltinFallback()
  }
  if (Array.isArray(response)) {
    return response
  }
  return getBuiltinFallback()
}

const prefixIdWithExt = (item: any): any => {
  return {
    ...item,
    id: `ext.${item.id}`,
    label: item.label || item.id,
  }
}

const getExtensionPicks = async (
  assetDir: string,
  platform: number,
  applicationId: string | undefined,
  ifNonMatch: string | null | undefined,
): Promise<readonly unknown[] | CommandProviderResponse | undefined> => {
  try {
    const extensionPicks =
      applicationId === undefined
        ? await RendererWorker.invoke('ExtensionHost.getCommands', assetDir, platform, undefined, ifNonMatch)
        : await RendererWorker.invoke('Application.execute', applicationId, 'ExtensionHost.getCommands', assetDir, platform, ifNonMatch)
    if (!extensionPicks) {
      return undefined
    }
    if (isCommandProviderResponse(extensionPicks)) {
      if (extensionPicks.matchesCache || !extensionPicks.commands) {
        return extensionPicks
      }
      const warnings = CollectWarnings.collectWarnings(extensionPicks.commands as readonly any[])
      for (const warning of warnings) {
        ErrorHandling.warn(`[QuickPick] ${warning}`)
      }
      return { ...extensionPicks, commands: extensionPicks.commands.map(prefixIdWithExt) }
    }
    const warnings = CollectWarnings.collectWarnings(extensionPicks)
    for (const warning of warnings) {
      ErrorHandling.warn(`[QuickPick] ${warning}`)
    }
    const mappedPicks = extensionPicks.map(prefixIdWithExt)
    return mappedPicks
  } catch (error) {
    console.error(`Failed to get extension picks: ${error}`)
    return undefined
  }
}

const getExtensionCommands = (
  response: CommandProviderResult,
  cached: CommandQuickPickCache.CommandQuickPickCacheEntry | undefined,
): readonly unknown[] => {
  if (isCommandProviderResponse(response)) {
    if (response.matchesCache) {
      return cached?.extensions.commands ?? []
    }
    return response.commands ?? []
  }
  if (Array.isArray(response)) {
    return response
  }
  return cached?.extensions.commands ?? []
}

const toCachedCommands = (items: readonly any[]): readonly CommandQuickPickCache.CachedCommand[] | undefined => {
  const commands = items.map((item) => ({
    ...(item.args !== undefined && { args: item.args }),
    id: String(item.id),
    label: typeof item.label === 'string' ? item.label : String(item.id),
  }))
  return CommandQuickPickCache.isCacheableCommands(commands) ? commands : undefined
}

const saveCommandCache = async (
  applicationId: string | undefined,
  assetDir: string,
  platform: number,
  cached: CommandQuickPickCache.CommandQuickPickCacheEntry | undefined,
  builtinResponse: CommandProviderResult,
  extensionResponse: CommandProviderResult,
  builtinPicks: readonly unknown[],
  extensionPicks: readonly unknown[],
): Promise<void> => {
  const builtinCommands = toCachedCommands(builtinPicks)
  const extensionCommands = toCachedCommands(extensionPicks)
  if (!builtinCommands || !extensionCommands) {
    return
  }
  const builtinHash = isCommandProviderResponse(builtinResponse) ? builtinResponse.hash : cached?.builtin.hash
  const extensionHash = isCommandProviderResponse(extensionResponse) ? extensionResponse.hash : cached?.extensions.hash
  if (!builtinHash || !extensionHash) {
    return
  }
  await CommandQuickPickCache.set(applicationId, assetDir, platform, {
    builtin: { commands: builtinCommands, hash: builtinHash },
    extensions: { commands: extensionCommands, hash: extensionHash },
    version: 1,
  })
}

const getOptional = async <T>(callback: () => Promise<T>): Promise<T | undefined> => {
  try {
    return await callback()
  } catch {
    return undefined
  }
}

const toProtoVisibleItem = (item: any): ProtoVisibleItem => {
  const pick: ProtoVisibleItem = {
    // @ts-ignore
    args: item.args,
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    // @ts-ignore
    id: item.id,
    label: item.label,
    matches: [],
    uri: '',
  }
  // @ts-ignore
  return pick
}

export const getPicks = async (
  value: string,
  args: any,
  { applicationId, assetDir = '', platform = 0 }: { assetDir?: string; platform?: number; applicationId?: string } = {},
): Promise<readonly ProtoVisibleItem[]> => {
  let cacheEnabled = false
  try {
    cacheEnabled = (await RendererWorker.invoke('Preferences.get', 'quickPick.cache')) !== false
  } catch {
    // If preferences are unavailable, preserve the existing uncached command behavior.
  }
  const cached = cacheEnabled ? await CommandQuickPickCache.get(applicationId, assetDir, platform) : undefined
  const [builtinResponse, extensionResponse] = await Promise.all([
    getOptional(() => getBuiltinPicks(cacheEnabled ? (cached?.builtin.hash ?? null) : undefined)),
    getOptional(() => getExtensionPicks(assetDir, platform, applicationId, cacheEnabled ? (cached?.extensions.hash ?? null) : undefined)),
  ])
  const builtinPicks = await getBuiltinCommands(builtinResponse, cached)
  const extensionPicks = getExtensionCommands(extensionResponse, cached)

  if (cacheEnabled) {
    await saveCommandCache(applicationId, assetDir, platform, cached, builtinResponse, extensionResponse, builtinPicks, extensionPicks)
  }
  const allPicks = [...builtinPicks, ...extensionPicks]
  const converted = allPicks.map(toProtoVisibleItem)
  return value === '>' ? converted.toSorted((a, b) => a.label.localeCompare(b.label)) : converted
}

import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as ErrorHandling from '../ErrorHandling/ErrorHandling.ts'
import * as MenuEntriesState from '../MenuEntriesState/MenuEntriesState.ts'

// TODO combine Ajax with cache (specify strategy: cacheFirst, networkFirst)
const getBuiltinPicks = async (): Promise<readonly unknown[]> => {
  const builtinPicks = await MenuEntriesState.getAll()
  return builtinPicks
}

const prefixIdWithExt = (item: any): any => {
  if (!item.label) {
    ErrorHandling.warn('[QuickPick] item has missing label', item)
  }
  if (!item.id) {
    ErrorHandling.warn('[QuickPick] item has missing id', item)
  }
  return {
    ...item,
    id: `ext.${item.id}`,
    label: item.label || item.id,
  }
}

const getExtensionPicks = async (assetDir: string, platform: number): Promise<readonly unknown[]> => {
  try {
    // TODO
    // Assert.string(assetDir)
    // Assert.number(platform)
    // TODO ask extension management worker directly
    // TODO don't call this every time, cache the results
    const extensionPicks = await RendererWorker.invoke('ExtensionHost.getCommands', assetDir, platform)
    if (!extensionPicks) {
      return []
    }
    const mappedPicks = extensionPicks.map(prefixIdWithExt)
    return mappedPicks
  } catch (error) {
    console.error(`Failed to get extension picks: ${error}`)
    return []
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

export const getPicks = async (value: string, args: any, { assetDir = '', platform = 0 } = {}): Promise<readonly ProtoVisibleItem[]> => {
  // TODO get picks in parallel
  const builtinPicks = await getBuiltinPicks()
  const extensionPicks = await getExtensionPicks(assetDir, platform)
  const allPicks = [...builtinPicks, ...extensionPicks]
  const converted = allPicks.map(toProtoVisibleItem)
  return converted
}

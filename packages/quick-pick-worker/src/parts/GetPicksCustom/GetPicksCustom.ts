import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import { state } from '../QuickPickEntriesCustom/QuickPickEntriesCustomState.ts'

const toProtoVisibleItem = (item: any): ProtoVisibleItem => {
  const { description = '', label, value } = item
  return {
    description,
    direntType: 0,
    fileIcon: '',
    icon: '',
    label,
    matches: [],
    uri: '',
    value,
  }
}

export const getPicks = async (searchValue: string, args: readonly unknown[]): Promise<readonly ProtoVisibleItem[]> => {
  state.args = args
  const items = (args[1] as readonly unknown[]) || []
  const mapped = items.map(toProtoVisibleItem)
  return mapped
}

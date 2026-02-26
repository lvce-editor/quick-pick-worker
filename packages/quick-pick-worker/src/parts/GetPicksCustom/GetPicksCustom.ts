import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'

const toProtoVisibleItem = (item: any): ProtoVisibleItem => {
  const { label } = item
  return {
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label,
    matches: [],
    uri: '',
  }
}

export const getPicks = async (searchValue: string, args: readonly unknown[]): Promise<readonly ProtoVisibleItem[]> => {
  const items = (args[1] as readonly unknown[]) || []
  const mapped = items.map(toProtoVisibleItem)
  return mapped
}

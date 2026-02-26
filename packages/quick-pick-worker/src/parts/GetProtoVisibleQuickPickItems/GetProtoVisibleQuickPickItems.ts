import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'

export const getVisible = (items: readonly unknown[], minLineY: number, maxLineY: number, icons: readonly string[]): readonly ProtoVisibleItem[] => {
  const range = items.slice(minLineY, maxLineY)
  const protoVisibleItems = range.map((item, index) => {
    return {
      ...(item as ProtoVisibleItem),
      fileIcon: icons[index],
    }
  })
  return protoVisibleItems
}

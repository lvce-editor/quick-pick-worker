import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'

export const findLabelIndex = (items: readonly ProtoVisibleItem[], label: string): number => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].label === label) {
      return i
    }
  }
  return -1
}

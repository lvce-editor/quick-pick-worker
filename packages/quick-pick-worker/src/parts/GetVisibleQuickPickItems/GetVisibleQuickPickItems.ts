import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as GetHighlightSections from '../GetHighlightSections/GetHighlightSections.ts'

export const getVisible = (
  setSize: number,
  protoVisibleItems: readonly ProtoVisibleItem[],
  minLineY: number,
  focusedIndex: number,
  keyBindings: Readonly<Record<string, string>> = {},
): readonly VisibleItem[] => {
  const visibleFocusedIndex = focusedIndex - minLineY
  const visibleItems = protoVisibleItems.map((visibleItem, i) => {
    const { id } = visibleItem as ProtoVisibleItem & { readonly id?: string }
    const highlights = visibleItem.matches.slice(1)
    const sections = GetHighlightSections.getHighlightSections(highlights, visibleItem.label)
    return {
      ...visibleItem,
      highlights: sections,
      isActive: i === visibleFocusedIndex,
      ...(id && Object.hasOwn(keyBindings, id) && { keyBinding: keyBindings[id] }),
      posInSet: minLineY + i + 1,
      setSize,
    }
  })
  return visibleItems
}

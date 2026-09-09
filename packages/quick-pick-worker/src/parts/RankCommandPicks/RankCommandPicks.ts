import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'

const getMatchRank = (label: string, value: string): number => {
  if (label === value) {
    return 4
  }
  if (label.startsWith(value)) {
    return 3
  }
  let index = label.indexOf(value)
  if (index === -1) {
    return 0
  }
  while (index !== -1) {
    if (!/[\p{L}\p{N}]/u.test(label[index - 1])) {
      return 2
    }
    index = label.indexOf(value, index + 1)
  }
  return 1
}

export const rankCommandPicks = (items: readonly ProtoVisibleItem[], value: string): readonly ProtoVisibleItem[] => {
  const normalizedValue = value.toLowerCase()
  const ranked = items.map((item) => ({
    item,
    rank: getMatchRank(item.label.toLowerCase(), normalizedValue),
  }))
  // The first match entry is the fuzzy score; the remaining entries describe highlights.
  ranked.sort((a, b) => b.rank - a.rank || b.item.matches[0] - a.item.matches[0])
  return ranked.map(({ item }) => item)
}

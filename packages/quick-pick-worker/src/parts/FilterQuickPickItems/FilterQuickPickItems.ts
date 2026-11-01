import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as FilterQuickPickItem from '../FilterQuickPickItem/FilterQuickPickItem.ts'
import * as RankCommandPicks from '../RankCommandPicks/RankCommandPicks.ts'

export const filterQuickPickItems = (items: readonly ProtoVisibleItem[], value: string, rankCommands = false): readonly ProtoVisibleItem[] => {
  if (!value) {
    return items
  }
  const results: ProtoVisibleItem[] = []
  for (const item of items) {
    const filterValue = item.label
    const matches = FilterQuickPickItem.filterQuickPickItem(value, filterValue)
    if (matches.length > 0) {
      results.push({
        ...item,
        matches,
      })
    }
  }
  return rankCommands ? RankCommandPicks.rankCommandPicks(results, value) : results
}

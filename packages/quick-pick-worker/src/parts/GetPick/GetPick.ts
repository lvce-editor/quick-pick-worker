import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as Assert from '../Assert/Assert.ts'

export const getPick = (items: readonly ProtoVisibleItem[], index: number): ProtoVisibleItem | undefined => {
  Assert.array(items)
  Assert.number(index)
  // if (index < state.recentPicks.length) {
  //   return state.recentPicks[index]
  // }
  // index -= state.recentPicks.length
  if (index < items.length) {
    return items[index]
  }
  console.warn('no pick matching index', index)
  return undefined
}

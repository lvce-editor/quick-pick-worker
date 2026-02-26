import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as Assert from '../Assert/Assert.ts'
import * as FindLabelIndex from '../FindLabelIndex/FindLabelIndex.ts'
import { selectIndex } from '../SelectIndex/SelectIndex.ts'

export const selectItem = async (state: QuickPickState, label: string): Promise<QuickPickState> => {
  Assert.string(label)
  const index = FindLabelIndex.findLabelIndex(state.items, label)
  if (index === -1) {
    return state
  }
  return selectIndex(state, index)
}

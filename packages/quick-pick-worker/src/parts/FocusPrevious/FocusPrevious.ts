import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'
import * as ListIndex from '../ListIndex/ListIndex.ts'

export const focusPrevious = (state: QuickPickState): Promise<QuickPickState> => {
  const { focusedIndex, items } = state
  const previousIndex = ListIndex.previous(items, focusedIndex)
  return focusIndex(state, previousIndex)
}

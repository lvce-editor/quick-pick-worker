import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'
import * as ListIndex from '../ListIndex/ListIndex.ts'

export const focusFirst = (state: QuickPickState): Promise<QuickPickState> => {
  return focusIndex(state, ListIndex.first())
}

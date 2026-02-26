import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import { selectIndex } from '../SelectIndex/SelectIndex.ts'

export const selectCurrentIndex = (state: QuickPickState): Promise<QuickPickState> => {
  const { focusedIndex } = state
  return selectIndex(state, focusedIndex)
}

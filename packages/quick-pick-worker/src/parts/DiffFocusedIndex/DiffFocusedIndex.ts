import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as DiffType from '../DiffType/DiffType.ts'

export const diffType = DiffType.RenderFocusedIndex

export const isEqual = (oldState: QuickPickState, newState: QuickPickState): boolean => {
  return oldState.focusedIndex === newState.focusedIndex
}

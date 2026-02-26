import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as DiffType from '../DiffType/DiffType.ts'

export const diffType = DiffType.Height

export const isEqual = (oldState: QuickPickState, newState: QuickPickState): boolean => {
  return oldState.items.length === newState.items.length
}

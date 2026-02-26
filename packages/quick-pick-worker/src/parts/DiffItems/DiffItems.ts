import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as DiffType from '../DiffType/DiffType.ts'

export const diffType = DiffType.RenderItems

export const isEqual = (oldState: QuickPickState, newState: QuickPickState): boolean => {
  return (
    oldState.items === newState.items &&
    oldState.minLineY === newState.minLineY &&
    oldState.maxLineY === newState.maxLineY &&
    oldState.focusedIndex === newState.focusedIndex
  )
}

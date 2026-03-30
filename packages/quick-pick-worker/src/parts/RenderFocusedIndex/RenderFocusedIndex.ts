import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as RenderMethod from '../RenderMethod/RenderMethod.ts'

export const renderFocusedIndex = (oldState: QuickPickState, newState: QuickPickState): readonly unknown[] => {
  const oldFocusedIndex = oldState.focusedIndex - oldState.minLineY
  const newFocusedIndex = newState.focusedIndex - newState.minLineY
  return [
    'Viewlet.send',
    newState.uid,
    /* method */ RenderMethod.SetFocusedIndex,
    /* oldFocusedIndex */ oldFocusedIndex,
    /* newFocusedIndex */ newFocusedIndex,
  ]
}

import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as RenderMethod from '../RenderMethod/RenderMethod.ts'

export const renderCursorOffset = (_oldState: QuickPickState, newState: QuickPickState): any => {
  return ['Viewlet.send', newState.uid, /* method */ RenderMethod.SetCursorOffset, /* cursorOffset */ newState.cursorOffset]
}

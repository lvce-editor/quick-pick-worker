import type { QuickPickViewModel } from '../QuickPickViewModel/QuickPickViewModel.ts'
import * as RenderMethod from '../RenderMethod/RenderMethod.ts'

export const renderCursorOffset = (newState: QuickPickViewModel): any => {
  return ['Viewlet.send', newState.uid, /* method */ RenderMethod.SetCursorOffset, /* cursorOffset */ newState.cursorOffset]
}

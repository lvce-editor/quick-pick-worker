import { WhenExpression } from '@lvce-editor/constants'
import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as GetRenderer from '../GetRenderer/GetRenderer.ts'

export const applyRender = (oldState: QuickPickState, newState: QuickPickState, diffResult: readonly number[]): readonly unknown[] => {
  const commands = []
  for (const item of diffResult) {
    if (item === DiffType.Height) {
      continue
    }
    if (item === DiffType.RenderFocusedIndex) {
      continue
    }
    if (item === DiffType.RenderFocus) {
      // Register shortcuts before rendering/focusing the input. Waiting for its
      // DOM focus event leaves a round trip where Enter can be lost.
      commands.push(['Viewlet.setFocusContext', newState.uid, WhenExpression.FocusQuickPickInput])
    }
    const fn = GetRenderer.getRenderer(item)
    commands.push(fn(oldState, newState))
  }
  return commands
}

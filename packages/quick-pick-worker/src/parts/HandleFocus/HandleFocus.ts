import { WhenExpression } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'

export const handleFocus = async (state: QuickPickState): Promise<QuickPickState> => {
  // TODO fix virtual dom diffing so that input isn't destroyed and loses focus when rerendering
  await RendererWorker.setFocus(WhenExpression.FocusQuickPickInput)
  // await CloseWidget.closeWidget(state.uid)
  return state
}

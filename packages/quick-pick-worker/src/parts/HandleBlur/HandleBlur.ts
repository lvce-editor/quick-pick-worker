import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'

export const handleBlur = async (state: QuickPickState): Promise<QuickPickState> => {
  // TODO fix virtual dom diffing so that input isn't destroyed and loses focus when rerendering
  // await CloseWidget.closeWidget(state.uid)
  return state
}

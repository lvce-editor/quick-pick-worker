import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as InputName from '../InputName/InputName.ts'

export const renderFocus = (_oldState: QuickPickState, _newState: QuickPickState): readonly unknown[] => {
  return ['Viewlet.focusElementByName', InputName.QuickPickInput]
}

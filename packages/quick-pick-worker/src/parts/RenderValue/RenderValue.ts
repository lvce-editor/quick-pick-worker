import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as InputName from '../InputName/InputName.ts'

export const renderValue = (_oldState: QuickPickState, newState: QuickPickState): readonly unknown[] => {
  return ['Viewlet.setValueByName', newState.uid, InputName.QuickPickInput, /* value */ newState.value]
}

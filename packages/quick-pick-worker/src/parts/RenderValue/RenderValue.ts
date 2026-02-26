import type { QuickPickViewModel } from '../QuickPickViewModel/QuickPickViewModel.ts'
import * as InputName from '../InputName/InputName.ts'

export const renderValue = (newState: QuickPickViewModel): readonly unknown[] => {
  return ['Viewlet.setValueByName', InputName.QuickPickInput, /* value */ newState.value]
}

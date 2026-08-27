import type { SelectPickResult } from '../SelectPickRresult/SelectPickResult.ts'
import { goToPositionAndFocus } from '../GoToPositionAndFocus/GoToPositionAndFocus.ts'
import { parseGoToLinePosition } from '../ParseGoToLinePosition/ParseGoToLinePosition.ts'
import * as QuickPickPrefix from '../QuickPickPrefix/QuickPickPrefix.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'

export const selectPick = async (item: any, value: string): Promise<SelectPickResult> => {
  if (value.startsWith(QuickPickPrefix.GoToLine)) {
    const position = parseGoToLinePosition(value)
    if (position) {
      await goToPositionAndFocus(position.rowIndex, position.columnIndex)
    }
    return {
      command: QuickPickReturnValue.Hide,
    }
  }
  return {
    command: QuickPickReturnValue.Hide,
  }
}

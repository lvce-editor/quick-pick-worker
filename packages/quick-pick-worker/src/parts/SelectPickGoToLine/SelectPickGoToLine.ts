import type { SelectPickResult } from '../SelectPickRresult/SelectPickResult.ts'
import { goToPositionAndFocus } from '../GoToPositionAndFocus/GoToPositionAndFocus.ts'
import * as QuickPickPrefix from '../QuickPickPrefix/QuickPickPrefix.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'

export const selectPick = async (item: any, value: string): Promise<SelectPickResult> => {
  if (value.startsWith(QuickPickPrefix.GoToLine)) {
    const lineString = value.slice(QuickPickPrefix.GoToLine.length)
    const wantedLine = Number.parseInt(lineString, 10)
    const rowIndex = wantedLine - 1
    const columnIndex = 0
    await goToPositionAndFocus(rowIndex, columnIndex)
    return {
      command: QuickPickReturnValue.Hide,
    }
  }
  return {
    command: QuickPickReturnValue.Hide,
  }
}

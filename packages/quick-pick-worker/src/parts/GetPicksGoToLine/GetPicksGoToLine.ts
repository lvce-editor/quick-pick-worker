import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import { getPicksGoToLineBase } from '../GetPicksGoToLineBase/GetPicksGoToLineBase.ts'
import { parseGotoline } from '../ParseGotoline/ParseGotoline.ts'
import * as QuickPickPrefix from '../QuickPickPrefix/QuickPickPrefix.ts'
import * as QuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'

export const getPicks = async (value: string): Promise<readonly ProtoVisibleItem[]> => {
  if (value === QuickPickPrefix.GoToLine) {
    return getPicksGoToLineBase()
  }
  if (value.startsWith(QuickPickPrefix.GoToLine)) {
    const wantedLine = parseGotoline(value)
    if (wantedLine === -1) {
      return getPicksGoToLineBase()
    }
    const rowIndex = wantedLine - 1
    const columnIndex = 0
    return [
      {
        description: '',
        direntType: 0,
        fileIcon: '',
        icon: '',
        label: QuickPickStrings.pressEnterToGoToLine(rowIndex, columnIndex),
        matches: [],
        uri: '',
      },
    ]
  }
  return []
}

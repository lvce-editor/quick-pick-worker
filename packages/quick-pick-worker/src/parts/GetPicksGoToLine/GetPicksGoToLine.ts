import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import { getPicksGoToLineBase } from '../GetPicksGoToLineBase/GetPicksGoToLineBase.ts'
import { parseGoToLinePosition } from '../ParseGoToLinePosition/ParseGoToLinePosition.ts'
import * as QuickPickPrefix from '../QuickPickPrefix/QuickPickPrefix.ts'
import * as QuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'

export const getPicks = async (value: string): Promise<readonly ProtoVisibleItem[]> => {
  if (value === QuickPickPrefix.GoToLine) {
    return getPicksGoToLineBase()
  }
  if (value.startsWith(QuickPickPrefix.GoToLine)) {
    const position = parseGoToLinePosition(value)
    if (!position) {
      return getPicksGoToLineBase()
    }
    return [
      {
        description: '',
        direntType: 0,
        fileIcon: '',
        icon: '',
        label: QuickPickStrings.pressEnterToGoToLine(position.rowIndex, position.columnIndex),
        matches: [],
        uri: '',
      },
    ]
  }
  return []
}

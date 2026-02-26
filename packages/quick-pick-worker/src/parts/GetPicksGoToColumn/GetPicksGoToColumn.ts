import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import { getPicksGoToColumnBase } from '../GetPicksGoToColumnBase/GetPicksGoToColumnBase.ts'
import { getPosition } from '../GetPosition/GetPosition.ts'
import { getText } from '../GetText/GetText.ts'
import * as QuickPickPrefix from '../QuickPickPrefix/QuickPickPrefix.ts'
import * as QuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'

export const getPicksGoToColumn = async (value: string): Promise<readonly ProtoVisibleItem[]> => {
  if (value === QuickPickPrefix.GoToColumn) {
    return getPicksGoToColumnBase()
  }
  if (value.startsWith(QuickPickPrefix.GoToColumn)) {
    const columnString = value.slice(QuickPickPrefix.GoToColumn.length)
    const wantedColumn = Number.parseInt(columnString, 10)
    if (Number.isNaN(wantedColumn)) {
      return getPicksGoToColumnBase()
    }
    const text = await getText()
    const position = getPosition(text, wantedColumn)
    return [
      {
        description: '',
        direntType: 0,
        fileIcon: '',
        icon: '',
        label: QuickPickStrings.pressEnterToGoToLine(position.row, position.column),
        matches: [],
        uri: '',
      },
    ]
  }
  return []
}

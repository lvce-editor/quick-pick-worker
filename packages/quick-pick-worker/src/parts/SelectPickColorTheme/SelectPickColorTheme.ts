import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'
import * as SetColorTheme from '../SetColorTheme/SetColorTheme.ts'

export const selectPick = async (pick: ProtoVisibleItem): Promise<any> => {
  const id = pick.label
  await SetColorTheme.setColorTheme(id)
  return {
    command: QuickPickReturnValue.Hide,
  }
}

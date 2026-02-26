import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import type { SelectPickResult } from '../SelectPickRresult/SelectPickResult.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'

export const selectPick = async (item: ProtoVisibleItem): Promise<SelectPickResult> => {
  // Command.execute(/* openView */ 549, /* viewName */ item.label)
  return {
    command: QuickPickReturnValue.Hide,
  }
}

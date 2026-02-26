import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import type { SelectPickResult } from '../SelectPickRresult/SelectPickResult.ts'
import { state } from '../QuickPickEntriesCustom/QuickPickEntriesCustomState.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'

export const selectPick = async (pick: ProtoVisibleItem): Promise<SelectPickResult> => {
  const { args } = state
  const resolveId = args[2]
  await RendererWorker.invoke(`QuickPick.executeCallback`, resolveId, pick)
  return {
    command: QuickPickReturnValue.Hide,
  }
}

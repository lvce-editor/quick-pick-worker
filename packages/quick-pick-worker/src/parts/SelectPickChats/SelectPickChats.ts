import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import type { SelectPickResult } from '../SelectPickRresult/SelectPickResult.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'

export const selectPick = async (item: ProtoVisibleItem, _value: string, applicationId?: string): Promise<SelectPickResult> => {
  if (typeof item.value === 'string') {
    if (applicationId) {
      await RendererWorker.invoke('Application.execute', applicationId, 'ExtensionHost.executeCommand', 'chat2.openQuickPickItem', item.value)
    } else {
      await RendererWorker.invoke('ExtensionHost.executeCommand', 'chat2.openQuickPickItem', item.value)
    }
  }
  return {
    command: QuickPickReturnValue.Hide,
  }
}

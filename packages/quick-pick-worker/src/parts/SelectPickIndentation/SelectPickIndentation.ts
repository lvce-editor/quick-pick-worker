import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'

export const selectPick = async (pick: ProtoVisibleItem): Promise<any> => {
  const editorId = await RendererWorker.getActiveEditorId()
  await RendererWorker.invoke('Viewlet.executeViewletCommand', editorId, 'setIndentation', pick.value)
  return {
    command: QuickPickReturnValue.Hide,
  }
}

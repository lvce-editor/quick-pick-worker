import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'

interface LanguageModeValue {
  readonly languageId: string
  readonly tokenizePath: string
}

export const selectPick = async (pick: ProtoVisibleItem): Promise<any> => {
  const editorId = await RendererWorker.getActiveEditorId()
  const value = pick.value as LanguageModeValue
  await RendererWorker.invoke('Viewlet.executeViewletCommand', editorId, 'setLanguageId', value.languageId, value.tokenizePath)
  return {
    command: QuickPickReturnValue.Hide,
  }
}

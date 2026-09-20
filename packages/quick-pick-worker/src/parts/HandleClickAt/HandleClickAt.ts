import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as GetIndex from '../GetIndex/GetIndex.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as QuickPickEntryId from '../QuickPickEntryId/QuickPickEntryId.ts'
import { selectIndex } from '../SelectIndex/SelectIndex.ts'
import * as SetValue from '../SetValue/SetValue.ts'

const r = async (state: QuickPickState, uri: string): Promise<QuickPickState> => {
  if (state.providerId !== QuickPickEntryId.Recent || state.items.every((item) => item.uri !== uri)) {
    return state
  }
  await RendererWorker.invoke('RecentlyOpened.removeRecentlyOpened', uri)
  const next = await LoadContent.loadContent({ ...state, value: '' })
  return state.value ? SetValue.setValue(next, state.value) : next
}

export const handleClickAt = (state: QuickPickState, x: number, y: number, uri?: string): Promise<QuickPickState> => {
  if (uri) {
    return r(state, uri)
  }
  const { headerHeight, itemHeight, top } = state
  const index = GetIndex.getIndex(top, headerHeight, itemHeight, y)
  return selectIndex(state, index)
}

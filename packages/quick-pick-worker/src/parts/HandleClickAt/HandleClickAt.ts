import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as GetIndex from '../GetIndex/GetIndex.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as QuickPickEntryId from '../QuickPickEntryId/QuickPickEntryId.ts'
import * as SetValue from '../SetValue/SetValue.ts'
import { selectIndex } from '../SelectIndex/SelectIndex.ts'

const removeRecentlyOpened = async (state: QuickPickState, uri: string): Promise<QuickPickState> => {
  const canRemove = state.providerId === QuickPickEntryId.Recent && state.items.some((item) => item.removeButton && item.uri === uri)
  if (!canRemove) {
    return state
  }
  await RendererWorker.invoke('RecentlyOpened.removeRecentlyOpened', uri)
  const reloadedState = await LoadContent.loadContent({ ...state, value: '' })
  if (state.value) {
    return SetValue.setValue(reloadedState, state.value)
  }
  return reloadedState
}

export const handleClickAt = (state: QuickPickState, x: number, y: number, removeUri?: string): Promise<QuickPickState> => {
  if (removeUri) {
    return removeRecentlyOpened(state, removeUri)
  }
  const { headerHeight, itemHeight, top } = state
  const index = GetIndex.getIndex(top, headerHeight, itemHeight, y)
  return selectIndex(state, index)
}

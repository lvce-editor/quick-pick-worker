import { ViewletCommand } from '@lvce-editor/constants'
import { diffTree } from '@lvce-editor/virtual-dom-worker'
import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import { renderItemsDom } from '../RenderItems/RenderItems.ts'

export const renderIncremental = (oldState: QuickPickState, newState: QuickPickState): readonly unknown[] => {
  const oldDom = renderItemsDom(oldState)
  const newDom = renderItemsDom(newState)
  const patches = diffTree(oldDom, newDom)
  return [ViewletCommand.SetPatches, newState.uid, patches]
}

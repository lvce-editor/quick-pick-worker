import { ViewletCommand } from '@lvce-editor/constants'
import { diffTree } from '@lvce-editor/virtual-dom-worker'
import type { QuickPickViewModel } from '../QuickPickViewModel/QuickPickViewModel.ts'
import { renderItems } from '../RenderItems/RenderItems.ts'

export const renderIncremental = (newState: QuickPickViewModel): readonly unknown[] => {
  const oldDom = renderItems(newState)[1] as any // TODO
  const newDom = renderItems(newState)[1] as any
  const patches = diffTree(oldDom, newDom)
  return [ViewletCommand.SetPatches, newState.uid, patches]
}

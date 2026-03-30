import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { ViewletCommand } from '@lvce-editor/constants'
import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as CreateQuickPickViewModel from '../CreateQuickPickViewModel/CreateQuickPickViewModel.ts'
import * as GetQuickPickVirtualDom from '../GetQuickPickVirtualDom/GetQuickPickVirtualDom.ts'

export const renderItemsDom = (state: QuickPickState): readonly VirtualDomNode[] => {
  const viewModel = CreateQuickPickViewModel.createQuickPickViewModel(state, state)
  const { scrollBarHeight, scrollBarTop, visibleItems } = viewModel
  return GetQuickPickVirtualDom.getQuickPickVirtualDom(visibleItems, scrollBarHeight, scrollBarTop)
}

export const renderItems = (_oldState: QuickPickState, newState: QuickPickState): readonly unknown[] => {
  const dom = renderItemsDom(newState)
  return [ViewletCommand.SetDom2, dom]
}

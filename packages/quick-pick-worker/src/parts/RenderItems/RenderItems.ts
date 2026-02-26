import { ViewletCommand } from '@lvce-editor/constants'
import type { QuickPickViewModel } from '../QuickPickViewModel/QuickPickViewModel.ts'
import * as GetQuickPickVirtualDom from '../GetQuickPickVirtualDom/GetQuickPickVirtualDom.ts'

export const renderItems = (newState: QuickPickViewModel): readonly unknown[] => {
  const { scrollBarHeight, scrollBarTop, visibleItems } = newState
  const dom = GetQuickPickVirtualDom.getQuickPickVirtualDom(visibleItems, scrollBarHeight, scrollBarTop)
  return [ViewletCommand.SetDom2, dom]
}

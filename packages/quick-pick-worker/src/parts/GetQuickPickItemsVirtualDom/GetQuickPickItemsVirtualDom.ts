import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as GetQuickPickItemVirtualDom from '../GetQuickPickItemVirtualDom/GetQuickPickItemVirtualDom.ts'
import * as GetQuickPickNoResultsVirtualDom from '../GetQuickPickNoResultsVirtualDom/GetQuickPickNoResultsVirtualDom.ts'

export const getQuickPickItemsVirtualDom = (visibleItems: readonly VisibleItem[]): readonly VirtualDomNode[] => {
  if (visibleItems.length === 0) {
    return GetQuickPickNoResultsVirtualDom.getQuickPickNoResultsVirtualDom()
  }
  const dom = visibleItems.flatMap(GetQuickPickItemVirtualDom.getQuickPickItemVirtualDom)
  return dom
}

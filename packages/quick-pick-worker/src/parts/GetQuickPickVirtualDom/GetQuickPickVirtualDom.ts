import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as DomId from '../DomId/DomId.ts'
import * as GetQuickPickHeaderVirtualDom from '../GetQuickPickHeaderVirtualDom/GetQuickPickHeaderVirtualDom.ts'
import * as GetQuickPickItemsVirtualDom from '../GetQuickPickItemsVirtualDom/GetQuickPickItemsVirtualDom.ts'
import * as GetScrollBarVirtualDom from '../GetScrollBarVirtualDom/GetScrollBarVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as QuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'

const getRootNodeCount = (nodes: readonly VirtualDomNode[]): number => {
  let count = 0
  const remainingChildCounts: number[] = []
  for (const node of nodes) {
    while (remainingChildCounts.length > 0 && remainingChildCounts.at(-1) === 0) {
      remainingChildCounts.pop()
    }
    if (remainingChildCounts.length === 0) {
      count++
    } else {
      remainingChildCounts[remainingChildCounts.length - 1]--
    }
    remainingChildCounts.push(node.childCount)
  }
  return count
}

export const getQuickPickVirtualDom = (
  visibleItems: readonly VisibleItem[],
  scrollBarHeight: number,
  scrollBarTop: number,
): readonly VirtualDomNode[] => {
  const quickOpen = QuickPickStrings.quickOpen()
  const shouldShowScrollbar = scrollBarHeight > 0
  const quickPickItemsDom = GetQuickPickItemsVirtualDom.getQuickPickItemsVirtualDom(visibleItems)
  const listItemsChildCount = getRootNodeCount(quickPickItemsDom)
  return [
    {
      ariaLabel: quickOpen,
      childCount: 2,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.QuickPick),
      id: DomId.QuickPick,
      type: VirtualDomElements.Div,
    },
    ...GetQuickPickHeaderVirtualDom.getQuickPickHeaderVirtualDom(),
    {
      ariaActivedescendant: DomId.QuickPickItemActive,
      childCount: shouldShowScrollbar ? 2 : 1,
      className: MergeClassNames.mergeClassNames(ClassNames.List, ClassNames.ContainContent),
      id: DomId.QuickPickItems,
      onPointerDown: DomEventListenerFunctions.HandlePointerDown,
      onWheel: DomEventListenerFunctions.HandleWheel,
      role: AriaRoles.ListBox,
      type: VirtualDomElements.Div,
    },
    {
      childCount: listItemsChildCount,
      className: MergeClassNames.mergeClassNames(ClassNames.ListItems, ClassNames.ContainContent),
      type: VirtualDomElements.Div,
    },
    ...quickPickItemsDom,
    ...GetScrollBarVirtualDom.getScrollBarVirtualDom(scrollBarHeight, scrollBarTop),
  ]
}

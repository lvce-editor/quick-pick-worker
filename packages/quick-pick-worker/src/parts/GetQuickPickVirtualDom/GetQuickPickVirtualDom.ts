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

export const getQuickPickVirtualDom = (
  visibleItems: readonly VisibleItem[],
  scrollBarHeight: number,
  scrollBarTop: number,
): readonly VirtualDomNode[] => {
  const quickOpen = QuickPickStrings.quickOpen()
  const shouldShowScrollbar = scrollBarHeight > 0
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
      childCount: visibleItems.length,
      className: MergeClassNames.mergeClassNames(ClassNames.ListItems, ClassNames.ContainContent),
      type: VirtualDomElements.Div,
    },
    ...GetQuickPickItemsVirtualDom.getQuickPickItemsVirtualDom(visibleItems),
    ...GetScrollBarVirtualDom.getScrollBarVirtualDom(scrollBarHeight, scrollBarTop),
  ]
}

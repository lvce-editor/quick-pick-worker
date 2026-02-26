import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as Px from '../Px/Px.ts'

export const getScrollBarVirtualDom = (scrollBarHeight: number, scrollBarTop: number): readonly VirtualDomNode[] => {
  const shouldShowScrollbar = scrollBarHeight > 0
  if (!shouldShowScrollbar) {
    return []
  }
  const heightString = Px.px(scrollBarHeight)
  const translateString = Px.position(0, scrollBarTop)
  return [
    {
      childCount: 1,
      className: MergeClassNames.mergeClassNames(ClassNames.ScrollBar, ClassNames.ScrollBarSmall),
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.ScrollBarThumb,
      height: heightString,
      translate: translateString,
      type: VirtualDomElements.Div,
    },
  ]
}

import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetScrollBarVirtualDom from '../src/parts/GetScrollBarVirtualDom/GetScrollBarVirtualDom.ts'
import * as MergeClassNames from '../src/parts/MergeClassNames/MergeClassNames.ts'
import * as Px from '../src/parts/Px/Px.ts'

test('getScrollBarVirtualDom with no scrollbar needed', () => {
  const scrollBarHeight = 0
  const scrollBarTop = 20
  const result = GetScrollBarVirtualDom.getScrollBarVirtualDom(scrollBarHeight, scrollBarTop)
  expect(result).toEqual([])
})

test('getScrollBarVirtualDom with scrollbar', () => {
  const scrollBarHeight = 100
  const scrollBarTop = 20
  const result = GetScrollBarVirtualDom.getScrollBarVirtualDom(scrollBarHeight, scrollBarTop)
  expect(result).toEqual([
    {
    childCount: 1,
    className: MergeClassNames.mergeClassNames(ClassNames.ScrollBar, ClassNames.ScrollBarSmall),
    type: VirtualDomElements.Div,
    },
    {
    childCount: 0,
    className: ClassNames.ScrollBarThumb,
    height: Px.px(scrollBarHeight),
    translate: Px.position(0, scrollBarTop),
    type: VirtualDomElements.Div,
    },
  ])
})

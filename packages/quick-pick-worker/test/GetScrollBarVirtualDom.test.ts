import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetScrollBarVirtualDom from '../src/parts/GetScrollBarVirtualDom/GetScrollBarVirtualDom.ts'

test.skip('getScrollBarVirtualDom with no scrollbar needed', () => {
  const scrollBarHeight = 0
  const scrollBarTop = 20
  const result = GetScrollBarVirtualDom.getScrollBarVirtualDom(scrollBarHeight, scrollBarTop)
  expect(result).toEqual([])
})

test.skip('getScrollBarVirtualDom with scrollbar', () => {
  const scrollBarHeight = 100
  const scrollBarTop = 20
  const result = GetScrollBarVirtualDom.getScrollBarVirtualDom(scrollBarHeight, scrollBarTop)
  expect(result.length).toBe(2)
  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.QuickPickScrollbar,
    style: 'height: 100px;',
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    className: ClassNames.QuickPickScrollbarSlider,
    style: expect.stringContaining('height:'),
    type: VirtualDomElements.Div,
  })
})

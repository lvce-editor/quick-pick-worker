import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetQuickPickNoResultsVirtualDom from '../src/parts/GetQuickPickNoResultsVirtualDom/GetQuickPickNoResultsVirtualDom.ts'
import * as QuickPickStrings from '../src/parts/QuickPickStrings/QuickPickStrings.ts'

test('getQuickPickNoResultsVirtualDom', () => {
  const result = GetQuickPickNoResultsVirtualDom.getQuickPickNoResultsVirtualDom()

  expect(result).toEqual([
    {
      childCount: 1,
      className: 'QuickPickItem QuickPickItemActive QuickPickStatus',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.Label,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: QuickPickStrings.noResults(),
      type: 12,
    },
  ])
})

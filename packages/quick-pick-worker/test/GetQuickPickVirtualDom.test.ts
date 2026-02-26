import { expect, test } from '@jest/globals'
import * as GetQuickPickVirtualDom from '../src/parts/GetQuickPickVirtualDom/GetQuickPickVirtualDom.ts'

test('getQuickPickVirtualDom with empty items', () => {
  const scrollBarHeight = 0
  const scrollBarTop = 0
  const result = GetQuickPickVirtualDom.getQuickPickVirtualDom([], scrollBarHeight, scrollBarTop)
  expect(result).toEqual([
    { ariaLabel: 'Quick open', childCount: 2, className: 'Viewlet QuickPick', id: 'QuickPick', type: 4 },
    { childCount: 1, className: 'QuickPickHeader', type: 4 },
    {
      ariaAutoComplete: 'list',
      ariaExpanded: true,
      ariaLabel: 'Type the name of a command to run.',
      autocapitalize: 'off',
      autocomplete: 'off',
      childCount: 0,
      className: 'InputBox',
      inputType: 'text',
      name: 'QuickPickInput',
      onBeforeInput: 'handleBeforeInput',
      onBlur: 'handleBlur',
      onFocus: 'handleFocus',
      onInput: 'handleInput',
      role: 'combobox',
      spellcheck: false,
      type: 6,
    },
    {
      ariaActivedescendant: 'QuickPickItemActive',
      childCount: 1,
      className: 'List ContainContent',
      id: 'QuickPickItems',
      onPointerDown: 'handlePointerDown',
      onWheel: 'handleWheel',
      role: 'listbox',
      type: 4,
    },
    {
      childCount: 0,
      className: 'ListItems ContainContent',
      type: 4,
    },
    { childCount: 1, className: 'QuickPickItem QuickPickItemActive QuickPickStatus', type: 4 },
    { childCount: 1, className: 'Label', type: 4 },
    { childCount: 0, text: 'No Results', type: 12 },
  ])
})

test('getQuickPickVirtualDom with scrollbar', () => {
  const visibleItems = [
    {
      description: '',
      fileIcon: '',
      highlights: [],
      icon: '',
      isActive: true,
      label: 'item 1',
      posInSet: 1,
      setSize: 15,
    },
  ]
  const scrollBarHeight = 15
  const scrollBarTop = 0
  const result = GetQuickPickVirtualDom.getQuickPickVirtualDom(visibleItems, scrollBarHeight, scrollBarTop)
  expect(result).toBeDefined()
})

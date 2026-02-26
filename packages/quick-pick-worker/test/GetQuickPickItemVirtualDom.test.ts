import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleItem } from '../src/parts/VisibleItem/VisibleItem.ts'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetQuickPickItemVirtualDom from '../src/parts/GetQuickPickItemVirtualDom/GetQuickPickItemVirtualDom.ts'

test('creates basic quick pick item virtual dom', () => {
  const visibleItem: VisibleItem = {
    description: '',
    fileIcon: '',
    highlights: [],
    icon: '',
    isActive: false,
    label: 'test-label',
    posInSet: 1,
    setSize: 10,
  }
  const dom = GetQuickPickItemVirtualDom.getQuickPickItemVirtualDom(visibleItem)
  expect(dom).toEqual([
    {
      ariaPosInSet: 1,
      ariaSetSize: 10,
      childCount: 1,
      className: ClassNames.QuickPickItem,
      role: AriaRoles.Option,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.QuickPickItemLabel,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'test-label',
      type: 12,
    },
  ])
})

test('handles active item', () => {
  const visibleItem: VisibleItem = {
    description: '',
    fileIcon: '',
    highlights: [],
    icon: '',
    isActive: true,
    label: 'test-label',
    posInSet: 1,
    setSize: 10,
  }
  const dom = GetQuickPickItemVirtualDom.getQuickPickItemVirtualDom(visibleItem)
  expect(dom).toEqual([
    {
      ariaPosInSet: 1,
      ariaSetSize: 10,
      childCount: 1,
      className: `${ClassNames.QuickPickItem} ${ClassNames.QuickPickItemActive}`,
      id: 'QuickPickItemActive',
      role: AriaRoles.Option,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.QuickPickItemLabel,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'test-label',
      type: 12,
    },
  ])
})

test('adds mask icon when specified', () => {
  const visibleItem: VisibleItem = {
    description: '',
    fileIcon: '',
    highlights: [],
    icon: 'TestIcon',
    isActive: false,
    label: 'test-label',
    posInSet: 1,
    setSize: 10,
  }
  const dom = GetQuickPickItemVirtualDom.getQuickPickItemVirtualDom(visibleItem)
  expect(dom).toEqual([
    {
      ariaPosInSet: 1,
      ariaSetSize: 10,
      childCount: 2,
      className: ClassNames.QuickPickItem,
      role: AriaRoles.Option,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: 'QuickPickMaskIcon MaskIcon MaskIconTestIcon',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.QuickPickItemLabel,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'test-label',
      type: 12,
    },
  ])
})

test('adds description when specified', () => {
  const visibleItem: VisibleItem = {
    description: 'test-description',
    fileIcon: '',
    highlights: [],
    icon: '',
    isActive: false,
    label: 'test-label',
    posInSet: 1,
    setSize: 10,
  }
  const dom = GetQuickPickItemVirtualDom.getQuickPickItemVirtualDom(visibleItem)
  expect(dom).toEqual([
    {
      ariaPosInSet: 1,
      ariaSetSize: 10,
      childCount: 2,
      className: ClassNames.QuickPickItem,
      role: AriaRoles.Option,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.QuickPickItemLabel,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'test-label',
      type: 12,
    },
    {
      childCount: 1,
      className: ClassNames.QuickPickItemDescription,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'test-description',
      type: 12,
    },
  ])
})

test('adds highlights for matched text', () => {
  const visibleItem: VisibleItem = {
    description: '',
    fileIcon: '',
    highlights: [
      {
        highlighted: true,
        text: 'test',
      },
      {
        highlighted: false,
        text: '-label',
      },
    ],
    icon: '',
    isActive: false,
    label: 'test-label',
    posInSet: 1,
    setSize: 10,
  }
  const dom = GetQuickPickItemVirtualDom.getQuickPickItemVirtualDom(visibleItem)
  expect(dom).toEqual([
    {
      ariaPosInSet: 1,
      ariaSetSize: 10,
      childCount: 1,
      className: ClassNames.QuickPickItem,
      role: AriaRoles.Option,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: ClassNames.QuickPickItemLabel,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.QuickPickHighlight,
      type: VirtualDomElements.Span,
    },
    {
      childCount: 0,
      text: 'test',
      type: 12,
    },
    {
      childCount: 0,
      text: '-label',
      type: 12,
    },
  ])
})

import { expect, test } from '@jest/globals'
import type { QuickPickViewModel } from '../src/parts/QuickPickViewModel/QuickPickViewModel.ts'
import * as RenderItems from '../src/parts/RenderItems/RenderItems.ts'

test('renders items with virtual dom', () => {
  const newState: QuickPickViewModel = {
    cursorOffset: 0,
    focused: false,
    height: 0,
    newFocusedIndex: 0,
    oldFocusedIndex: 0,
    scrollBarHeight: 0,
    scrollBarTop: 0,
    uid: 1,
    value: '',
    visibleItems: [
      {
        description: 'desc 1',
        fileIcon: '/test/icon.png',
        highlights: [],
        icon: '',
        isActive: true,
        label: 'item 1',
        posInSet: 1,
        setSize: 2,
      },
    ],
  }
  const result = RenderItems.renderItems(newState)
  expect(result[0]).toBe('Viewlet.setDom2')
  expect(result[1]).toBeDefined()
})

test('renders empty items state', () => {
  const newState: QuickPickViewModel = {
    cursorOffset: 0,
    focused: false,
    height: 0,
    newFocusedIndex: 0,
    oldFocusedIndex: 0,
    scrollBarHeight: 0,
    scrollBarTop: 0,
    uid: 1,
    value: '',
    visibleItems: [],
  }
  const result = RenderItems.renderItems(newState)
  expect(result[0]).toBe('Viewlet.setDom2')
  expect(result[1]).toBeDefined()
})

test('renders items with scroll bar', () => {
  const newState: QuickPickViewModel = {
    cursorOffset: 0,
    focused: false,
    height: 0,
    newFocusedIndex: 0,
    oldFocusedIndex: 0,
    scrollBarHeight: 100,
    scrollBarTop: 50,
    uid: 1,
    value: '',
    visibleItems: [
      {
        description: 'desc 1',
        fileIcon: '/test/icon.png',
        highlights: [],
        icon: '',
        isActive: true,
        label: 'item 1',
        posInSet: 1,
        setSize: 2,
      },
    ],
  }
  const result = RenderItems.renderItems(newState)
  expect(result[0]).toBe('Viewlet.setDom2')
  expect(result[1]).toBeDefined()
})

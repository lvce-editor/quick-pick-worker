import { expect, test } from '@jest/globals'
import type { QuickPickViewModel } from '../src/parts/QuickPickViewModel/QuickPickViewModel.ts'
import * as RenderHeight from '../src/parts/RenderHeight/RenderHeight.ts'
import * as RenderMethod from '../src/parts/RenderMethod/RenderMethod.ts'

test('renders height', () => {
  const state: QuickPickViewModel = {
    cursorOffset: 0,
    focused: false,
    height: 100,
    newFocusedIndex: 0,
    oldFocusedIndex: 0,
    scrollBarHeight: 0,
    scrollBarTop: 0,
    uid: 1,
    value: '',
    visibleItems: [],
  }
  expect(RenderHeight.renderHeight(state)).toEqual(['Viewlet.send', 1, RenderMethod.SetItemsHeight, 100])
})

test('renders default height when height is 0', () => {
  const state: QuickPickViewModel = {
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
  expect(RenderHeight.renderHeight(state)).toEqual(['Viewlet.send', 1, RenderMethod.SetItemsHeight, 20])
})

test('handles different uid', () => {
  const state: QuickPickViewModel = {
    cursorOffset: 0,
    focused: false,
    height: 200,
    newFocusedIndex: 0,
    oldFocusedIndex: 0,
    scrollBarHeight: 0,
    scrollBarTop: 0,
    uid: 2,
    value: '',
    visibleItems: [],
  }
  expect(RenderHeight.renderHeight(state)).toEqual(['Viewlet.send', 2, RenderMethod.SetItemsHeight, 200])
})

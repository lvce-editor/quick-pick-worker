import { expect, test } from '@jest/globals'
import type { QuickPickViewModel } from '../src/parts/QuickPickViewModel/QuickPickViewModel.ts'
import * as RenderCursorOffset from '../src/parts/RenderCursorOffset/RenderCursorOffset.ts'
import * as RenderMethod from '../src/parts/RenderMethod/RenderMethod.ts'

test('renders cursor offset', () => {
  const state: QuickPickViewModel = {
    cursorOffset: 5,
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

  expect(RenderCursorOffset.renderCursorOffset(state)).toEqual(['Viewlet.send', 1, RenderMethod.SetCursorOffset, 5])
})

test('renders cursor offset of 0', () => {
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

  expect(RenderCursorOffset.renderCursorOffset(state)).toEqual(['Viewlet.send', 1, RenderMethod.SetCursorOffset, 0])
})

test('handles different uid', () => {
  const state: QuickPickViewModel = {
    cursorOffset: 10,
    focused: false,
    height: 0,
    newFocusedIndex: 0,
    oldFocusedIndex: 0,
    scrollBarHeight: 0,
    scrollBarTop: 0,
    uid: 2,
    value: '',
    visibleItems: [],
  }

  expect(RenderCursorOffset.renderCursorOffset(state)).toEqual(['Viewlet.send', 2, RenderMethod.SetCursorOffset, 10])
})

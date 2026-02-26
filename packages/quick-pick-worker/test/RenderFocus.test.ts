import { test, expect } from '@jest/globals'
import type { QuickPickViewModel } from '../src/parts/QuickPickViewModel/QuickPickViewModel.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as RenderFocus from '../src/parts/RenderFocus/RenderFocus.ts'

test('renderFocus', () => {
  const viewModel: QuickPickViewModel = {
    cursorOffset: 0,
    focused: true,
    height: 300,
    newFocusedIndex: 0,
    oldFocusedIndex: 0,
    scrollBarHeight: 0,
    scrollBarTop: 0,
    uid: 1,
    value: '',
    visibleItems: [],
  }

  const result = RenderFocus.renderFocus(viewModel)

  expect(result).toEqual(['Viewlet.focusElementByName', InputName.QuickPickInput])
})

test('renders focus when focused is true', () => {
  const viewModel: QuickPickViewModel = {
    cursorOffset: 0,
    focused: true,
    height: 300,
    newFocusedIndex: 0,
    oldFocusedIndex: 0,
    scrollBarHeight: 0,
    scrollBarTop: 0,
    uid: 1,
    value: '',
    visibleItems: [],
  }

  const result = RenderFocus.renderFocus(viewModel)

  expect(result).toEqual(['Viewlet.focusElementByName', InputName.QuickPickInput])
})

test('renders focus when focused is false', () => {
  const viewModel: QuickPickViewModel = {
    cursorOffset: 0,
    focused: false,
    height: 300,
    newFocusedIndex: 0,
    oldFocusedIndex: 0,
    scrollBarHeight: 0,
    scrollBarTop: 0,
    uid: 1,
    value: '',
    visibleItems: [],
  }

  const result = RenderFocus.renderFocus(viewModel)

  expect(result).toEqual(['Viewlet.focusElementByName', InputName.QuickPickInput])
})

test('handles different uid', () => {
  const viewModel: QuickPickViewModel = {
    cursorOffset: 0,
    focused: true,
    height: 300,
    newFocusedIndex: 0,
    oldFocusedIndex: 0,
    scrollBarHeight: 0,
    scrollBarTop: 0,
    uid: 2,
    value: '',
    visibleItems: [],
  }

  const result = RenderFocus.renderFocus(viewModel)

  expect(result).toEqual(['Viewlet.focusElementByName', InputName.QuickPickInput])
})

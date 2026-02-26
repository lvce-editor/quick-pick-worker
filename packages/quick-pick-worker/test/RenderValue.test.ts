import { expect, test } from '@jest/globals'
import type { QuickPickViewModel } from '../src/parts/QuickPickViewModel/QuickPickViewModel.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as RenderValue from '../src/parts/RenderValue/RenderValue.ts'

test('renders value', () => {
  const state: QuickPickViewModel = {
    cursorOffset: 0,
    focused: false,
    height: 0,
    newFocusedIndex: 0,
    oldFocusedIndex: 0,
    scrollBarHeight: 0,
    scrollBarTop: 0,
    uid: 1,
    value: 'test value',
    visibleItems: [],
  }

  expect(RenderValue.renderValue(state)).toEqual(['Viewlet.setValueByName', InputName.QuickPickInput, 'test value'])
})

test('renders empty value', () => {
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

  expect(RenderValue.renderValue(state)).toEqual(['Viewlet.setValueByName', InputName.QuickPickInput, ''])
})

test('handles different values', () => {
  const state: QuickPickViewModel = {
    cursorOffset: 0,
    focused: false,
    height: 0,
    newFocusedIndex: 0,
    oldFocusedIndex: 0,
    scrollBarHeight: 0,
    scrollBarTop: 0,
    uid: 1,
    value: 'another value',
    visibleItems: [],
  }

  expect(RenderValue.renderValue(state)).toEqual(['Viewlet.setValueByName', InputName.QuickPickInput, 'another value'])
})

test('handles special characters in value', () => {
  const state: QuickPickViewModel = {
    cursorOffset: 0,
    focused: false,
    height: 0,
    newFocusedIndex: 0,
    oldFocusedIndex: 0,
    scrollBarHeight: 0,
    scrollBarTop: 0,
    uid: 1,
    value: 'test@example.com',
    visibleItems: [],
  }

  expect(RenderValue.renderValue(state)).toEqual(['Viewlet.setValueByName', InputName.QuickPickInput, 'test@example.com'])
})

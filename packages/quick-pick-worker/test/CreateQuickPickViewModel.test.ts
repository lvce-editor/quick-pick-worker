import { expect, test } from '@jest/globals'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as CreateQuickPickViewModel from '../src/parts/CreateQuickPickViewModel/CreateQuickPickViewModel.ts'

test('creates view model with empty states', () => {
  const oldState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
  }
  const newState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
  }
  const viewModel = CreateQuickPickViewModel.createQuickPickViewModel(oldState, newState)
  expect(viewModel.cursorOffset).toBe(0)
  expect(viewModel.focused).toBe(false)
  expect(viewModel.height).toBe(300)
  expect(viewModel.newFocusedIndex).toBe(-1)
  expect(viewModel.oldFocusedIndex).toBe(-1)
  expect(viewModel.scrollBarHeight).toBe(0)
  expect(typeof viewModel.scrollBarTop).toBe('number')
  expect(viewModel.uid).toBe(1)
  expect(viewModel.value).toBe('')
  expect(viewModel.visibleItems).toEqual([])
})

test('creates view model with items', () => {
  const items = [
    {
      description: 'desc 1',
      direntType: 0,
      fileIcon: '',
      icon: '',
      label: 'item 1',
      matches: [],
      uri: 'uri1',
    },
    {
      description: 'desc 2',
      direntType: 0,
      fileIcon: '',
      icon: '',
      label: 'item 2',
      matches: [],
      uri: 'uri2',
    },
  ]
  const oldState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    items,
  }
  const newState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    icons: ['icon1', 'icon2'],
    items,
    maxLineY: 2,
    minLineY: 0,
  }
  const viewModel = CreateQuickPickViewModel.createQuickPickViewModel(oldState, newState)
  expect(viewModel.visibleItems).toHaveLength(2)
  expect(viewModel.newFocusedIndex).toBe(0)
  expect(viewModel.oldFocusedIndex).toBe(-1)
  expect(viewModel.visibleItems[0].isActive).toBe(true)
  expect(viewModel.visibleItems[1].isActive).toBe(false)
})

test('calculates focused indices correctly', () => {
  const oldState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 5,
    minLineY: 2,
  }
  const newState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 8,
    minLineY: 3,
  }
  const viewModel = CreateQuickPickViewModel.createQuickPickViewModel(oldState, newState)
  expect(viewModel.oldFocusedIndex).toBe(3)
  expect(viewModel.newFocusedIndex).toBe(5)
})

test('calculates scroll bar height when content exceeds list height', () => {
  const items = Array.from({ length: 20 }, (_, i) => ({
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: `item ${i}`,
    matches: [],
    uri: `uri${i}`,
  }))
  const oldState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    items,
  }
  const newState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    height: 300,
    itemHeight: 30,
    items,
    minimumSliderSize: 20,
  }
  const viewModel = CreateQuickPickViewModel.createQuickPickViewModel(oldState, newState)
  expect(viewModel.scrollBarHeight).toBeGreaterThan(0)
})

test('calculates scroll bar height as 0 when content fits', () => {
  const items = Array.from({ length: 5 }, (_, i) => ({
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: `item ${i}`,
    matches: [],
    uri: `uri${i}`,
  }))
  const oldState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    items,
  }
  const newState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    height: 300,
    itemHeight: 30,
    items,
  }
  const viewModel = CreateQuickPickViewModel.createQuickPickViewModel(oldState, newState)
  expect(viewModel.scrollBarHeight).toBe(0)
})

test('calculates scroll bar top position', () => {
  const oldState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
  }
  const newState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 100,
    finalDeltaY: 200,
    headerHeight: 38,
    height: 300,
    scrollBarHeight: 50,
  }
  const viewModel = CreateQuickPickViewModel.createQuickPickViewModel(oldState, newState)
  expect(viewModel.scrollBarTop).toBeGreaterThanOrEqual(0)
  expect(typeof viewModel.scrollBarTop).toBe('number')
})

test('rounds scroll bar top position', () => {
  const oldState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
  }
  const newState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 50,
    finalDeltaY: 100,
    headerHeight: 38,
    height: 300,
    scrollBarHeight: 40,
  }
  const viewModel = CreateQuickPickViewModel.createQuickPickViewModel(oldState, newState)
  expect(Number.isInteger(viewModel.scrollBarTop)).toBe(true)
})

test('preserves state properties in view model', () => {
  const oldState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
  }
  const newState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    cursorOffset: 5,
    focused: true,
    height: 400,
    uid: 2,
    value: 'test value',
  }
  const viewModel = CreateQuickPickViewModel.createQuickPickViewModel(oldState, newState)
  expect(viewModel.cursorOffset).toBe(5)
  expect(viewModel.focused).toBe(true)
  expect(viewModel.height).toBe(400)
  expect(viewModel.uid).toBe(2)
  expect(viewModel.value).toBe('test value')
})

test('handles visible items with different minLineY and maxLineY', () => {
  const items = Array.from({ length: 10 }, (_, i) => ({
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: `item ${i}`,
    matches: [],
    uri: `uri${i}`,
  }))
  const oldState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    items,
  }
  const newState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 5,
    icons: Array.from({ length: 10 }, (_, i) => `icon${i}`),
    items,
    maxLineY: 7,
    minLineY: 3,
  }
  const viewModel = CreateQuickPickViewModel.createQuickPickViewModel(oldState, newState)
  expect(viewModel.visibleItems).toHaveLength(4)
  expect(viewModel.newFocusedIndex).toBe(2)
})

test('handles focused item in visible range', () => {
  const items = Array.from({ length: 10 }, (_, i) => ({
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: `item ${i}`,
    matches: [],
    uri: `uri${i}`,
  }))
  const oldState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    items,
  }
  const newState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 4,
    icons: Array.from({ length: 10 }, (_, i) => `icon${i}`),
    items,
    maxLineY: 5,
    minLineY: 0,
  }
  const viewModel = CreateQuickPickViewModel.createQuickPickViewModel(oldState, newState)
  expect(viewModel.visibleItems[4].isActive).toBe(true)
})

test('handles empty items array', () => {
  const oldState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
  }
  const newState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    items: [],
  }
  const viewModel = CreateQuickPickViewModel.createQuickPickViewModel(oldState, newState)
  expect(viewModel.visibleItems).toEqual([])
  expect(viewModel.scrollBarHeight).toBe(0)
})

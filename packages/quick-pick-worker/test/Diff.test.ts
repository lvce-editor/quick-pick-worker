import { expect, test } from '@jest/globals'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as Diff from '../src/parts/Diff/Diff.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

const createState = (overrides: Partial<QuickPickState> = {}): QuickPickState => {
  return {
    ...CreateDefaultState.createDefaultState(),
    ...overrides,
  }
}

const createItem = (label: string): ProtoVisibleItem => {
  return {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label,
    matches: [],
    uri: `/${label}`,
  }
}

test('diff returns empty array when all modules return true', () => {
  const items: readonly ProtoVisibleItem[] = []
  const oldState = createState({
    focusedIndex: 0,
    items,
    maxLineY: 0,
    minLineY: 0,
  })
  const newState = createState({
    focusedIndex: 0,
    items,
    maxLineY: 0,
    minLineY: 0,
  })
  const result = Diff.diff(oldState, newState)
  expect(result).toEqual([])
})

test('diff returns Height when items length differs', () => {
  const oldState = createState({
    items: [createItem('item1')],
  })
  const newState = createState({
    items: [createItem('item1'), createItem('item2')],
  })
  const result = Diff.diff(oldState, newState)
  expect(result).toContain(DiffType.Height)
})

test('diff returns RenderItems when items differ', () => {
  const oldState = createState({
    focusedIndex: 0,
    items: [createItem('item1')],
    maxLineY: 1,
    minLineY: 0,
  })
  const newState = createState({
    focusedIndex: 0,
    items: [createItem('item2')],
    maxLineY: 1,
    minLineY: 0,
  })
  const result = Diff.diff(oldState, newState)
  expect(result).toContain(DiffType.RenderItems)
})

test('diff returns RenderValue when value differs', () => {
  const oldState = createState({
    inputSource: InputSource.Script,
    value: 'old',
  })
  const newState = createState({
    inputSource: InputSource.Script,
    value: 'new',
  })
  const result = Diff.diff(oldState, newState)
  expect(result).toContain(DiffType.RenderValue)
})

test('diff returns RenderFocusedIndex when focusedIndex differs', () => {
  const oldState = createState({
    focusedIndex: 0,
  })
  const newState = createState({
    focusedIndex: 1,
  })
  const result = Diff.diff(oldState, newState)
  expect(result).toContain(DiffType.RenderFocusedIndex)
})

test('diff returns RenderFocus when focused differs', () => {
  const oldState = createState({
    focused: false,
  })
  const newState = createState({
    focused: true,
  })
  const result = Diff.diff(oldState, newState)
  expect(result).toContain(DiffType.RenderFocus)
})

test('diff returns multiple diff types when multiple properties differ', () => {
  const oldState = createState({
    focused: false,
    focusedIndex: 0,
    inputSource: InputSource.Script,
    value: 'old',
  })
  const newState = createState({
    focused: true,
    focusedIndex: 1,
    inputSource: InputSource.Script,
    value: 'new',
  })
  const result = Diff.diff(oldState, newState)
  expect(result).toContain(DiffType.RenderFocus)
  expect(result).toContain(DiffType.RenderFocusedIndex)
  expect(result).toContain(DiffType.RenderValue)
  expect(result.length).toBeGreaterThanOrEqual(3)
})

test('diff returns Height and RenderItems when items length and content differ', () => {
  const oldState = createState({
    focusedIndex: 0,
    items: [createItem('item1')],
    maxLineY: 1,
    minLineY: 0,
  })
  const newState = createState({
    focusedIndex: 0,
    items: [createItem('item2'), createItem('item3')],
    maxLineY: 2,
    minLineY: 0,
  })
  const result = Diff.diff(oldState, newState)
  expect(result).toContain(DiffType.Height)
  expect(result).toContain(DiffType.RenderItems)
})

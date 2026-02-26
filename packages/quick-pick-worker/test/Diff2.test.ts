import { expect, test } from '@jest/globals'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as Diff2 from '../src/parts/Diff2/Diff2.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as QuickPickStates from '../src/parts/QuickPickStates/QuickPickStates.ts'

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

test('diff2 returns empty array when oldState equals newState', () => {
  const uid = 1
  const items: readonly ProtoVisibleItem[] = []
  const state = createState({
    focusedIndex: 0,
    items,
    maxLineY: 0,
    minLineY: 0,
  })
  QuickPickStates.set(uid, state, state)
  const result = Diff2.diff2(uid)
  expect(result).toEqual([])
})

test('diff2 returns diff result when states differ', () => {
  const uid = 2
  const oldState = createState({
    focused: false,
  })
  const newState = createState({
    focused: true,
  })
  QuickPickStates.set(uid, oldState, newState)
  const result = Diff2.diff2(uid)
  expect(result).toContain(DiffType.RenderFocus)
})

test('diff2 returns RenderFocusedIndex when focusedIndex differs', () => {
  const uid = 3
  const oldState = createState({
    focusedIndex: 0,
  })
  const newState = createState({
    focusedIndex: 1,
  })
  QuickPickStates.set(uid, oldState, newState)
  const result = Diff2.diff2(uid)
  expect(result).toContain(DiffType.RenderFocusedIndex)
})

test('diff2 returns RenderValue when value differs', () => {
  const uid = 4
  const oldState = createState({
    inputSource: InputSource.Script,
    value: 'old',
  })
  const newState = createState({
    inputSource: InputSource.Script,
    value: 'new',
  })
  QuickPickStates.set(uid, oldState, newState)
  const result = Diff2.diff2(uid)
  expect(result).toContain(DiffType.RenderValue)
})

test('diff2 returns RenderItems when items differ', () => {
  const uid = 5
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
  QuickPickStates.set(uid, oldState, newState)
  const result = Diff2.diff2(uid)
  expect(result).toContain(DiffType.RenderItems)
})

test('diff2 returns Height when items length differs', () => {
  const uid = 6
  const oldState = createState({
    items: [createItem('item1')],
  })
  const newState = createState({
    items: [createItem('item1'), createItem('item2')],
  })
  QuickPickStates.set(uid, oldState, newState)
  const result = Diff2.diff2(uid)
  expect(result).toContain(DiffType.Height)
})

test('diff2 returns multiple diff types when multiple properties differ', () => {
  const uid = 7
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
  QuickPickStates.set(uid, oldState, newState)
  const result = Diff2.diff2(uid)
  expect(result).toContain(DiffType.RenderFocus)
  expect(result).toContain(DiffType.RenderFocusedIndex)
  expect(result).toContain(DiffType.RenderValue)
  expect(result.length).toBeGreaterThanOrEqual(3)
})

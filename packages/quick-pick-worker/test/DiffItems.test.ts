import { expect, test } from '@jest/globals'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffItems from '../src/parts/DiffItems/DiffItems.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'

const createState = ({
  focusedIndex,
  items,
  maxLineY,
  minLineY,
}: {
  items: readonly ProtoVisibleItem[]
  minLineY: number
  maxLineY: number
  focusedIndex: number
}): QuickPickState => {
  return {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex,
    items,
    maxLineY,
    minLineY,
  }
}

const items1: readonly ProtoVisibleItem[] = [
  {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: 'item1',
    matches: [],
    uri: '/item1',
  },
]
const items2: readonly ProtoVisibleItem[] = [
  {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: 'item2',
    matches: [],
    uri: '/item2',
  },
]

test('diffType is RenderItems', () => {
  expect(DiffItems.diffType).toBe(DiffType.RenderItems)
})

test('isEqual returns true when all properties are the same', () => {
  const oldState = createState({
    focusedIndex: 0,
    items: items1,
    maxLineY: 1,
    minLineY: 0,
  })
  const newState = createState({
    focusedIndex: 0,
    items: items1,
    maxLineY: 1,
    minLineY: 0,
  })
  expect(DiffItems.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns false when items differ', () => {
  const oldState = createState({
    focusedIndex: 0,
    items: items1,
    maxLineY: 1,
    minLineY: 0,
  })
  const newState = createState({
    focusedIndex: 0,
    items: items2,
    maxLineY: 1,
    minLineY: 0,
  })
  expect(DiffItems.isEqual(oldState, newState)).toBe(false)
})

test('isEqual returns false when minLineY differs', () => {
  const oldState = createState({
    focusedIndex: 0,
    items: items1,
    maxLineY: 1,
    minLineY: 0,
  })
  const newState = createState({
    focusedIndex: 0,
    items: items1,
    maxLineY: 1,
    minLineY: 1,
  })
  expect(DiffItems.isEqual(oldState, newState)).toBe(false)
})

test('isEqual returns false when maxLineY differs', () => {
  const oldState = createState({
    focusedIndex: 0,
    items: items1,
    maxLineY: 1,
    minLineY: 0,
  })
  const newState = createState({
    focusedIndex: 0,
    items: items1,
    maxLineY: 2,
    minLineY: 0,
  })
  expect(DiffItems.isEqual(oldState, newState)).toBe(false)
})

test('isEqual returns false when focusedIndex differs', () => {
  const oldState = createState({
    focusedIndex: 0,
    items: items1,
    maxLineY: 1,
    minLineY: 0,
  })
  const newState = createState({
    focusedIndex: 1,
    items: items1,
    maxLineY: 1,
    minLineY: 0,
  })
  expect(DiffItems.isEqual(oldState, newState)).toBe(false)
})

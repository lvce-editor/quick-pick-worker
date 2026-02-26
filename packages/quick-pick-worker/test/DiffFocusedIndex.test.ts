import { expect, test } from '@jest/globals'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffFocusedIndex from '../src/parts/DiffFocusedIndex/DiffFocusedIndex.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'

const createState = (focusedIndex: number): QuickPickState => {
  return {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex,
  }
}

test('diffType is RenderFocusedIndex', () => {
  expect(DiffFocusedIndex.diffType).toBe(DiffType.RenderFocusedIndex)
})

test('isEqual returns true when focusedIndex is the same', () => {
  const oldState = createState(0)
  const newState = createState(0)
  expect(DiffFocusedIndex.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns true when both are -1', () => {
  const oldState = createState(-1)
  const newState = createState(-1)
  expect(DiffFocusedIndex.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns true when both are positive', () => {
  const oldState = createState(5)
  const newState = createState(5)
  expect(DiffFocusedIndex.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns false when focusedIndex differs', () => {
  const oldState = createState(0)
  const newState = createState(1)
  expect(DiffFocusedIndex.isEqual(oldState, newState)).toBe(false)
})

test('isEqual returns false when one is -1 and other is not', () => {
  const oldState = createState(-1)
  const newState = createState(0)
  expect(DiffFocusedIndex.isEqual(oldState, newState)).toBe(false)
})

import { expect, test } from '@jest/globals'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffHeight from '../src/parts/DiffHeight/DiffHeight.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'

const createState = (itemsLength: number): QuickPickState => {
  return {
    ...CreateDefaultState.createDefaultState(),
    items: Array(itemsLength).fill(null),
  }
}

test('diffType is Height', () => {
  expect(DiffHeight.diffType).toBe(DiffType.Height)
})

test('isEqual returns true when items length is the same', () => {
  const oldState = createState(0)
  const newState = createState(0)
  expect(DiffHeight.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns true when both have same non-zero length', () => {
  const oldState = createState(5)
  const newState = createState(5)
  expect(DiffHeight.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns false when items length differs', () => {
  const oldState = createState(0)
  const newState = createState(1)
  expect(DiffHeight.isEqual(oldState, newState)).toBe(false)
})

test('isEqual returns false when items length differs reversed', () => {
  const oldState = createState(5)
  const newState = createState(3)
  expect(DiffHeight.isEqual(oldState, newState)).toBe(false)
})

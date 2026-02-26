import { expect, test } from '@jest/globals'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffFocus from '../src/parts/DiffFocus/DiffFocus.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'

const createState = (focused: boolean): QuickPickState => {
  return {
    ...CreateDefaultState.createDefaultState(),
    focused,
  }
}

test('diffType is RenderFocus', () => {
  expect(DiffFocus.diffType).toBe(DiffType.RenderFocus)
})

test('isEqual returns true when focused is the same', () => {
  const oldState = createState(true)
  const newState = createState(true)
  expect(DiffFocus.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns true when both are false', () => {
  const oldState = createState(false)
  const newState = createState(false)
  expect(DiffFocus.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns false when focused differs', () => {
  const oldState = createState(true)
  const newState = createState(false)
  expect(DiffFocus.isEqual(oldState, newState)).toBe(false)
})

test('isEqual returns false when focused differs reversed', () => {
  const oldState = createState(false)
  const newState = createState(true)
  expect(DiffFocus.isEqual(oldState, newState)).toBe(false)
})

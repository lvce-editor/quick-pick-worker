import { expect, test } from '@jest/globals'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as DiffValue from '../src/parts/DiffValue/DiffValue.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

const createQuickPickState = (value: string, inputSource: number): QuickPickState => {
  return {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    inputSource,
    value,
  }
}

test('diffType is RenderValue', () => {
  expect(DiffValue.diffType).toBe(DiffType.RenderValue)
})

test('isEqual returns true when newState inputSource is User', () => {
  const oldState = createQuickPickState('old value', InputSource.Script)
  const newState = createQuickPickState('new value', InputSource.User)

  expect(DiffValue.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns true when values are equal', () => {
  const oldState = createQuickPickState('same value', InputSource.Script)
  const newState = createQuickPickState('same value', InputSource.Script)

  expect(DiffValue.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns true when values are equal and inputSource is User', () => {
  const oldState = createQuickPickState('same value', InputSource.User)
  const newState = createQuickPickState('same value', InputSource.User)

  expect(DiffValue.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns false when values differ and inputSource is not User', () => {
  const oldState = createQuickPickState('old value', InputSource.Script)
  const newState = createQuickPickState('new value', InputSource.Script)

  expect(DiffValue.isEqual(oldState, newState)).toBe(false)
})

test('isEqual returns true when newState inputSource is User even with different values', () => {
  const oldState = createQuickPickState('old value', InputSource.Script)
  const newState = createQuickPickState('completely different value', InputSource.User)

  expect(DiffValue.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns true when both values are empty strings', () => {
  const oldState = createQuickPickState('', InputSource.Script)
  const newState = createQuickPickState('', InputSource.Script)

  expect(DiffValue.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns true when newState inputSource is User and oldState value is empty', () => {
  const oldState = createQuickPickState('', InputSource.Script)
  const newState = createQuickPickState('new value', InputSource.User)

  expect(DiffValue.isEqual(oldState, newState)).toBe(true)
})

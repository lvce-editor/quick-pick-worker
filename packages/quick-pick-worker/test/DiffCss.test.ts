import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffCss from '../src/parts/DiffCss/DiffCss.ts'

test('isEqual returns true when css inputs are unchanged', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = CreateDefaultState.createDefaultState()
  expect(DiffCss.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns false when deltaY changes', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 1,
  }
  expect(DiffCss.isEqual(oldState, newState)).toBe(false)
})

test('isEqual returns false when height changes', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    height: 120,
  }
  expect(DiffCss.isEqual(oldState, newState)).toBe(false)
})

test('isEqual returns false when items length changes', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    items: [{ description: '', direntType: 1, fileIcon: '', icon: '', label: 'a', matches: [], uri: '/a' }],
  }
  expect(DiffCss.isEqual(oldState, newState)).toBe(false)
})

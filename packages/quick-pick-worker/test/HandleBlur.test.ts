import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleBlur from '../src/parts/HandleBlur/HandleBlur.ts'

test('returns state unchanged', async () => {
  const state = { ...CreateDefaultState.createDefaultState(), uid: 1, value: 'test' }
  const result = await HandleBlur.handleBlur(state)
  expect(result).toBe(state)
})

test('returns state with different properties unchanged', async () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    height: 500,
    uid: 42,
    value: 'some value',
    width: 800,
  }
  const result = await HandleBlur.handleBlur(state)
  expect(result).toBe(state)
  expect(result.height).toBe(500)
  expect(result.uid).toBe(42)
  expect(result.value).toBe('some value')
  expect(result.width).toBe(800)
})

test('returns state with focused property unchanged', async () => {
  const state = { ...CreateDefaultState.createDefaultState(), focused: true }
  const result = await HandleBlur.handleBlur(state)
  expect(result).toBe(state)
  expect(result.focused).toBe(true)
})

test('returns state with focused false unchanged', async () => {
  const state = { ...CreateDefaultState.createDefaultState(), focused: false }
  const result = await HandleBlur.handleBlur(state)
  expect(result).toBe(state)
  expect(result.focused).toBe(false)
})

test('returns state with items and focusedIndex unchanged', async () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 2,
    items: [
      { description: '', direntType: 0, fileIcon: '', icon: '', label: 'item1', matches: [], uri: '' },
      { description: '', direntType: 0, fileIcon: '', icon: '', label: 'item2', matches: [], uri: '' },
      { description: '', direntType: 0, fileIcon: '', icon: '', label: 'item3', matches: [], uri: '' },
    ],
  }
  const result = await HandleBlur.handleBlur(state)
  expect(result).toBe(state)
  expect(result.focusedIndex).toBe(2)
  expect(result.items).toHaveLength(3)
  expect(result.items[0].label).toBe('item1')
})

test('returns state with complex configuration unchanged', async () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    cursorOffset: 5,
    focused: true,
    focusedIndex: 1,
    height: 600,
    items: [{ description: '', direntType: 0, fileIcon: '', icon: '', label: 'test', matches: [], uri: '' }],
    uid: 999,
    value: 'complex state',
    width: 1000,
  }
  const result = await HandleBlur.handleBlur(state)
  expect(result).toBe(state)
  expect(result.cursorOffset).toBe(5)
  expect(result.focused).toBe(true)
  expect(result.focusedIndex).toBe(1)
  expect(result.height).toBe(600)
  expect(result.items).toHaveLength(1)
  expect(result.uid).toBe(999)
  expect(result.value).toBe('complex state')
  expect(result.width).toBe(1000)
})

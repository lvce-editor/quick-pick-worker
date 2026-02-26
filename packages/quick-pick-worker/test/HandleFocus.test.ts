import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleFocus from '../src/parts/HandleFocus/HandleFocus.ts'

test('returns state unchanged', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Focus.setFocus': () => {},
  })

  const state: QuickPickState = { ...CreateDefaultState.createDefaultState(), uid: 1, value: 'test' }
  const result = await HandleFocus.handleFocus(state)
  expect(result).toBe(state)
  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

test('returns state with different properties unchanged', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Focus.setFocus': () => {},
  })

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    height: 500,
    uid: 42,
    value: 'some value',
    width: 800,
  }
  const result = await HandleFocus.handleFocus(state)
  expect(result).toBe(state)
  expect(result.height).toBe(500)
  expect(result.uid).toBe(42)
  expect(result.value).toBe('some value')
  expect(result.width).toBe(800)
  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

test('returns state with focused property unchanged', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Focus.setFocus': () => {},
  })

  const state: QuickPickState = { ...CreateDefaultState.createDefaultState(), focused: true }
  const result = await HandleFocus.handleFocus(state)
  expect(result).toBe(state)
  expect(result.focused).toBe(true)
  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

test('returns state with focused false unchanged', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Focus.setFocus': () => {},
  })

  const state: QuickPickState = { ...CreateDefaultState.createDefaultState(), focused: false }
  const result = await HandleFocus.handleFocus(state)
  expect(result).toBe(state)
  expect(result.focused).toBe(false)
  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

test('returns state with items and focusedIndex unchanged', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Focus.setFocus': () => {},
  })

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 2,
    items: [
      { description: '', direntType: 0, fileIcon: '', icon: '', label: 'item1', matches: [], uri: '' },
      { description: '', direntType: 0, fileIcon: '', icon: '', label: 'item2', matches: [], uri: '' },
      { description: '', direntType: 0, fileIcon: '', icon: '', label: 'item3', matches: [], uri: '' },
    ],
  }
  const result = await HandleFocus.handleFocus(state)
  expect(result).toBe(state)
  expect(result.focusedIndex).toBe(2)
  expect(result.items).toHaveLength(3)
  expect(result.items[0].label).toBe('item1')
  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

test('returns state with complex configuration unchanged', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Focus.setFocus': () => {},
  })

  const state: QuickPickState = {
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
  const result = await HandleFocus.handleFocus(state)
  expect(result).toBe(state)
  expect(result.cursorOffset).toBe(5)
  expect(result.focused).toBe(true)
  expect(result.focusedIndex).toBe(1)
  expect(result.height).toBe(600)
  expect(result.items).toHaveLength(1)
  expect(result.uid).toBe(999)
  expect(result.value).toBe('complex state')
  expect(result.width).toBe(1000)
  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

test('calls setFocus with FocusQuickPickInput', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Focus.setFocus': () => {},
  })

  const state: QuickPickState = { ...CreateDefaultState.createDefaultState() }
  await HandleFocus.handleFocus(state)

  expect(mockRpc.invocations).toEqual([['Focus.setFocus', 20]])
})

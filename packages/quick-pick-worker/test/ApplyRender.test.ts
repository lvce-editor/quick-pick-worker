import { expect, test } from '@jest/globals'
import * as ApplyRender from '../src/parts/ApplyRender/ApplyRender.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'

test('returns empty array when diffResult is empty', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = CreateDefaultState.createDefaultState()
  const diffResult: readonly number[] = []
  const result = ApplyRender.applyRender(oldState, newState, diffResult)
  expect(result).toEqual([])
})

test('skips Height diff type', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = CreateDefaultState.createDefaultState()
  const diffResult: readonly number[] = [DiffType.Height]
  const result = ApplyRender.applyRender(oldState, newState, diffResult)
  expect(result).toEqual([])
})

test('skips RenderFocusedIndex diff type', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = CreateDefaultState.createDefaultState()
  const diffResult: readonly number[] = [DiffType.RenderFocusedIndex]
  const result = ApplyRender.applyRender(oldState, newState, diffResult)
  expect(result).toEqual([])
})

test('skips both Height and RenderFocusedIndex', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = CreateDefaultState.createDefaultState()
  const diffResult: readonly number[] = [DiffType.Height, DiffType.RenderFocusedIndex]
  const result = ApplyRender.applyRender(oldState, newState, diffResult)
  expect(result).toEqual([])
})

test('calls renderer for RenderItems', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    uid: 1,
    value: 'test',
  }
  const diffResult: readonly number[] = [DiffType.RenderItems]
  const result = ApplyRender.applyRender(oldState, newState, diffResult)
  expect(result.length).toBe(1)
  expect(result[0]).toHaveLength(2)
  expect((result[0] as readonly unknown[])[0]).toBe('Viewlet.setDom2')
})

test('calls renderer for RenderValue', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    uid: 1,
    value: 'test-value',
  }
  const diffResult: readonly number[] = [DiffType.RenderValue]
  const result = ApplyRender.applyRender(oldState, newState, diffResult)
  expect(result.length).toBe(1)
  expect(result[0]).toHaveLength(3)
  expect((result[0] as readonly unknown[])[0]).toBe('Viewlet.setValueByName')
})

test('calls renderer for RenderFocus', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    focused: true,
    uid: 1,
  }
  const diffResult: readonly number[] = [DiffType.RenderFocus]
  const result = ApplyRender.applyRender(oldState, newState, diffResult)
  expect(result.length).toBe(1)
  expect(result[0]).toHaveLength(2)
  expect((result[0] as readonly unknown[])[0]).toBe('Viewlet.focusElementByName')
})

test('calls renderer for RenderCursorOffset', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    cursorOffset: 5,
    uid: 1,
  }
  const diffResult: readonly number[] = [DiffType.RenderCursorOffset]
  const result = ApplyRender.applyRender(oldState, newState, diffResult)
  expect(result.length).toBe(1)
  expect(result[0]).toHaveLength(4)
  expect((result[0] as readonly unknown[])[0]).toBe('Viewlet.send')
})

test('handles multiple diff types', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    focused: true,
    uid: 1,
    value: 'test',
  }
  const diffResult: readonly number[] = [DiffType.RenderValue, DiffType.RenderFocus]
  const result = ApplyRender.applyRender(oldState, newState, diffResult)
  expect(result.length).toBe(2)
  expect((result[0] as readonly unknown[])[0]).toBe('Viewlet.setValueByName')
  expect((result[1] as readonly unknown[])[0]).toBe('Viewlet.focusElementByName')
})

test('skips Height and RenderFocusedIndex in mixed diff types', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    uid: 1,
    value: 'test',
  }
  const diffResult: readonly number[] = [DiffType.Height, DiffType.RenderValue, DiffType.RenderFocusedIndex, DiffType.RenderFocus]
  const result = ApplyRender.applyRender(oldState, newState, diffResult)
  expect(result.length).toBe(2)
  expect((result[0] as readonly unknown[])[0]).toBe('Viewlet.setValueByName')
  expect((result[1] as readonly unknown[])[0]).toBe('Viewlet.focusElementByName')
})

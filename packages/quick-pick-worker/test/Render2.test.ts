import { expect, test } from '@jest/globals'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as QuickPickStates from '../src/parts/QuickPickStates/QuickPickStates.ts'
import * as Render2 from '../src/parts/Render2/Render2.ts'

const createState = (focusedIndex: number): QuickPickState => {
  return {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex,
  }
}

test('render2 returns empty array when oldState equals newState', () => {
  const uid = 1
  const state = createState(0)
  QuickPickStates.set(uid, state, state)
  const diffResult: readonly number[] = [DiffType.RenderValue, DiffType.RenderFocus]
  const result = Render2.render2(uid, diffResult)
  expect(result).toEqual([])
})

test('render2 calls applyRender and returns commands when states differ', () => {
  const uid = 2
  const oldState = createState(0)
  const newState = createState(1)
  QuickPickStates.set(uid, oldState, newState)
  const diffResult: readonly number[] = [DiffType.RenderFocusedIndex]
  const result = Render2.render2(uid, diffResult)
  expect(result).toEqual([])
  const { newState: updatedNewState, oldState: updatedOldState } = QuickPickStates.get(uid)
  expect(updatedOldState).toBe(newState)
  expect(updatedNewState).toBe(newState)
})

test('render2 updates QuickPickStates and returns commands when states differ', () => {
  const uid = 3
  const oldState = createState(0)
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    focused: true,
    uid: 3,
  }
  QuickPickStates.set(uid, oldState, newState)
  const diffResult: readonly number[] = [DiffType.RenderFocus]
  const result = Render2.render2(uid, diffResult)
  expect(result.length).toBe(1)
  expect(result[0]).toHaveLength(2)
  expect((result[0] as readonly unknown[])[0]).toBe('Viewlet.focusElementByName')
  const { newState: updatedNewState, oldState: updatedOldState } = QuickPickStates.get(uid)
  expect(updatedOldState).toBe(newState)
  expect(updatedNewState).toBe(newState)
})

test('render2 handles multiple diff types when states differ', () => {
  const uid = 4
  const oldState = createState(0)
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    focused: true,
    uid: 4,
    value: 'test-value',
  }
  QuickPickStates.set(uid, oldState, newState)
  const diffResult: readonly number[] = [DiffType.RenderValue, DiffType.RenderFocus]
  const result = Render2.render2(uid, diffResult)
  expect(result.length).toBe(2)
  expect((result[0] as readonly unknown[])[0]).toBe('Viewlet.setValueByName')
  expect((result[1] as readonly unknown[])[0]).toBe('Viewlet.focusElementByName')
  const { newState: updatedNewState, oldState: updatedOldState } = QuickPickStates.get(uid)
  expect(updatedOldState).toBe(newState)
  expect(updatedNewState).toBe(newState)
})

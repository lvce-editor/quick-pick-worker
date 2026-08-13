import { expect, jest, test } from '@jest/globals'
import { createMockRpc } from '@lvce-editor/rpc'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as QuickPickStates from '../src/parts/QuickPickStates/QuickPickStates.ts'
import * as Render2 from '../src/parts/Render2/Render2.ts'
import * as RendererProcess from '../src/parts/RendererProcess/RendererProcess.ts'

const createState = (focusedIndex: number): QuickPickState => {
  return {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex,
  }
}

test('render2 returns empty array when oldState equals newState', async () => {
  const uid = 1
  const state = createState(0)
  QuickPickStates.set(uid, state, state)
  const diffResult: readonly number[] = [DiffType.RenderValue, DiffType.RenderFocus]
  const result = await Render2.render2(uid, diffResult)
  expect(result).toEqual([])
})

test('render2 calls applyRender and returns commands when states differ', async () => {
  const uid = 2
  const oldState = createState(0)
  const newState = createState(1)
  QuickPickStates.set(uid, oldState, newState)
  const diffResult: readonly number[] = [DiffType.RenderFocusedIndex]
  const result = await Render2.render2(uid, diffResult)
  expect(result).toEqual([])
  const { newState: updatedNewState, oldState: updatedOldState } = QuickPickStates.get(uid)
  expect(updatedOldState).toBe(newState)
  expect(updatedNewState).toBe(newState)
})

test('render2 updates QuickPickStates and returns commands when states differ', async () => {
  const uid = 3
  const oldState = createState(0)
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    focused: true,
    uid: 3,
  }
  QuickPickStates.set(uid, oldState, newState)
  const diffResult: readonly number[] = [DiffType.RenderFocus]
  const result = await Render2.render2(uid, diffResult)
  expect(result).toEqual([['Viewlet.focusElementByName', uid, 'QuickPickInput']])
  const { newState: updatedNewState, oldState: updatedOldState } = QuickPickStates.get(uid)
  expect(updatedOldState).toBe(newState)
  expect(updatedNewState).toBe(newState)
})

test('render2 handles multiple diff types when states differ', async () => {
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
  const result = await Render2.render2(uid, diffResult)
  expect(result).toEqual([
    ['Viewlet.setValueByName', uid, 'QuickPickInput', 'test-value'],
    ['Viewlet.focusElementByName', uid, 'QuickPickInput'],
  ])
  const { newState: updatedNewState, oldState: updatedOldState } = QuickPickStates.get(uid)
  expect(updatedOldState).toBe(newState)
  expect(updatedNewState).toBe(newState)
})

test('render2 queues renderer commands and returns a lightweight commit marker', async () => {
  const queueCommands = jest.fn((_uid: number, _commands: readonly unknown[]) => 17)
  RendererProcess.set(createMockRpc({ commandMap: { 'Viewlet.queueCommands': queueCommands } }))
  const uid = 5
  const oldState = createState(0)
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    uid,
    value: 'test-value',
  }
  QuickPickStates.set(uid, oldState, newState)

  const result = await Render2.render2(uid, [DiffType.RenderValue])

  expect(queueCommands).toHaveBeenCalledWith(uid, [['Viewlet.setValueByName', uid, 'QuickPickInput', 'test-value']])
  expect(result).toEqual([['Viewlet.commitPending', uid, 17]])
})

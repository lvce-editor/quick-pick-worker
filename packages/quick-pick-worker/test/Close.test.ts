import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as Close from '../src/parts/Close/Close.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as QuickPickEntryId from '../src/parts/QuickPickEntryId/QuickPickEntryId.ts'

test('close calls closeWidget with correct uid', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Viewlet.closeWidget': () => {},
  })

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    uid: 123,
  }

  const result = await Close.close(state)

  expect(mockRpc.invocations).toEqual([['Viewlet.closeWidget', 123]])
  expect(result).toBe(state)
})

test('close returns the same state object', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Viewlet.closeWidget': () => {},
  })

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    uid: 456,
  }

  const result = await Close.close(state)

  expect(mockRpc.invocations).toEqual([['Viewlet.closeWidget', 456]])
  expect(result).toBe(state)
})

test('close does not resolve a callback for executable custom items', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.executeCallback': () => {
      throw new Error('should not resolve a callback')
    },
    'Viewlet.closeWidget': () => {},
  })

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    args: ['custom', [], undefined, { executeItemCommand: true }],
    providerId: QuickPickEntryId.Custom,
    uid: 123,
  }

  const result = await Close.close(state)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['Viewlet.closeWidget', 123]])
})

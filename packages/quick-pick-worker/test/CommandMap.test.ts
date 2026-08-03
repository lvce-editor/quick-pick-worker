import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { commandMap } from '../src/parts/CommandMap/CommandMap.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as QuickPickStates from '../src/parts/QuickPickStates/QuickPickStates.ts'

test('close command closes the quick pick for its uid', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Viewlet.closeWidget': () => {},
  })
  const uid = 123
  const state = {
    ...CreateDefaultState.createDefaultState(),
    uid,
  }
  QuickPickStates.set(uid, state, state)

  await commandMap['QuickPick.close'](uid)

  expect(mockRpc.invocations).toEqual([['Viewlet.closeWidget', uid]])
})

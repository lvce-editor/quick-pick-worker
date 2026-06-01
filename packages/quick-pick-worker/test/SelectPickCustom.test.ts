import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import * as QuickPickCallbacks from '../src/parts/QuickPickCallbacks/QuickPickCallbacks.ts'
import { state } from '../src/parts/QuickPickEntriesCustom/QuickPickEntriesCustomState.ts'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'
import { selectPick } from '../src/parts/SelectPickCustom/SelectPickCustom.ts'

test('selectPick calls QuickPick.executeCallback with input result', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.executeCallback': () => {},
  })

  state.args = ['arg1', 'arg2', 'resolve-id-123'] as readonly unknown[]

  const pick: ProtoVisibleItem = {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: 'test',
    matches: [],
    uri: '',
  }

  const result = await selectPick(pick, 'typed value')

  expect(mockRpc.invocations).toEqual([
    [
      'QuickPick.executeCallback',
      'resolve-id-123',
      {
        canceled: false,
        inputValue: 'typed value',
      },
    ],
  ])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick returns quick pick item value in quickPick mode', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.executeCallback': () => {},
  })

  state.args = ['arg1', 'arg2', 'another-resolve-id', { mode: 'quickPick' }] as readonly unknown[]

  const pick: ProtoVisibleItem = {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: 'custom-item',
    matches: [],
    uri: '',
    value: 'custom-value',
  }

  const result = await selectPick(pick, '')

  expect(mockRpc.invocations).toEqual([['QuickPick.executeCallback', 'another-resolve-id', 'custom-value']])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick resolves worker-owned quick pick callback locally', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.executeCallback': () => {
      throw new Error('should not call renderer callback')
    },
  })

  const { id, promise } = QuickPickCallbacks.registerCallback()

  state.args = ['arg1', 'arg2', id, { callbackOwner: 'quickPickWorker', mode: 'quickPick' }] as readonly unknown[]

  const pick: ProtoVisibleItem = {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: 'custom-item',
    matches: [],
    uri: '',
    value: 'custom-value',
  }

  const result = await selectPick(pick, '')

  await expect(promise).resolves.toBe('custom-value')
  expect(mockRpc.invocations).toEqual([])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

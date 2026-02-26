import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import { state } from '../src/parts/QuickPickEntriesCustom/QuickPickEntriesCustomState.ts'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'
import { selectPick } from '../src/parts/SelectPickCustom/SelectPickCustom.ts'

test('selectPick calls QuickPick.executeCallback with resolveId and pick', async () => {
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

  const result = await selectPick(pick)

  expect(mockRpc.invocations).toEqual([['QuickPick.executeCallback', 'resolve-id-123', pick]])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick handles different resolveIds', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.executeCallback': () => {},
  })

  state.args = ['arg1', 'arg2', 'another-resolve-id'] as readonly unknown[]

  const pick: ProtoVisibleItem = {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: 'custom-item',
    matches: [],
    uri: '',
  }

  const result = await selectPick(pick)

  expect(mockRpc.invocations).toEqual([['QuickPick.executeCallback', 'another-resolve-id', pick]])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

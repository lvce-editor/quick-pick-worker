import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'
import { selectPick } from '../src/parts/SelectPickColorTheme/SelectPickColorTheme.ts'

test('selectPick calls setColorTheme with pick label and returns Hide command', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.setColorTheme': () => {},
  })

  const pick: ProtoVisibleItem = {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: 'dark-plus',
    matches: [],
    uri: '',
  }

  const result = await selectPick(pick)

  expect(mockRpc.invocations).toEqual([['ColorTheme.setColorTheme', 'dark-plus']])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick handles different color theme labels', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.setColorTheme': () => {},
  })

  const pick: ProtoVisibleItem = {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: 'light-plus',
    matches: [],
    uri: '',
  }

  const result = await selectPick(pick)

  expect(mockRpc.invocations).toEqual([['ColorTheme.setColorTheme', 'light-plus']])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

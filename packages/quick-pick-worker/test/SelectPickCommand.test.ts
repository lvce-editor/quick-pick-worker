import { expect, jest, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'
import { selectPick } from '../src/parts/SelectPickCommand/SelectPickCommand.ts'

interface CommandItem extends ProtoVisibleItem {
  readonly args?: readonly unknown[]
  readonly id: string
}

test('selectPickBuiltin calls RendererWorker.invoke with item id and args', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'AutoUpdater.checkForUpdates': () => {},
  })

  const pick: ProtoVisibleItem = {
    args: ['arg1', 'arg2'],
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    id: 'AutoUpdater.checkForUpdates',
    label: 'test',
    matches: [],
    uri: '',
  } as CommandItem

  const result = await selectPick(pick)

  expect(mockRpc.invocations).toEqual([['AutoUpdater.checkForUpdates', 'arg1', 'arg2']])
  expect(result.command).toBe(QuickPickReturnValue.KeepOpen)
})

test('selectPickBuiltin returns Hide when shouldHide returns true', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'test-command': () => {},
  })

  const pick: ProtoVisibleItem = {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    id: 'test-command',
    label: 'test',
    matches: [],
    uri: '',
  } as CommandItem

  const result = await selectPick(pick)

  expect(result.command).toBe(QuickPickReturnValue.Hide)
  expect(mockRpc.invocations).toEqual([['test-command']])
})

test('selectPickBuiltin handles item without args', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'AutoUpdater.checkForUpdates': () => {},
  })

  const pick: ProtoVisibleItem = {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    id: 'AutoUpdater.checkForUpdates',
    label: 'test',
    matches: [],
    uri: '',
  } as CommandItem

  const result = await selectPick(pick)

  expect(mockRpc.invocations).toEqual([['AutoUpdater.checkForUpdates']])
  expect(result.command).toBe(QuickPickReturnValue.KeepOpen)
})

test('selectPickExtension calls ExtensionHost.executeCommand with id without ext. prefix', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand': () => {},
  })

  const pick: ProtoVisibleItem = {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    id: 'ext.my-extension-command',
    label: 'test',
    matches: [],
    uri: '',
  } as CommandItem

  const result = await selectPick(pick)

  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'my-extension-command']])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPickExtension handles errors and shows error dialog', async () => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

  using mockRpc = RendererWorker.registerMockRpc({
    'ErrorHandling.showErrorDialog': () => {},
    'ExtensionHost.executeCommand': () => {
      throw new Error('Test error')
    },
  })

  const pick: ProtoVisibleItem = {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    id: 'ext.failing-command',
    label: 'test',
    matches: [],
    uri: '',
  } as CommandItem

  const result = await selectPick(pick)

  expect(mockRpc.invocations.length).toBeGreaterThanOrEqual(2)
  expect(mockRpc.invocations[0]).toEqual(['ExtensionHost.executeCommand', 'failing-command'])
  expect(mockRpc.invocations.some((inv) => inv[0] === 'ErrorHandling.showErrorDialog')).toBe(true)
  expect(result.command).toBe(QuickPickReturnValue.Hide)

  consoleErrorSpy.mockRestore()
})

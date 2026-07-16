import { expect, jest, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import * as GetPicksCommand from '../src/parts/GetPicksCommand/GetPicksCommand.ts'
import * as MenuEntriesState from '../src/parts/MenuEntriesState/MenuEntriesState.ts'

interface CommandItem extends ProtoVisibleItem {
  readonly args?: readonly unknown[]
  readonly id: string
}

test('getPicks returns builtin picks', async () => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  const builtinPicks = [
    { id: 'command1', label: 'Command 1' },
    { id: 'command2', label: 'Command 2' },
  ]
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.getCommands': () => [],
    'Layout.getAllQuickPickMenuEntries': () => builtinPicks,
  })

  const result = await GetPicksCommand.getPicks('', ['', 0])
  consoleErrorSpy.mockRestore()

  expect(result).toHaveLength(3)
  expect(result[0]).toEqual({
    args: undefined,
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    id: 'command1',
    label: 'Command 1',
    matches: [],
    uri: '',
  })
  expect((result[1] as CommandItem).id).toBe('command2')
  expect(result[1].label).toBe('Command 2')
  expect(result[2]).toMatchObject({
    id: 'QuickPick.changeLanguageMode',
    label: 'Change Language Mode',
  })
  expect(mockRpc.invocations).toEqual([['Layout.getAllQuickPickMenuEntries'], ['ExtensionHost.getCommands', '', 0]])
})

test('getPicks returns extension picks with ext prefix', async () => {
  const extensionPicks = [
    { id: 'ext.command1', label: 'Extension Command 1' },
    { args: ['arg1'], id: 'ext.command2', label: 'Extension Command 2' },
  ]
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.getCommands': () => extensionPicks,
    'Layout.getAllQuickPickMenuEntries': () => [],
  })

  const result = await GetPicksCommand.getPicks('', ['', 0])

  expect(result).toHaveLength(3)
  expect(result[1]).toEqual({
    args: undefined,
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    id: 'ext.ext.command1',
    label: 'Extension Command 1',
    matches: [],
    uri: '',
  })
  expect((result[2] as CommandItem).id).toBe('ext.ext.command2')
  expect((result[2] as CommandItem).args).toEqual(['arg1'])
  expect(mockRpc.invocations).toEqual([['Layout.getAllQuickPickMenuEntries'], ['ExtensionHost.getCommands', '', 0]])
})

test('getPicks combines builtin and extension picks', async () => {
  const builtinPicks = [{ id: 'builtin1', label: 'Builtin 1' }]
  const extensionPicks = [{ id: 'ext1', label: 'Extension 1' }]
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.getCommands': () => extensionPicks,
    'Layout.getAllQuickPickMenuEntries': () => builtinPicks,
  })

  const result = await GetPicksCommand.getPicks('', ['', 0])

  expect(result).toHaveLength(3)
  expect((result[0] as CommandItem).id).toBe('builtin1')
  expect((result[2] as CommandItem).id).toBe('ext.ext1')
  expect(mockRpc.invocations).toEqual([['Layout.getAllQuickPickMenuEntries'], ['ExtensionHost.getCommands', '', 0]])
})

test('getPicks prints one warning for missing labels in extension picks', async () => {
  const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
  const extensionPicks = [{ id: 'git.openFile' }, { id: 'git.stage' }, { id: 'git.unstage' }]
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.getCommands': () => extensionPicks,
    'Layout.getAllQuickPickMenuEntries': () => [],
  })

  const result = await GetPicksCommand.getPicks('', ['', 0])

  expect(result).toHaveLength(4)
  expect(result[1].label).toBe('git.openFile')
  expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
  expect(consoleWarnSpy).toHaveBeenCalledWith('[QuickPick] command git.openFile and 2 other commands have missing label')
  expect(mockRpc.invocations).toEqual([['Layout.getAllQuickPickMenuEntries'], ['ExtensionHost.getCommands', '', 0]])
  consoleWarnSpy.mockRestore()
})

test('getPicks handles missing id in extension picks', async () => {
  const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
  const extensionPicks = [{ label: 'Command without id' }]
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.getCommands': () => extensionPicks,
    'Layout.getAllQuickPickMenuEntries': () => [],
  })

  const result = await GetPicksCommand.getPicks('', ['', 0])

  expect(result).toHaveLength(2)
  expect((result[1] as CommandItem).id).toBe('ext.undefined')
  expect(result[1].label).toBe('Command without id')
  expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
  expect(consoleWarnSpy).toHaveBeenCalledWith('[QuickPick] command Command without id has missing id')
  expect(mockRpc.invocations).toEqual([['Layout.getAllQuickPickMenuEntries'], ['ExtensionHost.getCommands', '', 0]])
  consoleWarnSpy.mockRestore()
})

test('getPicks handles extension picks error', async () => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  const builtinPicks = [{ id: 'builtin1', label: 'Builtin 1' }]
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.getCommands': () => {
      throw new Error('Extension host error')
    },
    'Layout.getAllQuickPickMenuEntries': () => builtinPicks,
  })

  const result = await GetPicksCommand.getPicks('', ['', 0])
  consoleErrorSpy.mockRestore()

  expect(result).toHaveLength(2)
  expect((result[0] as CommandItem).id).toBe('builtin1')
  expect(mockRpc.invocations).toEqual([['Layout.getAllQuickPickMenuEntries'], ['ExtensionHost.getCommands', '', 0]])
})

test('getPicks handles null extension picks', async () => {
  const builtinPicks = [{ id: 'builtin1', label: 'Builtin 1' }]
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.getCommands': () => null,
    'Layout.getAllQuickPickMenuEntries': () => builtinPicks,
  })

  const result = await GetPicksCommand.getPicks('', ['', 0])

  expect(result).toHaveLength(2)
  expect((result[0] as CommandItem).id).toBe('builtin1')
  expect(mockRpc.invocations).toEqual([['Layout.getAllQuickPickMenuEntries'], ['ExtensionHost.getCommands', '', 0]])
})

test('getPicks uses MenuEntriesState when Layout.getAllQuickPickMenuEntries fails', async () => {
  MenuEntriesState.clear()
  MenuEntriesState.add([{ id: 'state1', label: 'State 1' }])
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.getCommands': () => [],
    'Layout.getAllQuickPickMenuEntries': () => {
      throw new Error('Layout error')
    },
  })

  const result = await GetPicksCommand.getPicks('', ['', 0])

  expect(result).toHaveLength(2)
  expect((result[0] as CommandItem).id).toBe('state1')
  expect(result[0].label).toBe('State 1')
  expect(mockRpc.invocations).toEqual([['Layout.getAllQuickPickMenuEntries'], ['ExtensionHost.getCommands', '', 0]])
})

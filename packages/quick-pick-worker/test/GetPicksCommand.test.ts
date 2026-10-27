import { expect, jest, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import * as CacheWorker from '../src/parts/CacheWorker/CacheWorker.ts'
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
  expect(mockRpc.invocations).toContainEqual(['Preferences.get', 'quickPick.cache'])
  expect(mockRpc.invocations).toContainEqual(['Layout.getAllQuickPickMenuEntries', undefined])
  expect(mockRpc.invocations).toContainEqual(['ExtensionHost.getCommands', '', 0, undefined, undefined])
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
  expect(mockRpc.invocations).toContainEqual(['Preferences.get', 'quickPick.cache'])
  expect(mockRpc.invocations).toContainEqual(['Layout.getAllQuickPickMenuEntries', undefined])
  expect(mockRpc.invocations).toContainEqual(['ExtensionHost.getCommands', '', 0, undefined, undefined])
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
  expect(mockRpc.invocations).toContainEqual(['Preferences.get', 'quickPick.cache'])
  expect(mockRpc.invocations).toContainEqual(['Layout.getAllQuickPickMenuEntries', undefined])
  expect(mockRpc.invocations).toContainEqual(['ExtensionHost.getCommands', '', 0, undefined, undefined])
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
  expect(mockRpc.invocations).toContainEqual(['Preferences.get', 'quickPick.cache'])
  expect(mockRpc.invocations).toContainEqual(['Layout.getAllQuickPickMenuEntries', undefined])
  expect(mockRpc.invocations).toContainEqual(['ExtensionHost.getCommands', '', 0, undefined, undefined])
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
  expect(mockRpc.invocations).toContainEqual(['Preferences.get', 'quickPick.cache'])
  expect(mockRpc.invocations).toContainEqual(['Layout.getAllQuickPickMenuEntries', undefined])
  expect(mockRpc.invocations).toContainEqual(['ExtensionHost.getCommands', '', 0, undefined, undefined])
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
  expect(mockRpc.invocations).toContainEqual(['Preferences.get', 'quickPick.cache'])
  expect(mockRpc.invocations).toContainEqual(['Layout.getAllQuickPickMenuEntries', undefined])
  expect(mockRpc.invocations).toContainEqual(['ExtensionHost.getCommands', '', 0, undefined, undefined])
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
  expect(mockRpc.invocations).toContainEqual(['Preferences.get', 'quickPick.cache'])
  expect(mockRpc.invocations).toContainEqual(['Layout.getAllQuickPickMenuEntries', undefined])
  expect(mockRpc.invocations).toContainEqual(['ExtensionHost.getCommands', '', 0, undefined, undefined])
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
  expect(mockRpc.invocations).toContainEqual(['Preferences.get', 'quickPick.cache'])
  expect(mockRpc.invocations).toContainEqual(['Layout.getAllQuickPickMenuEntries', undefined])
  expect(mockRpc.invocations).toContainEqual(['ExtensionHost.getCommands', '', 0, undefined, undefined])
})

test('queries extension commands in the owning application', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Application.execute': (_applicationId: unknown, method: unknown) =>
      method === 'ExtensionHost.getCommands' ? [{ id: 'eslint.showPerformanceTrace', label: 'ESLint: Show Performance Trace' }] : undefined,
    'Layout.getAllQuickPickMenuEntries': () => [],
  })
  const picks = await GetPicksCommand.getPicks('>', [], { applicationId: 'source', assetDir: '/static', platform: 1 })
  expect(picks).toContainEqual(expect.objectContaining({ id: 'ext.eslint.showPerformanceTrace' }))
  expect(mockRpc.invocations).toContainEqual(['Application.execute', 'source', 'ExtensionHost.getCommands', '/static', 1, undefined])
})

test('sorts the bare command prompt and preserves provider order for filtered queries', async () => {
  const builtinPicks = [
    { id: 'Tasks.runDefaultBuildTask', label: 'Tasks: Run default build task' },
    { id: 'Layout.signIn', label: 'Account: Sign In' },
  ]
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.getCommands': () => [],
    'Layout.getAllQuickPickMenuEntries': () => builtinPicks,
  })

  const unfiltered = await GetPicksCommand.getPicks('>', ['', 0])
  const filtered = await GetPicksCommand.getPicks('>Layout', ['', 0])

  expect(unfiltered.map((item) => item.label)).toEqual(['Account: Sign In', 'Change Language Mode', 'Tasks: Run default build task'])
  expect(filtered.map((item) => item.label)).toEqual(['Tasks: Run default build task', 'Account: Sign In', 'Change Language Mode'])
  expect(builtinPicks[0].id).toBe('Tasks.runDefaultBuildTask')
  expect(mockRpc.invocations).toHaveLength(6)
})

test('reuses cached contributions when both providers confirm their hashes', async () => {
  const hash = 'a'.repeat(64)
  const entry = {
    builtin: { commands: [{ id: 'cached.builtin', label: 'Cached Builtin' }], hash },
    extensions: { commands: [{ id: 'ext.cached.extension', label: 'Cached Extension' }], hash },
    version: 1,
  }
  CacheWorker.set({
    invoke(method: string) {
      if (method === 'Cache.getCacheStorageItem') {
        return {
          body: new TextEncoder().encode(JSON.stringify(entry)).buffer,
          headers: { expires: new Date(Date.now() + 60_000).toUTCString() },
        }
      }
      return { success: true }
    },
  } as any)
  using mockRpc = RendererWorker.registerMockRpc({
    'Application.execute': (_applicationId: unknown, method: unknown, _assetDir: unknown, _platform: unknown, ifNonMatch: unknown) =>
      method === 'ExtensionHost.getCommands' ? { hash: ifNonMatch, matchesCache: true } : undefined,
    'Layout.getAllQuickPickMenuEntries': (ifNonMatch: unknown) => ({ hash: ifNonMatch, matchesCache: true }),
    'Preferences.get': () => true,
  })

  const result = await GetPicksCommand.getPicks('>', ['', 0], { applicationId: 'app-a', assetDir: '/static', platform: 1 })

  expect(result.map((item) => (item as CommandItem).id)).toEqual(['cached.builtin', 'ext.cached.extension'])
  expect(mockRpc.invocations).toContainEqual(['Layout.getAllQuickPickMenuEntries', hash])
  expect(mockRpc.invocations).toContainEqual(['Application.execute', 'app-a', 'ExtensionHost.getCommands', '/static', 1, hash])
})

test('refreshes changed contributions after providers reject cached hashes', async () => {
  const previousHash = 'a'.repeat(64)
  const previousEntry = {
    builtin: { commands: [{ id: 'old.builtin', label: 'Old Builtin' }], hash: previousHash },
    extensions: { commands: [{ id: 'ext.old.extension', label: 'Old Extension' }], hash: previousHash },
    version: 1,
  }
  const writes: unknown[] = []
  CacheWorker.set({
    invoke(method: string, ...args: readonly unknown[]) {
      if (method === 'Cache.getCacheStorageItem') {
        return {
          body: new TextEncoder().encode(JSON.stringify(previousEntry)).buffer,
          headers: { expires: new Date(Date.now() + 60_000).toUTCString() },
        }
      }
      writes.push(JSON.parse(String(args[1])))
      return { success: true }
    },
  } as any)
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.getCommands': (_assetDir: unknown, _platform: unknown, _applicationId: unknown, ifNonMatch: unknown) => ({
      commands: [{ id: 'new.extension', label: 'New Extension' }],
      hash: 'c'.repeat(64),
      matchesCache: false,
    }),
    'Layout.getAllQuickPickMenuEntries': (ifNonMatch: unknown) => ({
      commands: [{ id: 'new.builtin', label: 'New Builtin' }],
      hash: 'b'.repeat(64),
      matchesCache: false,
    }),
    'Preferences.get': () => true,
  })

  const result = await GetPicksCommand.getPicks('', ['', 0])

  expect(result.map((item) => (item as CommandItem).id)).toEqual(['new.builtin', 'QuickPick.changeLanguageMode', 'ext.new.extension'])
  expect(mockRpc.invocations).toContainEqual(['Layout.getAllQuickPickMenuEntries', previousHash])
  expect(mockRpc.invocations).toContainEqual(['ExtensionHost.getCommands', '', 0, undefined, previousHash])
  expect(writes).toHaveLength(1)
  expect(writes[0]).toMatchObject({
    builtin: { hash: 'b'.repeat(64) },
    extensions: { hash: 'c'.repeat(64) },
    version: 1,
  })
})

test('keeps command selection usable when cache storage is unavailable', async () => {
  CacheWorker.set({
    invoke() {
      throw new Error('cache storage unavailable')
    },
  } as any)
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.getCommands': () => [{ id: 'available.extension', label: 'Available Extension' }],
    'Layout.getAllQuickPickMenuEntries': () => [{ id: 'available.builtin', label: 'Available Builtin' }],
    'Preferences.get': () => true,
  })

  const result = await GetPicksCommand.getPicks('', ['', 0])

  expect(result.map((item) => (item as CommandItem).id)).toEqual(['available.builtin', 'QuickPick.changeLanguageMode', 'ext.available.extension'])
  expect(mockRpc.invocations).toContainEqual(['ExtensionHost.getCommands', '', 0, undefined, null])
})

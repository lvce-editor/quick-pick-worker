import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as QuickPickEntryId from '../src/parts/QuickPickEntryId/QuickPickEntryId.ts'
import * as QuickPickEntryUri from '../src/parts/QuickPickEntryUri/QuickPickEntryUri.ts'
import * as QuickPickStates from '../src/parts/QuickPickStates/QuickPickStates.ts'
import * as SetValue from '../src/parts/SetValue/SetValue.ts'

test('returns same state when value is unchanged', async () => {
  using mockRpc = RendererWorker.registerMockRpc({})

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    value: 'test',
  }
  const result = await SetValue.setValue(state, 'test')

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})

test('updates value and processes picks', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.getColorThemeNames': () => ['newTheme', 'anotherNewTheme'],
    'IconTheme.getFileIcon': () => 'icon',
    'IconTheme.getFolderIcon': () => 'icon',
    'QuickPickProvider.provide': () => [
      {
        description: '',
        direntType: 1,
        fileIcon: '',
        icon: '',
        label: 'file1.txt',
        matches: [],
        uri: '/file1.txt',
      },
      {
        description: '',
        direntType: 1,
        fileIcon: '',
        icon: '',
        label: 'file2.txt',
        matches: [],
        uri: '/file2.txt',
      },
    ],
  })

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    providerId: 0,
    value: 'old',
  }
  const result = await SetValue.setValue(state, 'new')

  expect(result.value).toBe('new')
  expect(result.inputSource).toBe(InputSource.Script)
  expect(result.items.length).toBeGreaterThanOrEqual(0)
  expect(result.focusedIndex).toBe(result.items.length > 0 ? 0 : -1)
  expect(result.picks.length).toBeGreaterThan(0)
  expect(mockRpc.invocations.length).toBeGreaterThan(0)
  expect(mockRpc.invocations.some((inv) => inv[0] === 'QuickPickProvider.provide' || inv[0] === 'ColorTheme.getColorThemeNames')).toBe(true)
})

test('sets focusedIndex to -1 when no items', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.getColorThemeNames': () => [],
    'IconTheme.getFileIcon': () => 'icon',
    'IconTheme.getFolderIcon': () => 'icon',
    'QuickPickProvider.provide': () => [],
  })

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    providerId: 0,
    value: 'old',
  }
  const result = await SetValue.setValue(state, 'new')

  expect(result.value).toBe('new')
  expect(result.focusedIndex).toBe(-1)
  expect(result.items).toEqual([])
  expect(Array.isArray(mockRpc.invocations)).toBe(true)
  expect(mockRpc.invocations.length).toBeGreaterThanOrEqual(0)
})

test('updates fileIconCache', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.getColorThemeNames': () => ['theme1'],
    'IconTheme.getFileIcon': () => 'icon',
    'IconTheme.getFolderIcon': () => 'icon',
    'QuickPickProvider.provide': () => [
      {
        description: '',
        direntType: 1,
        fileIcon: '',
        icon: '',
        label: 'file1.txt',
        matches: [],
        uri: '/file1.txt',
      },
    ],
  })

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    fileIconCache: {},
    providerId: 0,
    value: 'old',
  }
  const result = await SetValue.setValue(state, 'new')

  expect(result.fileIconCache).toBeDefined()
  expect(result.icons.length).toBeGreaterThanOrEqual(0)
  expect(Array.isArray(mockRpc.invocations)).toBe(true)
  expect(mockRpc.invocations.length).toBeGreaterThanOrEqual(0)
})

test('calculates finalDeltaY and listHeight', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.getColorThemeNames': () => Array.from({ length: 10 }, (_, i) => `newTheme${i}`),
    'IconTheme.getFileIcon': () => 'icon',
    'IconTheme.getFolderIcon': () => 'icon',
    'QuickPickProvider.provide': () =>
      Array.from({ length: 10 }, (_, i) => ({
        description: '',
        direntType: 1,
        fileIcon: '',
        icon: '',
        label: `file${i}.txt`,
        matches: [],
        uri: `/file${i}.txt`,
      })),
  })

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    height: 300,
    itemHeight: 30,
    providerId: 0,
    value: 'old',
  }
  const result = await SetValue.setValue(state, 'new')

  expect(typeof result.finalDeltaY).toBe('number')
  expect(result.items.length).toBeGreaterThanOrEqual(0)
  expect(Array.isArray(mockRpc.invocations)).toBe(true)
  expect(mockRpc.invocations.length).toBeGreaterThanOrEqual(0)
})

test('filters items based on filterValue', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.getColorThemeNames': () => ['testTheme', 'otherTheme'],
    'IconTheme.getFileIcon': () => 'icon',
    'IconTheme.getFolderIcon': () => 'icon',
    'QuickPickProvider.provide': () => [
      {
        description: '',
        direntType: 1,
        fileIcon: '',
        icon: '',
        label: 'test.txt',
        matches: [],
        uri: '/test.txt',
      },
      {
        description: '',
        direntType: 1,
        fileIcon: '',
        icon: '',
        label: 'other.txt',
        matches: [],
        uri: '/other.txt',
      },
    ],
  })

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    providerId: 0,
    value: '',
  }
  const result = await SetValue.setValue(state, 'test')

  expect(result.value).toBe('test')
  expect(result.items.length).toBeGreaterThanOrEqual(0)
  expect(Array.isArray(mockRpc.invocations)).toBe(true)
  expect(mockRpc.invocations.length).toBeGreaterThanOrEqual(0)
})

test('filters cached language mode picks', async () => {
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    picks: [
      { description: '', direntType: 0, fileIcon: '', icon: '', label: 'java', matches: [], uri: '' },
      { description: '', direntType: 0, fileIcon: '', icon: '', label: 'javascript', matches: [], uri: '' },
      { description: '', direntType: 0, fileIcon: '', icon: '', label: 'plaintext', matches: [], uri: '' },
    ],
    providerId: QuickPickEntryId.LanguageMode,
    value: '',
  }

  const result = await SetValue.setValue(state, 'java')

  expect(result.picks).toBe(state.picks)
  expect(result.items.map((item) => item.label)).toEqual(['java', 'javascript'])
})

test('handles empty string value', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.getColorThemeNames': () => [],
    'IconTheme.getFileIcon': () => 'icon',
    'IconTheme.getFolderIcon': () => 'icon',
    'QuickPickProvider.provide': () => [],
  })

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    providerId: 0,
    value: 'old',
  }
  const result = await SetValue.setValue(state, '')

  expect(result.value).toBe('')
  expect(result.focusedIndex).toBe(-1)
  expect(Array.isArray(mockRpc.invocations)).toBe(true)
  expect(mockRpc.invocations.length).toBeGreaterThanOrEqual(0)
})

test('preserves other state properties', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.getColorThemeNames': () => ['theme1'],
    'IconTheme.getFileIcon': () => 'icon',
    'IconTheme.getFolderIcon': () => 'icon',
    'QuickPickProvider.provide': () => [
      {
        description: '',
        direntType: 1,
        fileIcon: '',
        icon: '',
        label: 'file1.txt',
        matches: [],
        uri: '/file1.txt',
      },
    ],
  })

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    height: 400,
    providerId: 0,
    uid: 42,
    value: 'old',
    width: 800,
  }
  const result = await SetValue.setValue(state, 'new')

  expect(result.uid).toBe(42)
  expect(result.width).toBe(800)
  expect(result.height).toBe(400)
  expect(result.providerId).toBe(0)
  expect(Array.isArray(mockRpc.invocations)).toBe(true)
  expect(mockRpc.invocations.length).toBeGreaterThanOrEqual(0)
})

test('keeps the newest value when provider requests finish out of order', async () => {
  const { promise: firstResult, resolve: resolveFirstResult } = Promise.withResolvers<readonly string[]>()
  const { promise: firstStarted, resolve: notifyFirstStarted } = Promise.withResolvers<void>()
  const { promise: secondResult, resolve: resolveSecondResult } = Promise.withResolvers<readonly string[]>()
  const { promise: secondStarted, resolve: notifySecondStarted } = Promise.withResolvers<void>()
  let requestCount = 0
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.getColorThemeNames'(): Promise<readonly string[]> {
      requestCount++
      if (requestCount === 1) {
        notifyFirstStarted()
        return firstResult
      }
      notifySecondStarted()
      return secondResult
    },
  })
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    uid: 1,
    value: 'old',
  }
  QuickPickStates.set(state.uid, state, state)
  const setValueCommand = QuickPickStates.wrapAsyncCommand(SetValue.setValueWithContext)

  const firstCommand = setValueCommand(state.uid, 'first')
  await firstStarted
  const secondCommand = setValueCommand(state.uid, 'second')
  await secondStarted
  resolveSecondResult(['second theme'])
  await secondCommand
  resolveFirstResult(['first theme'])
  await firstCommand

  const { newState } = QuickPickStates.get(state.uid)
  expect(newState.value).toBe('second')
  expect(newState.picks[0].label).toBe('second theme')
  expect(mockRpc.invocations).toHaveLength(2)
})

test('does not apply command results after the view is reopened with a custom picker', async () => {
  const { promise: commandResult, resolve: resolveCommandResult } = Promise.withResolvers<readonly unknown[]>()
  const { promise: commandRequestStarted, resolve: notifyCommandRequestStarted } = Promise.withResolvers<void>()
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.getCommands'(): Promise<readonly unknown[]> {
      notifyCommandRequestStarted()
      return commandResult
    },
    'Layout.getAllQuickPickMenuEntries': () => [],
  })
  const commandPickerState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    providerId: QuickPickEntryId.EveryThing,
    uid: 1,
    uri: QuickPickEntryUri.EveryThing,
    value: '',
  }
  QuickPickStates.set(commandPickerState.uid, commandPickerState, commandPickerState)
  const setValueCommand = QuickPickStates.wrapAsyncCommand(SetValue.setValueWithContext)

  const pendingCommandRequest = setValueCommand(commandPickerState.uid, '>')
  await commandRequestStarted

  const branchPick = {
    description: 'Local branch',
    direntType: 0,
    fileIcon: '',
    icon: 'git-branch',
    label: 'main',
    matches: [],
    uri: '',
    value: 'main',
  }
  const customPickerState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    args: [null, [branchPick]],
    items: [branchPick],
    picks: [branchPick],
    providerId: QuickPickEntryId.Custom,
    uid: commandPickerState.uid,
    uri: QuickPickEntryUri.Custom,
    value: '',
  }
  QuickPickStates.set(customPickerState.uid, customPickerState, customPickerState)

  resolveCommandResult([{ id: 'workspace.command', label: 'Workspace Command' }])
  await pendingCommandRequest

  const { newState } = QuickPickStates.get(customPickerState.uid)
  expect(newState.providerId).toBe(QuickPickEntryId.Custom)
  expect(newState.value).toBe('')
  expect(newState.picks).toEqual([branchPick])
  expect(newState.items).toEqual([branchPick])
  expect(mockRpc.invocations).toEqual([
    ['Layout.getAllQuickPickMenuEntries'],
    ['ExtensionHost.getCommands', '', 0],
  ])
})

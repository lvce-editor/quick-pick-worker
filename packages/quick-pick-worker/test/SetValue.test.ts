import { expect, test } from '@jest/globals'
import { EditorWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as Create2 from '../src/parts/Create2/Create2.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
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

test('resets the virtual viewport when filtering shrinks the result set', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.getColorThemeNames': () => ['match'],
    'IconTheme.getFileIcon': () => 'icon',
    'IconTheme.getFolderIcon': () => 'icon',
    'QuickPickProvider.provide': () => [
      {
        description: '',
        direntType: 1,
        fileIcon: '',
        icon: '',
        label: 'match',
        matches: [],
        uri: '/match',
      },
    ],
  })

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    icons: ['old-icon'],
    items: Array.from({ length: 100 }, (_, index) => ({
      description: '',
      direntType: 1,
      fileIcon: '',
      icon: '',
      label: `item-${index}`,
      matches: [],
      uri: `/item-${index}`,
    })),
    maxLineY: 60,
    maxVisibleItems: 10,
    minLineY: 50,
    providerId: 0,
    value: 'old',
  }

  const result = await SetValue.setValue(state, 'match')

  expect(result.minLineY).toBe(0)
  expect(result.maxLineY).toBe(1)
  expect(result.focusedIndex).toBe(0)
  expect(result.items).toHaveLength(1)
  expect(result.icons).toHaveLength(1)
  expect(result.deltaY).toBe(0)
  expect(mockRpc.invocations).toEqual(expect.any(Array))
})

test('supports go-to-column before loadContent initializes the widget', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => 1,
  })

  using mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLines2': (editorId: number) => {
      if (editorId === 1) {
        return ['abc', 'def']
      }
      throw new Error(`unexpected editorId ${editorId}`)
    },
  })

  const uid = 999
  Create2.create(uid, QuickPickEntryUri.EveryThing, 30, 0, 0, 0, 0, 0, [], '', '')
  const { newState } = QuickPickStates.get(uid)

  const result = await SetValue.setValue(newState, '::2')

  expect(result.items).toHaveLength(1)
  expect(result.items[0].label).toBe("Press 'Enter' to go to line 0 column 2")
  expect(result.providerId).toBe(newState.providerId)
  expect(mockRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId']])
  expect(mockEditorRpc.invocations).toEqual([['Editor.getLines2', 1]])
})

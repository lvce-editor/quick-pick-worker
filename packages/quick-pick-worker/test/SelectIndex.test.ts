import { beforeEach, afterEach, expect, test, jest } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'

const testState: { consoleWarnSpy?: ReturnType<typeof jest.spyOn> } = {}

beforeEach(() => {
  testState.consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  testState.consoleWarnSpy?.mockRestore()
})
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { state as customQuickPickState } from '../src/parts/QuickPickEntriesCustom/QuickPickEntriesCustomState.ts'
import * as QuickPickEntryId from '../src/parts/QuickPickEntryId/QuickPickEntryId.ts'
import * as QuickPickEntryUri from '../src/parts/QuickPickEntryUri/QuickPickEntryUri.ts'
import { selectIndex } from '../src/parts/SelectIndex/SelectIndex.ts'

interface CommandItem extends ProtoVisibleItem {
  readonly args?: readonly unknown[]
  readonly id: string
}

test('selectIndex returns state when pick is not found', async () => {
  const items: ProtoVisibleItem[] = []
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    items,
    minLineY: 0,
    providerId: QuickPickEntryId.Commands,
    uid: 123,
    value: '',
  }
  const result = await selectIndex(state, 0)
  expect(result).toBe(state)
})

test('selectIndex calls select function and returns state for Hide command', async () => {
  let closeWidgetCalled = false
  let closeWidgetId: number | undefined

  using mockRpc = RendererWorker.registerMockRpc({
    'test-command': () => {},
    'Viewlet.closeWidget': (id: number) => {
      closeWidgetCalled = true
      closeWidgetId = id
    },
  })

  const items: ProtoVisibleItem[] = [
    {
      description: '',
      direntType: 1,
      fileIcon: '',
      icon: '',
      id: 'test-command',
      label: 'test',
      matches: [],
      uri: '',
    } as CommandItem,
  ]
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    items,
    minLineY: 0,
    providerId: QuickPickEntryId.Commands,
    uid: 123,
    value: '>',
  }
  const result = await selectIndex(state, 0)

  expect(closeWidgetCalled).toBe(true)
  expect(closeWidgetId).toBe(123)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['test-command'], ['Viewlet.closeWidget', 123]])
})

test('selectIndex handles default command case', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'test-command': () => {},
    'Viewlet.closeWidget': () => {},
  })

  const items: ProtoVisibleItem[] = [
    {
      description: '',
      direntType: 1,
      fileIcon: '',
      icon: '',
      id: 'test-command',
      label: 'test',
      matches: [],
      uri: '',
    } as CommandItem,
  ]
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    items,
    minLineY: 0,
    providerId: QuickPickEntryId.Commands,
    uid: 123,
    value: '>',
  }
  const result = await selectIndex(state, 0)

  expect(result).toBe(state)
  expect(mockRpc.invocations.length).toBeGreaterThanOrEqual(0)
})

test('selectIndex opens the color theme provider from the command palette', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.getColorThemeNames': () => ['atom-one-dark', 'ayu'],
  })

  const items: ProtoVisibleItem[] = [
    {
      description: '',
      direntType: 1,
      fileIcon: '',
      icon: '',
      id: 'QuickPick.showColorTheme',
      label: 'Preferences: Color Theme',
      matches: [],
      uri: '',
    } as CommandItem,
  ]
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    items,
    minLineY: 0,
    providerId: QuickPickEntryId.Commands,
    uid: 123,
    value: '>Color Theme',
  }

  const result = await selectIndex(state, 0)

  expect(result).not.toBe(state)
  expect(result.providerId).toBe(QuickPickEntryId.ColorTheme)
  expect(result.uri).toBe(QuickPickEntryUri.ColorTheme)
  expect(result.value).toBe('')
  expect(result.items.map((item) => item.label)).toEqual(['atom-one-dark', 'ayu'])
  expect(mockRpc.invocations).toEqual([['ColorTheme.getColorThemeNames', '', 0]])
})

test('selectIndex calculates actualIndex correctly with minLineY', async () => {
  let closeWidgetCalled = false

  using mockRpc = RendererWorker.registerMockRpc({
    'test-command': () => {},
    'Viewlet.closeWidget': () => {
      closeWidgetCalled = true
    },
  })

  const items: ProtoVisibleItem[] = [
    {
      description: '',
      direntType: 1,
      fileIcon: '',
      icon: '',
      id: 'test-command',
      label: 'first',
      matches: [],
      uri: '',
    } as CommandItem,
    {
      description: '',
      direntType: 1,
      fileIcon: '',
      icon: '',
      id: 'test-command',
      label: 'second',
      matches: [],
      uri: '',
    } as CommandItem,
    {
      description: '',
      direntType: 1,
      fileIcon: '',
      icon: '',
      id: 'test-command',
      label: 'third',
      matches: [],
      uri: '',
    } as CommandItem,
    {
      description: '',
      direntType: 1,
      fileIcon: '',
      icon: '',
      id: 'test-command',
      label: 'fourth',
      matches: [],
      uri: '',
    } as CommandItem,
    {
      description: '',
      direntType: 1,
      fileIcon: '',
      icon: '',
      id: 'test-command',
      label: 'fifth',
      matches: [],
      uri: '',
    } as CommandItem,
    {
      description: '',
      direntType: 1,
      fileIcon: '',
      icon: '',
      id: 'test-command',
      label: 'sixth',
      matches: [],
      uri: '',
    } as CommandItem,
  ]
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    items,
    minLineY: 5,
    providerId: QuickPickEntryId.Commands,
    uid: 123,
    value: '>',
  }
  const result = await selectIndex(state, 0)

  expect(closeWidgetCalled).toBe(true)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['test-command'], ['Viewlet.closeWidget', 123]])
})

test('selectIndex closes a custom quick pick before executing its item command', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.openSideBarViewlet': () => {},
    'Viewlet.closeWidget': () => {},
  })

  customQuickPickState.args = ['custom', [], undefined, { executeItemCommand: true, mode: 'quickPick' }]
  const items: ProtoVisibleItem[] = [
    {
      args: ['Search'],
      command: 'Layout.openSideBarViewlet',
      description: '',
      direntType: 0,
      fileIcon: '',
      icon: '',
      label: 'Search for Text',
      matches: [],
      uri: '',
    },
  ]
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    items,
    minLineY: 0,
    providerId: QuickPickEntryId.Custom,
    uid: 123,
    value: '',
  }

  const result = await selectIndex(state, 0)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    ['Viewlet.closeWidget', 123],
    ['Layout.openSideBarViewlet', 'Search'],
  ])
})

test('selectIndex closes an open recent quick pick without awaiting the workspace change', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Viewlet.closeWidget': () => {},
    'Workspace.setPath': () => new Promise(() => {}),
  })

  const items: ProtoVisibleItem[] = [
    {
      description: '/home/user',
      direntType: 2,
      fileIcon: '',
      icon: '',
      label: 'project',
      matches: [],
      uri: '/home/user/project',
    },
  ]
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    items,
    minLineY: 0,
    providerId: QuickPickEntryId.Recent,
    uid: 123,
    value: '',
  }

  const result = await selectIndex(state, 0)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    ['Viewlet.closeWidget', 123],
    ['Workspace.setPath', '/home/user/project'],
  ])
})

test('selectIndex closes the command palette before opening keybindings', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openKeyBindings': () => new Promise(() => {}),
    'Viewlet.closeWidget': () => {},
  })

  const items: ProtoVisibleItem[] = [
    {
      description: '',
      direntType: 1,
      fileIcon: '',
      icon: '',
      id: 'Main.openKeyBindings',
      label: 'Preferences: Open Default Key Bindings',
      matches: [],
      uri: '',
    } as CommandItem,
  ]
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    items,
    minLineY: 0,
    providerId: QuickPickEntryId.Commands,
    uid: 123,
    value: '>Preferences: Open Default Key Bindings',
  }

  const result = await selectIndex(state, 0)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['Viewlet.closeWidget', 123], ['Main.openKeyBindings']])
})

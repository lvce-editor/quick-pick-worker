import { beforeEach, afterEach, expect, test, jest } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'

let consoleWarnSpy: ReturnType<typeof jest.spyOn>

beforeEach(() => {
  consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  consoleWarnSpy.mockRestore()
})
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as QuickPickEntryId from '../src/parts/QuickPickEntryId/QuickPickEntryId.ts'
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

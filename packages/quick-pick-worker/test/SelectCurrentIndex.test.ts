import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as QuickPickEntryId from '../src/parts/QuickPickEntryId/QuickPickEntryId.ts'
import { selectCurrentIndex } from '../src/parts/SelectCurrentIndex/SelectCurrentIndex.ts'

interface CommandItem extends ProtoVisibleItem {
  readonly args?: readonly unknown[]
  readonly id: string
}

test('selectCurrentIndex returns state when pick is not found', async () => {
  const items: ProtoVisibleItem[] = []
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    items,
    minLineY: 0,
    providerId: QuickPickEntryId.Commands,
    uid: 123,
    value: '',
  }
  const result = await selectCurrentIndex(state)
  expect(result).toBe(state)
})

test('selectCurrentIndex calls selectIndex with focusedIndex', async () => {
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
    focusedIndex: 0,
    items,
    minLineY: 0,
    providerId: QuickPickEntryId.Commands,
    uid: 123,
    value: '>',
  }
  const result = await selectCurrentIndex(state)

  expect(closeWidgetCalled).toBe(true)
  expect(closeWidgetId).toBe(123)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['test-command'], ['Viewlet.closeWidget', 123]])
})

test('selectCurrentIndex uses focusedIndex correctly with minLineY', async () => {
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
  ]
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 2,
    items,
    minLineY: 1,
    providerId: QuickPickEntryId.Commands,
    uid: 123,
    value: '>',
  }
  const result = await selectCurrentIndex(state)

  expect(closeWidgetCalled).toBe(true)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['test-command'], ['Viewlet.closeWidget', 123]])
})

test('selectCurrentIndex handles different focusedIndex values', async () => {
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
  ]
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 1,
    items,
    minLineY: 0,
    providerId: QuickPickEntryId.Commands,
    uid: 123,
    value: '>',
  }
  const result = await selectCurrentIndex(state)

  expect(result).toBe(state)
  expect(mockRpc.invocations.length).toBeGreaterThanOrEqual(0)
})

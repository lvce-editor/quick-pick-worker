import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as QuickPickEntryId from '../src/parts/QuickPickEntryId/QuickPickEntryId.ts'
import { selectItem } from '../src/parts/SelectItem/SelectItem.ts'

interface CommandItem extends ProtoVisibleItem {
  readonly args?: readonly unknown[]
  readonly id: string
}

test('selectItem returns state when label is not found', async () => {
  const items: ProtoVisibleItem[] = [
    {
      description: '',
      direntType: 1,
      fileIcon: '',
      icon: '',
      label: 'first',
      matches: [],
      uri: '',
    },
  ]
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    items,
    providerId: QuickPickEntryId.Commands,
    uid: 123,
    value: '>',
  }
  const result = await selectItem(state, 'nonexistent')
  expect(result).toBe(state)
})

test('selectItem calls selectIndex with correct index when label is found', async () => {
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
  ]
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    items,
    providerId: QuickPickEntryId.Commands,
    uid: 123,
    value: '>',
  }
  const result = await selectItem(state, 'second')

  expect(closeWidgetCalled).toBe(true)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['test-command'], ['Viewlet.closeWidget', 123]])
})

test('selectItem handles empty items array', async () => {
  const items: ProtoVisibleItem[] = []
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    items,
    providerId: QuickPickEntryId.Commands,
    uid: 123,
    value: '>',
  }
  const result = await selectItem(state, 'test')
  expect(result).toBe(state)
})

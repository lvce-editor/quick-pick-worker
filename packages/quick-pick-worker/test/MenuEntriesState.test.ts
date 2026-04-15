import { beforeEach, expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as MenuEntriesState from '../src/parts/MenuEntriesState/MenuEntriesState.ts'

beforeEach(() => {
  MenuEntriesState.clear()
})

test('getAll - returns empty array by default', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getAllQuickPickMenuEntries': () => [],
  })

  const result = await MenuEntriesState.getAll()

  expect(result).toEqual([])
  expect(mockRpc.invocations).toEqual([['Layout.getAllQuickPickMenuEntries']])
})

test('add - adds menu entries to fallback state', async () => {
  const menuEntries = [
    { id: 1, label: 'Entry 1' },
    { id: 2, label: 'Entry 2' },
  ]
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getAllQuickPickMenuEntries': () => {
      throw new Error('failed to load menu entries')
    },
  })

  MenuEntriesState.add(menuEntries)

  const result = await MenuEntriesState.getAll()

  expect(result).toEqual(menuEntries)
  expect(mockRpc.invocations).toEqual([['Layout.getAllQuickPickMenuEntries']])
})

test('add - preserves existing entries when adding new ones', async () => {
  const firstEntries = [{ id: 1, label: 'Entry 1' }]
  const secondEntries = [{ id: 2, label: 'Entry 2' }]
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getAllQuickPickMenuEntries': () => {
      throw new Error('failed to load menu entries')
    },
  })

  MenuEntriesState.add(firstEntries)
  MenuEntriesState.add(secondEntries)

  const result = await MenuEntriesState.getAll()

  expect(result).toEqual([...firstEntries, ...secondEntries])
  expect(mockRpc.invocations).toEqual([['Layout.getAllQuickPickMenuEntries']])
})

test('add - handles empty array', async () => {
  const menuEntries = [{ id: 1, label: 'Entry 1' }]
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getAllQuickPickMenuEntries': () => {
      throw new Error('failed to load menu entries')
    },
  })

  MenuEntriesState.add(menuEntries)
  MenuEntriesState.add([])

  const result = await MenuEntriesState.getAll()

  expect(result).toEqual(menuEntries)
  expect(mockRpc.invocations).toEqual([['Layout.getAllQuickPickMenuEntries']])
})

test('getAll - returns renderer worker entries when available', async () => {
  const menuEntries = [{ id: 1, label: 'Entry 1' }]
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getAllQuickPickMenuEntries': () => menuEntries,
  })

  MenuEntriesState.add([{ id: 2, label: 'Fallback Entry' }])

  const result = await MenuEntriesState.getAll()

  expect(result).toEqual(menuEntries)
  expect(mockRpc.invocations).toEqual([['Layout.getAllQuickPickMenuEntries']])
})

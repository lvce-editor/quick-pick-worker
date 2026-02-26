import { expect, jest, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleClickAt from '../src/parts/HandleClickAt/HandleClickAt.ts'
import * as QuickPickEntryId from '../src/parts/QuickPickEntryId/QuickPickEntryId.ts'

test('handleClickAt calculates correct index from y coordinate', async () => {
  let closeWidgetCalled = false

  RendererWorker.registerMockRpc({
    'test-command': () => {},
    'Viewlet.closeWidget': () => {
      closeWidgetCalled = true
    },
  })

  const state = {
    ...CreateDefaultState.createDefaultState(),
    headerHeight: 38,
    itemHeight: 30,
    items: [
      {
        description: '',
        direntType: 1,
        fileIcon: '',
        icon: '',
        id: 'test-command',
        label: 'item1',
        matches: [],
        uri: '',
      } as any,
      {
        description: '',
        direntType: 1,
        fileIcon: '',
        icon: '',
        id: 'test-command-2',
        label: 'item2',
        matches: [],
        uri: '',
      } as any,
    ],
    minLineY: 0,
    providerId: QuickPickEntryId.Commands,
    top: 50,
    value: '>',
  }

  const y = 50 + 38 + 15
  const result = await HandleClickAt.handleClickAt(state, 100, y)

  expect(closeWidgetCalled).toBe(true)
  expect(result).toBe(state)
})

test('handleClickAt returns state unchanged when index is out of bounds', async () => {
  const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
  const state = {
    ...CreateDefaultState.createDefaultState(),
    headerHeight: 38,
    itemHeight: 30,
    items: [],
    minLineY: 0,
    top: 50,
  }

  const y = 50 + 38 + 1000
  const result = await HandleClickAt.handleClickAt(state, 200, y)

  expect(result).toBe(state)
  consoleWarnSpy.mockRestore()
})

test('handleClickAt handles click at first item', async () => {
  let closeWidgetCalled = false

  RendererWorker.registerMockRpc({
    'first-command': () => {},
    'Viewlet.closeWidget': () => {
      closeWidgetCalled = true
    },
  })

  const state = {
    ...CreateDefaultState.createDefaultState(),
    headerHeight: 38,
    itemHeight: 30,
    items: [
      {
        description: '',
        direntType: 1,
        fileIcon: '',
        icon: '',
        id: 'first-command',
        label: 'first',
        matches: [],
        uri: '',
      } as any,
    ],
    minLineY: 0,
    providerId: QuickPickEntryId.Commands,
    top: 50,
    value: '>',
  }

  const y = 50 + 38 + 15
  const result = await HandleClickAt.handleClickAt(state, 0, y)

  expect(closeWidgetCalled).toBe(true)
  expect(result).toBe(state)
})

test('handleClickAt handles click at second item', async () => {
  let closeWidgetCalled = false

  RendererWorker.registerMockRpc({
    'second-command': () => {},
    'Viewlet.closeWidget': () => {
      closeWidgetCalled = true
    },
  })

  const state = {
    ...CreateDefaultState.createDefaultState(),
    headerHeight: 38,
    itemHeight: 30,
    items: [
      {
        description: '',
        direntType: 1,
        fileIcon: '',
        icon: '',
        id: 'first-command',
        label: 'first',
        matches: [],
        uri: '',
      } as any,
      {
        description: '',
        direntType: 1,
        fileIcon: '',
        icon: '',
        id: 'second-command',
        label: 'second',
        matches: [],
        uri: '',
      } as any,
    ],
    minLineY: 0,
    providerId: QuickPickEntryId.Commands,
    top: 50,
    value: '>',
  }

  const y = 50 + 38 + 30 + 15
  const result = await HandleClickAt.handleClickAt(state, 0, y)

  expect(closeWidgetCalled).toBe(true)
  expect(result).toBe(state)
})

test('handleClickAt handles click above header', async () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    headerHeight: 38,
    itemHeight: 30,
    items: [
      {
        description: '',
        direntType: 1,
        fileIcon: '',
        icon: '',
        id: 'test-command',
        label: 'item',
        matches: [],
        uri: '',
      } as any,
    ],
    minLineY: 0,
    top: 50,
  }

  const y = 50 + 10
  const result = await HandleClickAt.handleClickAt(state, 0, y)

  expect(result).toBe(state)
})

test('handleClickAt ignores x coordinate', async () => {
  let closeWidgetCallCount = 0

  RendererWorker.registerMockRpc({
    'test-command': () => {},
    'Viewlet.closeWidget': () => {
      closeWidgetCallCount++
    },
  })

  const state = {
    ...CreateDefaultState.createDefaultState(),
    headerHeight: 38,
    itemHeight: 30,
    items: [
      {
        description: '',
        direntType: 1,
        fileIcon: '',
        icon: '',
        id: 'test-command',
        label: 'item',
        matches: [],
        uri: '',
      } as any,
    ],
    minLineY: 0,
    providerId: QuickPickEntryId.Commands,
    top: 50,
    value: '>',
  }

  const y = 50 + 38 + 15
  const result1 = await HandleClickAt.handleClickAt(state, 0, y)
  const result2 = await HandleClickAt.handleClickAt(state, 1000, y)

  expect(closeWidgetCallCount).toBe(2)
  expect(result1).toBe(result2)
})

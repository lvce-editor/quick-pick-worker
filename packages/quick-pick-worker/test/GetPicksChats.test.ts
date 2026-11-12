import { expect, test } from '@jest/globals'
import * as ExtensionHostWorker from '../src/parts/ExtensionHostWorker/ExtensionHostWorker.ts'
import * as GetPicksChats from '../src/parts/GetPicksChats/GetPicksChats.ts'

test('filters chat items by title and preserves stable ids', async () => {
  using mockRpc = ExtensionHostWorker.registerMockRpc({
    'Application.execute': (_applicationId, _command, commandId) => {
      expect(commandId).toBe('chat2.getQuickPickItems')
      return [
        { id: 'task-1', title: 'Fix quickpick' },
        { id: 'task-2', title: 'Add chat search' },
        { id: 'task-3', title: 'Fix quickpick' },
      ]
    },
    'ExtensionHost.executeCommand': () => [
      { id: 'task-1', title: 'Fix quickpick' },
      { id: 'task-2', title: 'Add chat search' },
      { id: 'task-3', title: 'Fix quickpick' },
    ],
  })

  const result = await GetPicksChats.getPicks('QUICKPICK', [], { applicationId: 'app', assetDir: '', platform: 0 })

  expect(result.map(({ label, value }) => [label, value])).toEqual([
    ['Fix quickpick', 'task-1'],
    ['Fix quickpick', 'task-3'],
  ])
  expect(mockRpc.invocations).toEqual([['Application.execute', 'app', 'ExtensionHost.executeCommand', 'chat2.getQuickPickItems']])
})

test('returns no items when the chat command response is unavailable', async () => {
  using mockRpc = ExtensionHostWorker.registerMockRpc({
    'ExtensionHost.executeCommand': () => undefined,
  })

  await expect(GetPicksChats.getPicks('query', [], { assetDir: '', platform: 0 })).resolves.toEqual([])
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'chat2.getQuickPickItems']])
})

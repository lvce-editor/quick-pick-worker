import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'
import * as SelectPickChats from '../src/parts/SelectPickChats/SelectPickChats.ts'

test('opens the stable task id in the owning application', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Application.execute': () => undefined,
  })

  const result = await SelectPickChats.selectPick(
    { description: '', direntType: 0, fileIcon: '', icon: '', label: 'Chat title', matches: [], uri: '', value: 'task-123' },
    '',
    'application-1',
  )

  expect(mockRpc.invocations).toEqual([
    ['Application.execute', 'application-1', 'ExtensionHost.executeCommand', 'chat2.openQuickPickItem', 'task-123'],
  ])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('ignores chat picks without a stable id', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand': () => undefined,
  })

  const result = await SelectPickChats.selectPick(
    {
      description: '',
      direntType: 0,
      fileIcon: '',
      icon: '',
      label: 'Empty',
      matches: [],
      uri: '',
    },
    '',
  )

  expect(mockRpc.invocations).toEqual([])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { getWorkspacePath } from '../src/parts/GetWorkspacePath/GetWorkspacePath.ts'

test('getWorkspacePath should invoke Workspace.getUri and return the path', async () => {
  const mockWorkspacePath = '/test/workspace'

  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri': () => mockWorkspacePath,
  })

  const result = await getWorkspacePath()
  expect(result).toBe(mockWorkspacePath)
  expect(mockRpc.invocations).toEqual([['Workspace.getUri']])
})

test('getWorkspacePath should handle different workspace paths', async () => {
  const mockWorkspacePath = '/another/workspace/path'

  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri': () => mockWorkspacePath,
  })

  const result = await getWorkspacePath()
  expect(result).toBe(mockWorkspacePath)
  expect(mockRpc.invocations).toEqual([['Workspace.getUri']])
})

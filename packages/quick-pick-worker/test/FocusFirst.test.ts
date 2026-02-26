import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import { focusFirst } from '../src/parts/FocusFirst/FocusFirst.ts'

test('focusFirst focuses the first item', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': () => 'icon',
    'IconTheme.getFolderIcon': () => 'icon',
  })

  const items = [
    { description: '', direntType: DirentType.File, fileIcon: '', icon: '', label: 'file1.txt', matches: [], uri: '/file1.txt' },
    { description: '', direntType: DirentType.File, fileIcon: '', icon: '', label: 'file2.txt', matches: [], uri: '/file2.txt' },
  ]

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 1,
    items,
    providerId: 3,
  }

  const result = await focusFirst(state)

  expect(result.focusedIndex).toBe(0)
  expect(mockRpc.invocations).toEqual([['IconTheme.getFileIcon', { name: 'file1.txt' }]])
})

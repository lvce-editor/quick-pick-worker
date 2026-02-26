import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import { focusLast } from '../src/parts/FocusLast/FocusLast.ts'

test('focusLast focuses the last item', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': () => 'icon',
    'IconTheme.getFolderIcon': () => 'icon',
  })

  const items = [
    { description: '', direntType: DirentType.File, fileIcon: '', icon: '', label: 'file1.txt', matches: [], uri: '/file1.txt' },
    { description: '', direntType: DirentType.File, fileIcon: '', icon: '', label: 'file2.txt', matches: [], uri: '/file2.txt' },
    { description: '', direntType: DirentType.File, fileIcon: '', icon: '', label: 'file3.txt', matches: [], uri: '/file3.txt' },
  ]

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    items,
    providerId: 3,
  }

  const result = await focusLast(state)

  expect(result.focusedIndex).toBe(2)
  expect(mockRpc.invocations).toEqual([
    ['IconTheme.getFileIcon', { name: 'file1.txt' }],
    ['IconTheme.getFileIcon', { name: 'file2.txt' }],
    ['IconTheme.getFileIcon', { name: 'file3.txt' }],
  ])
})

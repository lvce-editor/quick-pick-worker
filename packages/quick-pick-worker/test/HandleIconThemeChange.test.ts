import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { setDeltaY } from '../src/parts/VirtualList/VirtualList.ts'

test('setDeltaY can clear stale cache and reload visible icons', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': ({ name }: { name: string }) => `icon-for-${name}`,
    'IconTheme.getFolderIcon': ({ name }: { name: string }) => `icon-for-${name}`,
  })

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    fileIconCache: {
      '/file.txt': 'stale-icon',
      '/hidden.txt': 'stale-hidden-icon',
    },
    height: 68,
    itemHeight: 30,
    items: [
      { description: '', direntType: 7, fileIcon: '', icon: '', label: 'file.txt', matches: [], uri: '/file.txt' },
      { description: '', direntType: 7, fileIcon: '', icon: '', label: 'hidden.txt', matches: [], uri: '/hidden.txt' },
    ],
    maxLineY: 1,
    minLineY: 0,
  }

  const result = await setDeltaY(state, state.deltaY, true)

  expect(result.icons).toEqual(['icon-for-file.txt'])
  expect(result.fileIconCache).toEqual({ '/file.txt': 'icon-for-file.txt' })
  expect(mockRpc.invocations).toEqual([['IconTheme.getFileIcon', { name: 'file.txt' }]])
})

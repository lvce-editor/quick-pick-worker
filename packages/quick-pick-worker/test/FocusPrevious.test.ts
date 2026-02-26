import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusPrevious } from '../src/parts/FocusPrevious/FocusPrevious.ts'

test('focusPrevious focuses the previous item', async () => {
  RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': () => 'icon',
    'IconTheme.getFolderIcon': () => 'icon',
  })

  const items = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file1.txt', matches: [], uri: '/file1.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file2.txt', matches: [], uri: '/file2.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file3.txt', matches: [], uri: '/file3.txt' },
  ]

  const state = {
    ...createDefaultState(),
    focusedIndex: 2,
    items,
    providerId: 3,
  }

  const result = await focusPrevious(state)

  expect(result.focusedIndex).toBe(1)
})

test('focusPrevious cycles to last item when at first', async () => {
  RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': () => 'icon',
    'IconTheme.getFolderIcon': () => 'icon',
  })

  const items = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file1.txt', matches: [], uri: '/file1.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file2.txt', matches: [], uri: '/file2.txt' },
  ]

  const state = {
    ...createDefaultState(),
    focusedIndex: 0,
    items,
    providerId: 3,
  }

  const result = await focusPrevious(state)

  expect(result.focusedIndex).toBe(1)
})

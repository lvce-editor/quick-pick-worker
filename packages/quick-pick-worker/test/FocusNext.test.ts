import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusNext } from '../src/parts/FocusNext/FocusNext.ts'

test('focusNext focuses the next item', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': () => 'icon',
    'IconTheme.getFolderIcon': () => 'icon',
  })

  const items = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file1.txt', matches: [], uri: '/file1.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file2.txt', matches: [], uri: '/file2.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file3.txt', matches: [], uri: '/file3.txt' },
  ]

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    items,
    providerId: 3,
  }

  const result = await focusNext(state)

  expect(result.focusedIndex).toBe(1)
  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

test('focusNext cycles to first item when at last', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': () => 'icon',
    'IconTheme.getFolderIcon': () => 'icon',
  })

  const items = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file1.txt', matches: [], uri: '/file1.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file2.txt', matches: [], uri: '/file2.txt' },
  ]

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 1,
    items,
    providerId: 3,
  }

  const result = await focusNext(state)

  expect(result.focusedIndex).toBe(0)
  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

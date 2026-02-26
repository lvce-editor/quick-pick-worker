import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusIndex } from '../src/parts/FocusIndex/FocusIndex.ts'

test('focusIndex updates focusedIndex when index is within visible range', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': ({ name }: { name: string }) => `icon-for-${name}`,
    'IconTheme.getFolderIcon': ({ name }: { name: string }) => `icon-for-${name}`,
  })

  const items = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file1.txt', matches: [], uri: '/file1.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file2.txt', matches: [], uri: '/file2.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file3.txt', matches: [], uri: '/file3.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file4.txt', matches: [], uri: '/file4.txt' },
  ]

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    items,
    maxLineY: 3,
    minLineY: 0,
    providerId: 3,
  }

  const result = await focusIndex(state, 1)

  expect(result.focusedIndex).toBe(1)
  expect(result.minLineY).toBe(0)
  expect(result.maxLineY).toBe(3)
  expect(result.icons.length).toBe(3)
  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

test('focusIndex scrolls up when index is before minLineY', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': ({ name }: { name: string }) => `icon-for-${name}`,
    'IconTheme.getFolderIcon': ({ name }: { name: string }) => `icon-for-${name}`,
  })

  const items = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file1.txt', matches: [], uri: '/file1.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file2.txt', matches: [], uri: '/file2.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file3.txt', matches: [], uri: '/file3.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file4.txt', matches: [], uri: '/file4.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file5.txt', matches: [], uri: '/file5.txt' },
  ]

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 3,
    items,
    maxLineY: 4,
    maxVisibleItems: 3,
    minLineY: 2,
    providerId: 3,
  }

  const result = await focusIndex(state, 0)

  expect(result.focusedIndex).toBe(0)
  expect(result.minLineY).toBe(0)
  expect(result.maxLineY).toBe(3)
  expect(result.icons.length).toBe(3)
  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

test('focusIndex scrolls down when index is at or after maxLineY', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': ({ name }: { name: string }) => `icon-for-${name}`,
    'IconTheme.getFolderIcon': ({ name }: { name: string }) => `icon-for-${name}`,
  })

  const items = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file1.txt', matches: [], uri: '/file1.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file2.txt', matches: [], uri: '/file2.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file3.txt', matches: [], uri: '/file3.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file4.txt', matches: [], uri: '/file4.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file5.txt', matches: [], uri: '/file5.txt' },
  ]

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    items,
    maxLineY: 2,
    maxVisibleItems: 3,
    minLineY: 0,
    providerId: 3,
  }

  const result = await focusIndex(state, 4)

  expect(result.focusedIndex).toBe(4)
  expect(result.minLineY).toBe(2)
  expect(result.maxLineY).toBe(5)
  expect(result.icons.length).toBe(3)
  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

test('focusIndex handles edge case when scrolling up with maxVisibleItems larger than remaining items', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': ({ name }: { name: string }) => `icon-for-${name}`,
    'IconTheme.getFolderIcon': ({ name }: { name: string }) => `icon-for-${name}`,
  })

  const items = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file1.txt', matches: [], uri: '/file1.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file2.txt', matches: [], uri: '/file2.txt' },
  ]

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 1,
    items,
    maxLineY: 1,
    minLineY: 0,
    providerId: 3,
  }

  const result = await focusIndex(state, 0)

  expect(result.focusedIndex).toBe(0)
  expect(result.minLineY).toBe(0)
  expect(result.maxLineY).toBe(1)
  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

test('focusIndex handles edge case when scrolling down with maxVisibleItems larger than remaining items', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': ({ name }: { name: string }) => `icon-for-${name}`,
    'IconTheme.getFolderIcon': ({ name }: { name: string }) => `icon-for-${name}`,
  })

  const items = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file1.txt', matches: [], uri: '/file1.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file2.txt', matches: [], uri: '/file2.txt' },
  ]

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    items,
    maxLineY: 1,
    minLineY: 0,
    providerId: 3,
  }

  const result = await focusIndex(state, 1)

  expect(result.focusedIndex).toBe(1)
  expect(result.minLineY).toBe(0)
  expect(result.maxLineY).toBe(2)
  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

test('focusIndex updates fileIconCache', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': ({ name }: { name: string }) => `icon-for-${name}`,
    'IconTheme.getFolderIcon': ({ name }: { name: string }) => `icon-for-${name}`,
  })

  const items = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file1.txt', matches: [], uri: '/file1.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file2.txt', matches: [], uri: '/file2.txt' },
  ]

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    fileIconCache: { '/file1.txt': 'cached-icon' },
    focusedIndex: 0,
    items,
    maxLineY: 1,
    minLineY: 0,
    providerId: 3,
  }

  const result = await focusIndex(state, 1)

  expect(result.fileIconCache).toEqual({
    '/file1.txt': 'cached-icon',
    '/file2.txt': 'icon-for-file2.txt',
  })
  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

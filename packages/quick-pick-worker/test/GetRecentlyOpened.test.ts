import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as GetRecentlyOpened from '../src/parts/GetRecentlyOpened/GetRecentlyOpened.ts'

test('getRecentlyOpened filters out duplicate uris', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => ['file:///a', 'file:///b', 'file:///a', 'file:///b', 'file:///c'],
  })

  const result = await GetRecentlyOpened.getRecentlyOpened()

  expect(result).toEqual(['file:///a', 'file:///b', 'file:///c'])
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened']])
})

test('getRecentlyOpened filters out equivalent file uri and absolute path representations', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => [
      'file:///test/primary/about-view',
      '/test/primary/about-view',
      'file:///test/secondary/about-view',
      'file:///test/primary/about-view/',
    ],
  })

  const result = await GetRecentlyOpened.getRecentlyOpened()

  expect(result).toEqual(['file:///test/primary/about-view', 'file:///test/secondary/about-view'])
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened']])
})

test('getRecentlyOpened preserves a unique absolute path', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => ['/test/projects/about-view'],
  })

  const result = await GetRecentlyOpened.getRecentlyOpened()

  expect(result).toEqual(['/test/projects/about-view'])
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened']])
})

test('getRecentlyOpened preserves non-file and malformed uris', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => ['vscode-remote://ssh-remote+host/test/project', 'file://['],
  })

  const result = await GetRecentlyOpened.getRecentlyOpened()

  expect(result).toEqual(['vscode-remote://ssh-remote+host/test/project', 'file://['])
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened']])
})

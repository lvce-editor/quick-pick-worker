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

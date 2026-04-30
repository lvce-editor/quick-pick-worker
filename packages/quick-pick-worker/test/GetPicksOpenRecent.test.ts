import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import * as GetPicksOpenRecent from '../src/parts/GetPicksOpenRecent/GetPicksOpenRecent.ts'

test('getPicks uses folder name as label and full path as description for file uris', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => ['file:///test/projects/some-folder'],
  })

  const result = await GetPicksOpenRecent.getPicks()

  expect(result).toEqual([
    {
      description: '/test/projects',
      direntType: DirentType.Directory,
      fileIcon: '',
      icon: '',
      label: 'some-folder',
      matches: [],
      uri: 'file:///test/projects/some-folder',
    },
  ])
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened']])
})

test('getPicks keeps non-file uris as label when no filesystem folder name can be derived', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => ['vscode-remote://ssh-remote+dev/test/project'],
  })

  const result = await GetPicksOpenRecent.getPicks()

  expect(result).toEqual([
    {
      description: '',
      direntType: DirentType.Directory,
      fileIcon: '',
      icon: '',
      label: 'vscode-remote://ssh-remote+dev/test/project',
      matches: [],
      uri: 'vscode-remote://ssh-remote+dev/test/project',
    },
  ])
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened']])
})

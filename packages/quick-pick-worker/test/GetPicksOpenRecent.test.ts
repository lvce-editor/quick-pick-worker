import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import * as FilterQuickPickItems from '../src/parts/FilterQuickPickItems/FilterQuickPickItems.ts'
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

test('getPicks decodes file uri paths for display while keeping the original uri', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => ['file:///test/projects/workspace%20%E2%80%93%20%C3%BC'],
  })

  const result = await GetPicksOpenRecent.getPicks()

  expect(result).toEqual([
    {
      description: '/test/projects',
      direntType: DirentType.Directory,
      fileIcon: '',
      icon: '',
      label: 'workspace – ü',
      matches: [],
      uri: 'file:///test/projects/workspace%20%E2%80%93%20%C3%BC',
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

test('getPicks uses the remote folder name as label so remote ssh folders can be filtered', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => ['remote-ssh://89.167.102.168/home/simon/Documents/levivilet/about%2Dview'],
  })

  const picks = await GetPicksOpenRecent.getPicks()
  const result = FilterQuickPickItems.filterQuickPickItems(picks, 'about')

  expect(result).toEqual([
    {
      description: 'remote-ssh://89.167.102.168/home/simon/Documents/levivilet',
      direntType: DirentType.Directory,
      fileIcon: '',
      icon: '',
      label: 'about-view',
      matches: [48, 0, 5],
      uri: 'remote-ssh://89.167.102.168/home/simon/Documents/levivilet/about%2Dview',
    },
  ])
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened']])
})

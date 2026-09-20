import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import * as FilterQuickPickItems from '../src/parts/FilterQuickPickItems/FilterQuickPickItems.ts'
import * as GetPicksOpenRecent from '../src/parts/GetPicksOpenRecent/GetPicksOpenRecent.ts'
import * as GetQuickPickFileIcons from '../src/parts/GetQuickPickFileIcons/GetQuickPickFileIcons.ts'

test('getPicks uses folder name as label and full path as description for file uris', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => ['file:///test/projects/some-folder'],
    'Workspace.getHomeDir': () => '',
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
      removeButton: true,
      uri: 'file:///test/projects/some-folder',
    },
  ])
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened'], ['Workspace.getHomeDir']])
})

test('getPicks decodes file uri paths for display while keeping the original uri', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => ['file:///test/projects/workspace%20%E2%80%93%20%C3%BC'],
    'Workspace.getHomeDir': () => '',
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
      removeButton: true,
      uri: 'file:///test/projects/workspace%20%E2%80%93%20%C3%BC',
    },
  ])
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened'], ['Workspace.getHomeDir']])
})

test('getPicks abbreviates the local home directory in descriptions', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => ['file:///home/test/Documents/levivilet'],
    'Workspace.getHomeDir': () => '/home/test',
  })

  const result = await GetPicksOpenRecent.getPicks()

  expect(result[0].description).toBe('~/Documents')
  expect(result[0].uri).toBe('file:///home/test/Documents/levivilet')
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened'], ['Workspace.getHomeDir']])
})

test('getPicks abbreviates the exact home directory', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => ['file:///home/test/Documents'],
    'Workspace.getHomeDir': () => '/home/test',
  })

  const result = await GetPicksOpenRecent.getPicks()

  expect(result[0].description).toBe('~')
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened'], ['Workspace.getHomeDir']])
})

test('getPicks does not abbreviate a similarly prefixed directory', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => ['file:///home/tester/Documents/levivilet'],
    'Workspace.getHomeDir': () => '/home/test',
  })

  const result = await GetPicksOpenRecent.getPicks()

  expect(result[0].description).toBe('/home/tester/Documents')
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened'], ['Workspace.getHomeDir']])
})

test('getPicks keeps the full local description when home information is unavailable', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => ['file:///home/test/Documents/levivilet'],
    'Workspace.getHomeDir': () => undefined,
  })

  const result = await GetPicksOpenRecent.getPicks()

  expect(result[0].description).toBe('/home/test/Documents')
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened'], ['Workspace.getHomeDir']])
})

test('getPicks does not abbreviate remote ssh descriptions with the local home directory', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => ['file:///home/test/Documents/levivilet', 'remote-ssh://example.com/home/test/Documents/levivilet'],
    'Workspace.getHomeDir': () => '/home/test',
  })

  const result = await GetPicksOpenRecent.getPicks()

  expect(result.map((pick) => pick.description)).toEqual(['~/Documents', '/home/test/Documents'])
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened'], ['Workspace.getHomeDir']])
})

test('getPicks keeps non-file uris as label when no filesystem folder name can be derived', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => ['vscode-remote://ssh-remote+dev/test/project'],
    'Workspace.getHomeDir': () => '',
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
      removeButton: true,
      uri: 'vscode-remote://ssh-remote+dev/test/project',
    },
  ])
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened'], ['Workspace.getHomeDir']])
})

test('getPicks uses the remote folder name as label so remote ssh folders can be filtered', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened': () => ['remote-ssh://89.167.102.168/home/simon/Documents/levivilet/about%2Dview'],
    'Workspace.getHomeDir': () => '',
  })

  const picks = await GetPicksOpenRecent.getPicks()
  const result = FilterQuickPickItems.filterQuickPickItems(picks, 'about')

  expect(result).toEqual([
    {
      description: '/home/simon/Documents/levivilet',
      direntType: DirentType.Directory,
      fileIcon: '',
      icon: '',
      iconName: 'about-view',
      label: 'about-view [SSH: 89.167.102.168]',
      matches: [48, 0, 5],
      removeButton: true,
      uri: 'remote-ssh://89.167.102.168/home/simon/Documents/levivilet/about%2Dview',
    },
  ])
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened'], ['Workspace.getHomeDir']])
})

test.each([
  ['remote-ssh://example.com/', 'example.com [SSH: example.com]', 'example.com', '/'],
  ['remote-ssh://example.com', 'example.com [SSH: example.com]', 'example.com', '/'],
  ['remote-ssh://user@[2001:db8::1]:2222/', 'user@[2001:db8::1]:2222 [SSH: user@[2001:db8::1]:2222]', 'user@[2001:db8::1]:2222', '/'],
  ['remote-ssh://example.com/work/my%20project///', 'my project [SSH: example.com]', 'my project', '/work'],
])('getPicks displays remote roots and trailing slashes: %s', async (uri, label, iconName, description) => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFolderIcon': ({ name }: { name: string }) => `folder-icon-for-${name}`,
    'RecentlyOpened.getRecentlyOpened': () => [uri],
    'Workspace.getHomeDir': () => '',
  })

  const picks = await GetPicksOpenRecent.getPicks()
  expect(picks).toEqual([
    { description, direntType: DirentType.Directory, fileIcon: '', icon: '', iconName, label, matches: [], removeButton: true, uri },
  ])
  const { icons } = await GetQuickPickFileIcons.getQuickPickFileIcons(picks, {})
  expect(icons).toEqual([`folder-icon-for-${iconName}`])
  expect(mockRpc.invocations).toEqual([
    ['RecentlyOpened.getRecentlyOpened'],
    ['Workspace.getHomeDir'],
    ['IconTheme.getFolderIcon', { name: iconName }],
  ])
})

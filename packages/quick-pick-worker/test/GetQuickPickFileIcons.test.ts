import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import { getQuickPickFileIcons } from '../src/parts/GetQuickPickFileIcons/GetQuickPickFileIcons.ts'

test('getQuickPickFileIcons returns icons and updates cache', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': ({ name }: { name: string }) => `icon-for-${name}`,
    'IconTheme.getFolderIcon': ({ name }: { name: string }) => `icon-for-${name}`,
  })

  const items = [
    { description: '', direntType: DirentType.File, fileIcon: '', icon: '', label: 'file1.txt', matches: [], uri: '/file1.txt' },
    { description: '', direntType: DirentType.File, fileIcon: '', icon: '', label: 'file2.txt', matches: [], uri: '/file2.txt' },
  ]
  const fileIconCache = { '/file1.txt': 'icon1' }
  const { icons, newFileIconCache } = await getQuickPickFileIcons(items, fileIconCache)
  expect(icons).toEqual(['icon1', 'icon-for-file2.txt'])
  expect(newFileIconCache).toEqual({ '/file1.txt': 'icon1', '/file2.txt': 'icon-for-file2.txt' })
  expect(mockRpc.invocations.length).toBeGreaterThan(0)
  expect(mockRpc.invocations.some((inv) => inv[0] === 'IconTheme.getFileIcon')).toBe(true)
})

test('getQuickPickFileIcons with all icons cached', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': ({ name }: { name: string }) => `icon-for-${name}`,
    'IconTheme.getFolderIcon': ({ name }: { name: string }) => `icon-for-${name}`,
  })

  const items = [
    { description: '', direntType: DirentType.File, fileIcon: '', icon: '', label: 'file1.txt', matches: [], uri: '/file1.txt' },
    { description: '', direntType: DirentType.File, fileIcon: '', icon: '', label: 'file2.txt', matches: [], uri: '/file2.txt' },
  ]
  const fileIconCache = { '/file1.txt': 'icon1', '/file2.txt': 'icon2' }
  const { icons, newFileIconCache } = await getQuickPickFileIcons(items, fileIconCache)
  expect(icons).toEqual(['icon1', 'icon2'])
  expect(newFileIconCache).toEqual(fileIconCache)
  expect(mockRpc.invocations).toEqual([])
})

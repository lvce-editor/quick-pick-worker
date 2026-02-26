import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import * as RequestFileIcons from '../src/parts/RequestFileIcons/RequestFileIcons.ts'

test('requests file icons', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': (request: { name: string }) => {
      if (request.name === 'test.txt') {
        return '/icons/file.png'
      }
      if (request.name === 'other.txt') {
        return '/icons/other.png'
      }
      throw new Error(`unexpected file name: ${request.name}`)
    },
  })

  const requests = [
    { name: 'test.txt', path: '', type: DirentType.File },
    { name: 'other.txt', path: '', type: DirentType.File },
  ]

  const result = await RequestFileIcons.requestFileIcons(requests)
  expect(result).toEqual(['/icons/file.png', '/icons/other.png'])
  expect(mockRpc.invocations).toEqual([
    ['IconTheme.getFileIcon', { name: 'test.txt' }],
    ['IconTheme.getFileIcon', { name: 'other.txt' }],
  ])
})

test('requests folder icons', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFolderIcon': (request: { name: string }) => {
      if (request.name === 'folder1') {
        return '/icons/folder.png'
      }
      if (request.name === 'folder2') {
        return '/icons/folder2.png'
      }
      throw new Error(`unexpected folder name: ${request.name}`)
    },
  })

  const requests = [
    { name: 'folder1', path: '', type: DirentType.Directory },
    { name: 'folder2', path: '', type: DirentType.Directory },
  ]

  const result = await RequestFileIcons.requestFileIcons(requests)
  expect(result).toEqual(['/icons/folder.png', '/icons/folder2.png'])
  expect(mockRpc.invocations).toEqual([
    ['IconTheme.getFolderIcon', { name: 'folder1' }],
    ['IconTheme.getFolderIcon', { name: 'folder2' }],
  ])
})

test('handles empty requests array', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': () => '',
    'IconTheme.getFolderIcon': () => '',
  })

  const result = await RequestFileIcons.requestFileIcons([])
  expect(result).toEqual([])
  expect(mockRpc.invocations).toEqual([])
})

test('handles requests with no name', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': () => '',
    'IconTheme.getFolderIcon': () => '',
  })

  const requests = [
    { name: '', path: '', type: DirentType.File },
    { name: '', path: '', type: DirentType.Directory },
  ]

  const result = await RequestFileIcons.requestFileIcons(requests)
  expect(result).toEqual(['', ''])
  expect(mockRpc.invocations).toEqual([])
})

import { expect, test } from '@jest/globals'
import { FileSearchWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import * as GetPicksFile from '../src/parts/GetPicksFile/GetPicksFile.ts'

const createMockFileSearchWorker = (response: readonly string[]) => {
  const invocations: any[] = []
  FileSearchWorker.set({
    invoke(method: string, ...params: readonly unknown[]) {
      invocations.push([method, ...params])
      return Promise.resolve(response)
    },
  } as any)
  return {
    invocations,
  }
}

test('getPicks returns file picks from search', async () => {
  const mockFileSearchWorker = createMockFileSearchWorker(['/workspace/file1.txt', '/workspace/file2.ts', '/workspace/subdir/file3.js'])

  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getPath': () => '/workspace',
  })

  const result = await GetPicksFile.getPicks('file')

  expect(result).toEqual([
    {
      description: '/workspace',
      direntType: DirentType.File,
      fileIcon: '',
      icon: '',
      label: 'file1.txt',
      matches: [],
      uri: '/workspace/file1.txt',
    },
    {
      description: '/workspace',
      direntType: DirentType.File,
      fileIcon: '',
      icon: '',
      label: 'file2.ts',
      matches: [],
      uri: '/workspace/file2.ts',
    },
    {
      description: '/workspace/subdir',
      direntType: DirentType.File,
      fileIcon: '',
      icon: '',
      label: 'file3.js',
      matches: [],
      uri: '/workspace/subdir/file3.js',
    },
  ])
  expect(mockRpc.invocations).toEqual([['Workspace.getPath']])
  expect(mockFileSearchWorker.invocations).toEqual([['FileSearch.searchFile', '/workspace', 'file', true, '']])
})

test('getPicks returns empty array when no workspace', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getPath': () => null,
  })

  const result = await GetPicksFile.getPicks('file')

  expect(result).toEqual([])
  expect(mockRpc.invocations).toEqual([['Workspace.getPath']])
})

test('getPicks returns empty array when workspace is empty string', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getPath': () => '',
  })

  const result = await GetPicksFile.getPicks('file')

  expect(result).toEqual([])
  expect(mockRpc.invocations).toEqual([['Workspace.getPath']])
})

test('getPicks handles files in root directory', async () => {
  const mockFileSearchWorker = createMockFileSearchWorker(['/workspace/root.txt'])

  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getPath': () => '/workspace',
  })

  const result = await GetPicksFile.getPicks('root')

  expect(result).toHaveLength(1)
  expect(result[0].label).toBe('root.txt')
  expect(result[0].description).toBe('/workspace')
  expect(mockRpc.invocations).toEqual([['Workspace.getPath']])
  expect(mockFileSearchWorker.invocations).toEqual([['FileSearch.searchFile', '/workspace', 'root', true, '']])
})

test('getPicks handles empty search results', async () => {
  const mockFileSearchWorker = createMockFileSearchWorker([])

  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getPath': () => '/workspace',
  })

  const result = await GetPicksFile.getPicks('nonexistent')

  expect(result).toEqual([])
  expect(mockRpc.invocations).toEqual([['Workspace.getPath']])
  expect(mockFileSearchWorker.invocations).toEqual([['FileSearch.searchFile', '/workspace', 'nonexistent', true, '']])
})

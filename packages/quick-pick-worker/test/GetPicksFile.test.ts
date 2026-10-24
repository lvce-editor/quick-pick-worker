import { expect, test } from '@jest/globals'
import { FileSearchWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import * as CacheWorker from '../src/parts/CacheWorker/CacheWorker.ts'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import * as GetPicksFile from '../src/parts/GetPicksFile/GetPicksFile.ts'

const createMockFileSearchWorker = (response: readonly string[]): { invocations: any[] } => {
  const invocations: any[] = []
  FileSearchWorker.set({
    invoke(method: string, ...params: readonly unknown[]) {
      invocations.push([method, ...params])
      return response
    },
  } as any)
  return {
    invocations,
  }
}

test('getPicks returns file picks from search', async () => {
  const mockFileSearchWorker = createMockFileSearchWorker(['/workspace/file1.txt', '/workspace/file2.ts', '/workspace/subdir/file3.js'])

  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri': () => '/workspace',
  })

  const result = await GetPicksFile.getPicks('file')

  expect(result).toEqual([
    {
      description: '',
      direntType: DirentType.File,
      fileIcon: '',
      icon: '',
      label: 'file1.txt',
      matches: [],
      uri: '/workspace/file1.txt',
    },
    {
      description: '',
      direntType: DirentType.File,
      fileIcon: '',
      icon: '',
      label: 'file2.ts',
      matches: [],
      uri: '/workspace/file2.ts',
    },
    {
      description: 'subdir',
      direntType: DirentType.File,
      fileIcon: '',
      icon: '',
      label: 'file3.js',
      matches: [],
      uri: '/workspace/subdir/file3.js',
    },
  ])
  expect(mockRpc.invocations).toEqual([['Workspace.getUri'], ['Preferences.get', 'quickPick.cache']])
  expect(mockFileSearchWorker.invocations).toEqual([['FileSearch.searchFile', '/workspace', 'file', true, '']])
})

test('getPicks resolves relative search results against the local workspace path', async () => {
  createMockFileSearchWorker(['file1.txt', 'subdir/file2.ts'])

  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri': () => '/workspace',
  })

  const result = await GetPicksFile.getPicks('file')

  expect(result.map(({ uri }) => uri)).toEqual(['/workspace/file1.txt', '/workspace/subdir/file2.ts'])
  expect(mockRpc.invocations).toEqual([['Workspace.getUri'], ['Preferences.get', 'quickPick.cache']])
})

test('getPicks preserves the workspace scheme for relative search results', async () => {
  createMockFileSearchWorker(['file1.txt'])

  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri': () => 'memfs:///workspace',
  })

  const result = await GetPicksFile.getPicks('file')

  expect(result.map(({ uri }) => uri)).toEqual(['memfs:///workspace/file1.txt'])
  expect(mockRpc.invocations).toEqual([['Workspace.getUri'], ['Preferences.get', 'quickPick.cache']])
})

test('getPicks returns empty array when no workspace', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri': () => null,
  })

  const result = await GetPicksFile.getPicks('file')

  expect(result).toEqual([])
  expect(mockRpc.invocations).toEqual([['Workspace.getUri']])
})

test('getPicks returns empty array when workspace is empty string', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri': () => '',
  })

  const result = await GetPicksFile.getPicks('file')

  expect(result).toEqual([])
  expect(mockRpc.invocations).toEqual([['Workspace.getUri']])
})

test('uses cached file picks only after the search confirms the matching hash', async () => {
  const cachedEntry = { hash: 'a'.repeat(64), results: ['/workspace/cached.ts'] }
  const stored: unknown[] = []
  CacheWorker.set({
    invoke(method: string, ...args: readonly unknown[]) {
      if (method === 'Cache.getCacheStorageItem') {
        return {
          body: new TextEncoder().encode(JSON.stringify(cachedEntry)).buffer,
          headers: { expires: new Date(Date.now() + 60_000).toUTCString() },
        }
      }
      stored.push([method, ...args])
      return { success: true }
    },
  } as any)
  const mockFileSearchWorker = createMockFileSearchWorker({ hash: cachedEntry.hash, matchesCache: true, results: [] } as any)
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => true,
    'Workspace.getUri': () => '/workspace',
  })

  const result = await GetPicksFile.getPicks('')

  expect(result.map(({ uri }) => uri)).toEqual(['/workspace/cached.ts'])
  expect(mockFileSearchWorker.invocations).toEqual([['FileSearch.searchFile', '/workspace', '', true, '', cachedEntry.hash]])
  expect(stored).toEqual([])
  expect(mockRpc.invocations).toContainEqual(['Preferences.get', 'quickPick.cache'])
})

test('replaces cached file picks after a nonmatching search', async () => {
  const stored: unknown[][] = []
  CacheWorker.set({
    invoke(method: string, ...args: readonly unknown[]) {
      if (method === 'Cache.getCacheStorageItem') {
        return null
      }
      stored.push([method, ...args])
      return { success: true }
    },
  } as any)
  const mockFileSearchWorker = createMockFileSearchWorker({ hash: 'b'.repeat(64), matchesCache: false, results: ['/workspace/new.ts'] } as any)
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => true,
    'Workspace.getUri': () => '/workspace',
  })

  const result = await GetPicksFile.getPicks('')

  expect(result.map(({ uri }) => uri)).toEqual(['/workspace/new.ts'])
  expect(mockFileSearchWorker.invocations).toEqual([['FileSearch.searchFile', '/workspace', '', true, '', null]])
  expect(stored).toHaveLength(1)
  expect(stored[0][0]).toBe('Cache.setCacheStorageItem')
  expect(mockRpc.invocations).toContainEqual(['Preferences.get', 'quickPick.cache'])
})

test('bypasses cache reads and writes when quick-pick caching is disabled', async () => {
  const cacheInvocations: unknown[][] = []
  CacheWorker.set({
    invoke(method: string, ...args: readonly unknown[]) {
      cacheInvocations.push([method, ...args])
      return null
    },
  } as any)
  const mockFileSearchWorker = createMockFileSearchWorker(['/workspace/fresh.ts'])
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => false,
    'Workspace.getUri': () => '/workspace',
  })

  const result = await GetPicksFile.getPicks('')

  expect(result.map(({ uri }) => uri)).toEqual(['/workspace/fresh.ts'])
  expect(mockFileSearchWorker.invocations).toEqual([['FileSearch.searchFile', '/workspace', '', true, '']])
  expect(cacheInvocations).toEqual([])
  expect(mockRpc.invocations).toContainEqual(['Preferences.get', 'quickPick.cache'])
})

test('getPicks handles files in root directory', async () => {
  const mockFileSearchWorker = createMockFileSearchWorker(['/workspace/root.txt'])

  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri': () => '/workspace',
  })

  const result = await GetPicksFile.getPicks('root')

  expect(result).toHaveLength(1)
  expect(result[0].label).toBe('root.txt')
  expect(result[0].description).toBe('')
  expect(mockRpc.invocations).toEqual([['Workspace.getUri'], ['Preferences.get', 'quickPick.cache']])
  expect(mockFileSearchWorker.invocations).toEqual([['FileSearch.searchFile', '/workspace', 'root', true, '']])
})

test('getPicks handles empty search results', async () => {
  const mockFileSearchWorker = createMockFileSearchWorker([])

  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri': () => '/workspace',
  })

  const result = await GetPicksFile.getPicks('nonexistent')

  expect(result).toEqual([])
  expect(mockRpc.invocations).toEqual([['Workspace.getUri'], ['Preferences.get', 'quickPick.cache']])
  expect(mockFileSearchWorker.invocations).toEqual([['FileSearch.searchFile', '/workspace', 'nonexistent', true, '']])
})

test('getPicks encodes raw filenames under a qualified workspace without encoding the workspace again', async () => {
  createMockFileSearchWorker(['src/Ä 100%23 #?.txt'])
  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri': () => 'memfs:///my%20workspace',
  })
  const result = await GetPicksFile.getPicks('100')
  expect(result[0].uri).toBe('memfs:///my%20workspace/src/%C3%84%20100%2523%20%23%3F.txt')
  expect(result[0].label).toBe('Ä 100%23 #?.txt')
  expect(mockRpc.invocations).toEqual([['Workspace.getUri'], ['Preferences.get', 'quickPick.cache']])
})

test('getPicks exposes the basename of Windows search results for selection', async () => {
  createMockFileSearchWorker(['src\\Ä 100% #.txt'])
  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri': () => 'C:\\workspace',
  })
  const result = await GetPicksFile.getPicks('100')
  expect(result[0].label).toBe('Ä 100% #.txt')
  expect(result[0].description).toBe('src')
  expect(mockRpc.invocations).toEqual([['Workspace.getUri'], ['Preferences.get', 'quickPick.cache']])
})

test('getPicks relativizes paths with a trailing workspace separator and preserves prefix collisions', async () => {
  createMockFileSearchWorker(['/workspace/src/file.ts', '/workspace-old/src/file.ts'])
  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri': () => '/workspace/',
  })

  const result = await GetPicksFile.getPicks('file')

  expect(result.map(({ description }) => description)).toEqual(['src', '/workspace-old/src'])
  expect(result.map(({ uri }) => uri)).toEqual(['/workspace/src/file.ts', '/workspace-old/src/file.ts'])
  expect(mockRpc.invocations).toEqual([['Workspace.getUri'], ['Preferences.get', 'quickPick.cache']])
})

test('getPicks relativizes paths for matching qualified workspace schemes', async () => {
  createMockFileSearchWorker(['src/file.ts'])
  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getUri': () => 'memfs:///workspace/',
  })

  const result = await GetPicksFile.getPicks('file')

  expect(result[0].description).toBe('src')
  expect(result[0].uri).toBe('memfs:///workspace/src/file.ts')
  expect(mockRpc.invocations).toEqual([['Workspace.getUri'], ['Preferences.get', 'quickPick.cache']])
})

test.each(['remote-server', 'remote-ssh'])('file search preserves the %s workspace identity', async (scheme) => {
  const workspace = `${scheme}://gateway.example/project`
  const search = createMockFileSearchWorker(['hello.txt'])
  using rpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => false,
    'Workspace.getUri': () => workspace,
  })
  const picks = await GetPicksFile.getPicks('hello')
  expect(search.invocations).toEqual([['FileSearch.searchFile', workspace, 'hello', true, '']])
  expect(picks[0].uri).toBe(`${workspace}/hello.txt`)
  expect(rpc.invocations).toContainEqual(['Workspace.getUri'])
})

test('failed file search leaves an empty picker, reports a notification and can retry', async () => {
  let fail = true
  FileSearchWorker.set({
    invoke() {
      if (fail) throw new Error('Search connection closed')
      return ['hello.txt']
    },
  } as any)
  using rpc = RendererWorker.registerMockRpc({
    'Notification.create': () => {},
    'Preferences.get': () => false,
    'Workspace.getUri': () => 'remote-server://gateway.example/project',
  })
  expect(await GetPicksFile.getPicks('hello')).toEqual([])
  expect(rpc.invocations).toContainEqual(['Notification.create', 'error', 'Could not search workspace files: Search connection closed'])
  fail = false
  const retriedPicks = await GetPicksFile.getPicks('hello')
  expect(retriedPicks[0].label).toBe('hello.txt')
})

test('file search resolves relative results in a local file URI', async () => {
  const search = createMockFileSearchWorker(['hello.txt'])
  using rpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => false,
    'Workspace.getUri': () => 'file:///my%20project',
  })
  const picks = await GetPicksFile.getPicks('hello')
  expect(search.invocations).toEqual([['FileSearch.searchFile', 'file:///my%20project', 'hello', true, '']])
  expect(picks[0].uri).toBe('file:///my%20project/hello.txt')
  expect(rpc.invocations).toContainEqual(['Workspace.getUri'])
})

import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as SearchFileWithRipGrep from '../src/parts/SearchFileWithRipGrep/SearchFileWithRipGrep.ts'

test('searches files without prepare', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SearchProcess.invoke': () => 'file1.txt\nfile2.txt\nfile3.txt',
  })

  const result = await SearchFileWithRipGrep.searchFile('/test', 'query', false)
  expect(result).toEqual(['file1.txt', 'file2.txt', 'file3.txt'])
  expect(mockRpc.invocations).toEqual([
    [
      'SearchProcess.invoke',
      'SearchFile.searchFile',
      {
        limit: 9_999_999,
        ripGrepArgs: ['--files', '--sort-files', '--hidden', '--glob', '!.git'],
        searchPath: '/test',
      },
    ],
  ])
})

test.skip('searches files with prepare', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SearchProcess.invoke': () => 'file1.txt\nfile2.txt\nfile3.txt',
  })

  const result = await SearchFileWithRipGrep.searchFile('/test', 'file2', true)
  expect(result).toEqual([
    {
      matches: expect.any(Array),
      pick: 'file2.txt',
    },
  ])
  expect(mockRpc.invocations).toEqual([
    [
      'SearchProcess.invoke',
      'SearchFile.searchFile',
      {
        limit: 9_999_999,
        ripGrepArgs: ['--files', '--sort-files', '--hidden', '--glob', '!.git'],
        searchPath: '/test',
      },
    ],
  ])
})

test('handles empty result', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SearchProcess.invoke': () => '',
  })

  const result = await SearchFileWithRipGrep.searchFile('/test', 'query', false)
  expect(result).toEqual([])
  expect(mockRpc.invocations).toEqual([
    [
      'SearchProcess.invoke',
      'SearchFile.searchFile',
      {
        limit: 9_999_999,
        ripGrepArgs: ['--files', '--sort-files', '--hidden', '--glob', '!.git'],
        searchPath: '/test',
      },
    ],
  ])
})

test('handles error from search process', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SearchProcess.invoke': () => {
      throw new Error('Search failed')
    },
  })

  await expect(SearchFileWithRipGrep.searchFile('/test', 'query', false)).rejects.toThrow('Search failed')
  expect(mockRpc.invocations).toEqual([
    [
      'SearchProcess.invoke',
      'SearchFile.searchFile',
      {
        limit: 9_999_999,
        ripGrepArgs: ['--files', '--sort-files', '--hidden', '--glob', '!.git'],
        searchPath: '/test',
      },
    ],
  ])
})

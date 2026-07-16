import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import { getPicks } from '../src/parts/GetPicksLanguageMode/GetPicksLanguageMode.ts'

test('getPicks returns unique contributed language ids sorted by id', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getLanguages': () => [
      { id: 'xyz', tokenize: '/extensions/test/tokenizeXyz.js' },
      { id: 'plaintext' },
      { id: 'xyz', tokenize: '/extensions/other/tokenizeXyz.js' },
      null,
      { id: 42 },
    ],
  })

  const result = await getPicks('', undefined, {
    assetDir: '/assets',
    platform: 1,
  })

  expect(result).toEqual([
    {
      description: '',
      direntType: 0,
      fileIcon: '',
      icon: '',
      label: 'plaintext',
      matches: [],
      uri: '',
      value: {
        languageId: 'plaintext',
        tokenizePath: '',
      },
    },
    {
      description: '',
      direntType: 0,
      fileIcon: '',
      icon: '',
      label: 'xyz',
      matches: [],
      uri: '',
      value: {
        languageId: 'xyz',
        tokenizePath: '/extensions/test/tokenizeXyz.js',
      },
    },
  ])
  expect(mockRpc.invocations).toEqual([['Extensions.getLanguages', 1, '/assets']])
})

test('getPicks returns an empty array when no languages are contributed', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getLanguages': () => [],
  })

  await expect(getPicks('')).resolves.toEqual([])
  expect(mockRpc.invocations).toEqual([['Extensions.getLanguages', 0, '']])
})

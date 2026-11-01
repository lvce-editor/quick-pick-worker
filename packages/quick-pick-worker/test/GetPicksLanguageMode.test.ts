import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import { getPicks } from '../src/parts/GetPicksLanguageMode/GetPicksLanguageMode.ts'

test('getPicks returns unique contributed language ids sorted by id', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getLanguages': () => [
      { extensions: ['xyz'], id: 'xyz', tokenize: '/extensions/test/tokenizeXyz.js' },
      { extensions: ['.txt'], id: 'plaintext' },
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
      direntType: 7,
      fileIcon: '',
      icon: '',
      iconName: 'file.txt',
      label: 'plaintext',
      matches: [],
      uri: 'file.txt',
      value: {
        languageId: 'plaintext',
        tokenizePath: '',
      },
    },
    {
      description: '',
      direntType: 7,
      fileIcon: '',
      icon: '',
      iconName: 'file.xyz',
      label: 'xyz',
      matches: [],
      uri: 'file.xyz',
      value: {
        languageId: 'xyz',
        tokenizePath: '/extensions/test/tokenizeXyz.js',
      },
    },
  ])
  expect(mockRpc.invocations).toEqual([['Extensions.getLanguages', 1, '/assets']])
})

test('getPicks uses a contributed file name for the icon', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getLanguages': () => [{ extensions: ['.dockerfile'], fileNames: ['Dockerfile'], id: 'dockerfile' }],
  })

  const result = await getPicks('')

  expect(result[0]).toMatchObject({
    direntType: 7,
    iconName: 'Dockerfile',
    label: 'dockerfile',
    uri: 'Dockerfile',
  })
  expect(mockRpc.invocations).toEqual([['Extensions.getLanguages', 0, '']])
})

test('getPicks omits the file icon request when a language has no file name', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getLanguages': () => [{ id: 'custom' }],
  })

  const result = await getPicks('')

  expect(result[0]).toMatchObject({
    direntType: 0,
    iconName: '',
    label: 'custom',
    uri: '',
  })
  expect(mockRpc.invocations).toEqual([['Extensions.getLanguages', 0, '']])
})

test('getPicks returns an empty array when no languages are contributed', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getLanguages': () => [],
  })

  await expect(getPicks('')).resolves.toEqual([])
  expect(mockRpc.invocations).toEqual([['Extensions.getLanguages', 0, '']])
})

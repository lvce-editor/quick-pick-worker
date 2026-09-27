import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'
import { selectPick } from '../src/parts/SelectPickFile/SelectPickFile.ts'

test('selectPick opens nested files using a file uri', async () => {
  let openedUri: string | undefined

  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri': ({ uri }: { readonly uri: string }) => {
      openedUri = uri
    },
  })

  const pick: ProtoVisibleItem = {
    description: 'src/components',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: 'Button.tsx',
    matches: [],
    uri: '/workspace/path/src/components/Button.tsx',
  }

  const result = await selectPick(pick)

  expect(openedUri).toBe('file:///workspace/path/src/components/Button.tsx')
  expect(result.command).toBe(QuickPickReturnValue.Hide)
  expect(mockRpc.invocations).toEqual([['Main.openUri', { focus: undefined, uri: 'file:///workspace/path/src/components/Button.tsx' }]])
})

test('selectPick opens workspace root files using a file uri', async () => {
  let openedUri: string | undefined

  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri': ({ uri }: { readonly uri: string }) => {
      openedUri = uri
    },
  })

  const pick: ProtoVisibleItem = {
    description: 'packages/utils',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: 'helper.ts',
    matches: [],
    uri: '/home/user/project/helper.ts',
  }

  const result = await selectPick(pick)

  expect(openedUri).toBe('file:///home/user/project/helper.ts')
  expect(result.command).toBe(QuickPickReturnValue.Hide)
  expect(mockRpc.invocations).toEqual([['Main.openUri', { focus: undefined, uri: 'file:///home/user/project/helper.ts' }]])
})

test('selectPick encodes spaces, unicode, and reserved filename characters', async () => {
  let openedUri: string | undefined

  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri': ({ uri }: { readonly uri: string }) => {
      openedUri = uri
    },
  })

  const pick: ProtoVisibleItem = {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: '100% #?.ts',
    matches: [],
    uri: '/workspace/Ä space/100% #?.ts',
  }

  const result = await selectPick(pick)

  expect(openedUri).toBe('file:///workspace/%C3%84%20space/100%25%20%23%3F.ts')
  expect(result.command).toBe(QuickPickReturnValue.Hide)
  expect(mockRpc.invocations).toEqual([['Main.openUri', { focus: undefined, uri: 'file:///workspace/%C3%84%20space/100%25%20%23%3F.ts' }]])
})

test('selectPick preserves an already-qualified supported uri', async () => {
  let openedUri: string | undefined

  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri': ({ uri }: { readonly uri: string }) => {
      openedUri = uri
    },
  })

  const pick: ProtoVisibleItem = {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: 'file.ts',
    matches: [],
    uri: 'remote-ssh://host/workspace/file.ts',
  }

  await selectPick(pick)

  expect(openedUri).toBe('remote-ssh://host/workspace/file.ts')
  expect(mockRpc.invocations).toEqual([['Main.openUri', { focus: undefined, uri: 'remote-ssh://host/workspace/file.ts' }]])
})

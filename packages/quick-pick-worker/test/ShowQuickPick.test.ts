/* eslint-disable virtual-dom/no-object-attribute-values -- Quick pick options use a type field but are not virtual DOM nodes. */
import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as QuickPickCallbacks from '../src/parts/QuickPickCallbacks/QuickPickCallbacks.ts'
import * as ShowQuickPick from '../src/parts/ShowQuickPick/ShowQuickPick.ts'

test('showQuickPick opens custom quick pick and returns selected value', async () => {
  const items = [
    {
      description: 'Local branch',
      icon: 'SourceControl',
      label: 'branch 1',
      value: 'branch-1',
    },
  ]

  using mockRpc = RendererWorker.registerMockRpc({
    'Viewlet.openWidget': (...args: readonly unknown[]) => {
      QuickPickCallbacks.executeCallback(args[3] as number, 'branch-1')
    },
  })

  const result = await ShowQuickPick.showQuickPick({
    items,
    placeholder: 'Select branch',
  })

  expect(result).toBe('branch-1')
  expect(mockRpc.invocations).toEqual([
    [
      'Viewlet.openWidget',
      'QuickPick',
      'custom',
      [],
      1,
      expect.objectContaining({
        acceptInput: false,
        callbackOwner: 'quickPickWorker',
        customItemsId: expect.any(Number),
        mode: 'quickPick',
        placeholder: 'Select branch',
      }),
    ],
  ])
})

test('showQuickPick returns undefined when canceled', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Viewlet.openWidget': (...args: readonly unknown[]) => {
      QuickPickCallbacks.executeCallback(args[3] as number)
    },
  })

  const result = await ShowQuickPick.showQuickPick({
    items: [],
  })

  expect(result).toBeUndefined()
  expect(mockRpc.invocations).toEqual([
    [
      'Viewlet.openWidget',
      'QuickPick',
      'custom',
      [],
      2,
      expect.objectContaining({
        acceptInput: false,
        callbackOwner: 'quickPickWorker',
        customItemsId: expect.any(Number),
        mode: 'quickPick',
        placeholder: '',
      }),
    ],
  ])
})

test('showQuickPick allows accepting custom input', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Viewlet.openWidget': (...args: readonly unknown[]) => {
      QuickPickCallbacks.executeCallback(args[3] as number, 'feature/new-branch')
    },
  })

  const result = await ShowQuickPick.showQuickPick({
    acceptInput: true,
    items: [],
  })

  expect(result).toBe('feature/new-branch')
  expect(mockRpc.invocations).toEqual([
    [
      'Viewlet.openWidget',
      'QuickPick',
      'custom',
      [],
      3,
      expect.objectContaining({
        acceptInput: true,
        callbackOwner: 'quickPickWorker',
        customItemsId: expect.any(Number),
        mode: 'quickPick',
      }),
    ],
  ])
})

test('showQuickPick can wait only until visible', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Viewlet.openWidget': () => undefined,
  })

  const result = await ShowQuickPick.showQuickPick({
    items: [],
    waitUntil: 'visible',
  })

  expect(result).toBeUndefined()
  expect(mockRpc.invocations).toEqual([
    [
      'Viewlet.openWidget',
      'QuickPick',
      'custom',
      [],
      4,
      expect.objectContaining({
        acceptInput: false,
        callbackOwner: 'quickPickWorker',
        customItemsId: expect.any(Number),
        mode: 'quickPick',
        placeholder: '',
      }),
    ],
  ])
})

test('showQuickPick keeps its explicit application while waiting for selection', async () => {
  using rpc = RendererWorker.registerMockRpc({
    'Application.execute': (applicationId: string, command: string, ...args: readonly unknown[]) => {
      expect(applicationId).toBe('preview')
      expect(command).toBe('Viewlet.openWidget')
      QuickPickCallbacks.executeCallback(args[3] as number, 'staging')
    },
  })
  const options = { applicationId: 'preview', items: [{ description: 'Preview', label: 'Staging', value: 'staging' }] }
  await expect(ShowQuickPick.showQuickPick(options)).resolves.toBe('staging')
  expect(rpc.invocations).toHaveLength(1)
})

test('text mode accepts input without requiring acceptInput', async () => {
  using rpc = RendererWorker.registerMockRpc({
    'Viewlet.openWidget': (...args: readonly unknown[]) => {
      expect(args[4]).toEqual(expect.objectContaining({ acceptInput: true, type: 'text' }))
      QuickPickCallbacks.executeCallback(args[3] as number, 'Ada')
    },
  })
  await expect(ShowQuickPick.showQuickPick({ items: [], type: 'text' })).resolves.toBe('Ada')
  expect(rpc.invocations).toHaveLength(1)
})

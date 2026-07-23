import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as QuickPickCallbacks from '../src/parts/QuickPickCallbacks/QuickPickCallbacks.ts'
import * as ShowQuickPick from '../src/parts/ShowQuickPick/ShowQuickPick.ts'

test('showQuickPick opens custom quick pick and returns selected value', async () => {
  const items = [
    {
      description: 'Local branch',
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
        callbackOwner: 'quickPickWorker',
        customItemsId: expect.any(Number),
        mode: 'quickPick',
        placeholder: '',
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
      3,
      expect.objectContaining({
        callbackOwner: 'quickPickWorker',
        customItemsId: expect.any(Number),
        mode: 'quickPick',
        placeholder: '',
      }),
    ],
  ])
})

import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ShowQuickInput from '../src/parts/ShowQuickInput/ShowQuickInput.ts'

test('showQuickInput opens custom quick input with render id', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.showCustom': () => ({
      canceled: false,
      inputValue: 'search',
    }),
  })

  const result = await ShowQuickInput.showQuickInput({
    id: 123,
    ignoreFocusOut: false,
    initialValue: 'test',
  })

  expect(result).toEqual({
    canceled: false,
    inputValue: 'search',
  })
  expect(mockRpc.invocations).toEqual([
    [
      'QuickPick.showCustom',
      [],
      {
        customItemsId: expect.any(Number),
        ignoreFocusOut: false,
        initialValue: 'test',
        mode: 'quickInput',
        quickInputId: 123,
        waitUntil: undefined,
      },
    ],
  ])
})

test('showQuickInput returns canceled result when renderer returns undefined', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.showCustom': () => undefined,
  })

  const result = await ShowQuickInput.showQuickInput({})

  expect(result).toEqual({
    canceled: true,
    inputValue: '',
  })
  expect(mockRpc.invocations).toHaveLength(1)
})

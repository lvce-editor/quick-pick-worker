import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
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
    'QuickPick.showCustom': () => 'branch-1',
  })

  const result = await ShowQuickPick.showQuickPick({
    items,
    placeholder: 'Select branch',
  })

  expect(result).toBe('branch-1')
  expect(mockRpc.invocations).toEqual([
    [
      'QuickPick.showCustom',
      [],
      {
        customItemsId: expect.any(Number),
        mode: 'quickPick',
        placeholder: 'Select branch',
      },
    ],
  ])
})

test('showQuickPick returns undefined when canceled', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.showCustom': () => undefined,
  })

  const result = await ShowQuickPick.showQuickPick({
    items: [],
  })

  expect(result).toBeUndefined()
  expect(mockRpc.invocations).toEqual([
    [
      'QuickPick.showCustom',
      [],
      {
        customItemsId: expect.any(Number),
        mode: 'quickPick',
        placeholder: '',
      },
    ],
  ])
})

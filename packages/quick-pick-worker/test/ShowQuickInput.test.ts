/* eslint-disable virtual-dom/no-raw-text-children -- Quick pick options use a type field but are not virtual DOM nodes. */
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
    placeholder: 'Enter a value',
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
        placeholder: 'Enter a value',
        quickInputId: 123,
        type: 'select',
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

test('showQuickInput returns the result from the calling application', async () => {
  using rpc = RendererWorker.registerMockRpc({
    'Application.execute': () => ({ canceled: false, inputValue: 'Ada' }),
  })
  const options = { applicationId: 'preview', initialValue: 'World' }
  await expect(ShowQuickInput.showQuickInput(options)).resolves.toEqual({ canceled: false, inputValue: 'Ada' })
  expect(rpc.invocations).toEqual([
    ['Application.execute', 'preview', 'QuickPick.showCustom', [], expect.objectContaining({ initialValue: 'World' })],
  ])
})

test('showQuickInput defaults to text mode without a renderer or items', async () => {
  using rpc = RendererWorker.registerMockRpc({ 'QuickPick.showCustom': () => undefined })
  await ShowQuickInput.showQuickInput({ initialValue: 'World' })
  expect(rpc.invocations[0][2]).toEqual(expect.objectContaining({ type: 'text' }))
})

test('showQuickInput preserves a list when initial items are supplied', async () => {
  using rpc = RendererWorker.registerMockRpc({ 'QuickPick.showCustom': () => undefined })
  await ShowQuickInput.showQuickInput({ initialItems: [{ label: 'World' }] })
  expect(rpc.invocations[0][2]).toEqual(expect.objectContaining({ type: 'select' }))
})

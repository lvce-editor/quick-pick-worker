import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'
import * as SelectPickGoToLine from '../src/parts/SelectPickGoToLine/SelectPickGoToLine.ts'

test('selectPick with :value parses line and navigates to position', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorSet': () => {},
    'Editor.handleFocus': () => {},
  })

  const item = { label: '1' }
  const value = ':5'

  const result = await SelectPickGoToLine.selectPick(item, value)

  expect(mockRpc.invocations).toEqual([['Editor.cursorSet', 4, 0], ['Editor.handleFocus']])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick with :value handles line 1', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorSet': () => {},
    'Editor.handleFocus': () => {},
  })

  const item = { label: '1' }
  const value = ':1'

  const result = await SelectPickGoToLine.selectPick(item, value)

  expect(mockRpc.invocations).toEqual([['Editor.cursorSet', 0, 0], ['Editor.handleFocus']])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick with :value handles large line numbers', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorSet': () => {},
    'Editor.handleFocus': () => {},
  })

  const item = { label: '1' }
  const value = ':100'

  const result = await SelectPickGoToLine.selectPick(item, value)

  expect(mockRpc.invocations).toEqual([['Editor.cursorSet', 99, 0], ['Editor.handleFocus']])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

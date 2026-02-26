import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as GoToPositionAndFocus from '../src/parts/GoToPositionAndFocus/GoToPositionAndFocus.ts'

test('goToPositionAndFocus calls Editor.cursorSet with correct row and column', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorSet': () => {},
    'Editor.handleFocus': () => {},
  })

  await GoToPositionAndFocus.goToPositionAndFocus(5, 10)

  expect(mockRpc.invocations).toEqual([['Editor.cursorSet', 5, 10], ['Editor.handleFocus']])
})

test('goToPositionAndFocus calls Editor.cursorSet before Editor.handleFocus', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorSet': () => {},
    'Editor.handleFocus': () => {},
  })

  await GoToPositionAndFocus.goToPositionAndFocus(0, 0)

  expect(mockRpc.invocations).toEqual([['Editor.cursorSet', 0, 0], ['Editor.handleFocus']])
})

test('goToPositionAndFocus works with different row and column indices', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorSet': () => {},
    'Editor.handleFocus': () => {},
  })

  await GoToPositionAndFocus.goToPositionAndFocus(42, 100)

  expect(mockRpc.invocations).toEqual([['Editor.cursorSet', 42, 100], ['Editor.handleFocus']])
})

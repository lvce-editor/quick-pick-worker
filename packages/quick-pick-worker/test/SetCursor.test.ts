import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as SetCursor from '../src/parts/SetCursor/SetCursor.ts'

test('setCursor calls Editor.cursorSet with correct row and column', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorSet': () => {},
  })

  await SetCursor.setCursor(5, 10)

  expect(mockRpc.invocations).toEqual([['Editor.cursorSet', 5, 10]])
})

test('setCursor works with zero indices', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorSet': () => {},
  })

  await SetCursor.setCursor(0, 0)

  expect(mockRpc.invocations).toEqual([['Editor.cursorSet', 0, 0]])
})

test('setCursor works with different row and column indices', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorSet': () => {},
  })

  await SetCursor.setCursor(42, 100)

  expect(mockRpc.invocations).toEqual([['Editor.cursorSet', 42, 100]])
})

test('setCursor handles large indices', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorSet': () => {},
  })

  await SetCursor.setCursor(1000, 5000)

  expect(mockRpc.invocations).toEqual([['Editor.cursorSet', 1000, 5000]])
})

import { expect, test } from '@jest/globals'
import { EditorWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'
import * as SelectPickGoToColumn from '../src/parts/SelectPickGoToColumn/SelectPickGoToColumn.ts'

test('selectPickGoToColumn with ::value parses column and navigates to position', async () => {
  const editorId = 123
  const lines = ['line 1', 'line 2', 'line 3']

  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorSet': () => {},
    'Editor.handleFocus': () => {},
    'GetActiveEditor.getActiveEditorId': () => editorId,
  })

  using mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLines2': (id: number) => {
      if (id === editorId) {
        return lines
      }
      throw new Error(`unexpected editorId ${id}`)
    },
  })

  const item = { label: '1' }
  const value = '::10'

  const result = await SelectPickGoToColumn.selectPickGoToColumn(item, value)

  expect(mockRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId'], ['Editor.cursorSet', 1, 3], ['Editor.handleFocus']])
  expect(mockEditorRpc.invocations).toEqual([['Editor.getLines2', editorId]])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPickGoToColumn with ::value handles column at newline', async () => {
  const editorId = 456
  const lines = ['line 1', 'line 2']

  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorSet': () => {},
    'Editor.handleFocus': () => {},
    'GetActiveEditor.getActiveEditorId': () => editorId,
  })

  using mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLines2': (id: number) => {
      if (id === editorId) {
        return lines
      }
      throw new Error(`unexpected editorId ${id}`)
    },
  })

  const item = { label: '1' }
  const value = '::7'

  const result = await SelectPickGoToColumn.selectPickGoToColumn(item, value)

  expect(mockRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId'], ['Editor.cursorSet', 1, 0], ['Editor.handleFocus']])
  expect(mockEditorRpc.invocations).toEqual([['Editor.getLines2', editorId]])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPickGoToColumn with ::value handles column 0', async () => {
  const editorId = 789
  const lines = ['line 1']

  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorSet': () => {},
    'Editor.handleFocus': () => {},
    'GetActiveEditor.getActiveEditorId': () => editorId,
  })

  using mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLines2': (id: number) => {
      if (id === editorId) {
        return lines
      }
      throw new Error(`unexpected editorId ${id}`)
    },
  })

  const item = { label: '1' }
  const value = '::0'

  const result = await SelectPickGoToColumn.selectPickGoToColumn(item, value)

  expect(mockRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId'], ['Editor.cursorSet', 0, 0], ['Editor.handleFocus']])
  expect(mockEditorRpc.invocations).toEqual([['Editor.getLines2', editorId]])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

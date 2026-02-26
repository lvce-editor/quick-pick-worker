import { expect, test } from '@jest/globals'
import { EditorWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { getPicksGoToColumn } from '../src/parts/GetPicksGoToColumn/GetPicksGoToColumn.ts'

test('returns instruction when value is "::"', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => 1,
  })

  using mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLines2': (editorId: number) => {
      if (editorId === 1) {
        return ['line1', 'line2', 'line3']
      }
      throw new Error(`unexpected editorId ${editorId}`)
    },
  })

  const result = await getPicksGoToColumn('::')
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: 'Type a character position to go to (from 1 to 17)',
    matches: [],
    uri: '',
  })
  expect(mockRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId']])
  expect(mockEditorRpc.invocations).toEqual([['Editor.getLines2', 1]])
})

test('returns position preview when value starts with "::" and has number', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => 1,
  })

  using mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLines2': (editorId: number) => {
      if (editorId === 1) {
        return ['hello', 'world', 'test']
      }
      throw new Error(`unexpected editorId ${editorId}`)
    },
  })

  const result = await getPicksGoToColumn('::5')
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: "Press 'Enter' to go to line 0 column 5",
    matches: [],
    uri: '',
  })
  expect(mockRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId']])
  expect(mockEditorRpc.invocations).toEqual([['Editor.getLines2', 1]])
})

test('returns position preview for multi-line text', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => 1,
  })

  using mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLines2': (editorId: number) => {
      if (editorId === 1) {
        return ['first line', 'second line', 'third line']
      }
      throw new Error(`unexpected editorId ${editorId}`)
    },
  })

  const result = await getPicksGoToColumn('::15')
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: "Press 'Enter' to go to line 1 column 4",
    matches: [],
    uri: '',
  })
  expect(mockRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId']])
  expect(mockEditorRpc.invocations).toEqual([['Editor.getLines2', 1]])
})

test('returns empty array when value does not start with "::"', async () => {
  const result = await getPicksGoToColumn('')
  expect(result).toHaveLength(0)
})

test('returns empty array for non-colon value', async () => {
  const result = await getPicksGoToColumn('test')
  expect(result).toHaveLength(0)
})

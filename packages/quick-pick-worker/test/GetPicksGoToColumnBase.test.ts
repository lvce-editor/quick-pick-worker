import { expect, test } from '@jest/globals'
import { EditorWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { getPicksGoToColumnBase } from '../src/parts/GetPicksGoToColumnBase/GetPicksGoToColumnBase.ts'

test('returns instruction with text length', async () => {
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

  const result = await getPicksGoToColumnBase()
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

test('handles empty text', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => 1,
  })

  using mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLines2': (editorId: number) => {
      if (editorId === 1) {
        return []
      }
      throw new Error(`unexpected editorId ${editorId}`)
    },
  })

  const result = await getPicksGoToColumnBase()
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: 'Type a character position to go to (from 1 to 0)',
    matches: [],
    uri: '',
  })
  expect(mockRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId']])
  expect(mockEditorRpc.invocations).toEqual([['Editor.getLines2', 1]])
})

test('handles single line text', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => 1,
  })

  using mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLines2': (editorId: number) => {
      if (editorId === 1) {
        return ['hello world']
      }
      throw new Error(`unexpected editorId ${editorId}`)
    },
  })

  const result = await getPicksGoToColumnBase()
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: 'Type a character position to go to (from 1 to 11)',
    matches: [],
    uri: '',
  })
  expect(mockRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId']])
  expect(mockEditorRpc.invocations).toEqual([['Editor.getLines2', 1]])
})

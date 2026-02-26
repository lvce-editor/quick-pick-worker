import { expect, test } from '@jest/globals'
import { EditorWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import * as GetText from '../src/parts/GetText/GetText.ts'

test('returns joined lines from active editor', async () => {
  const editorId = 123
  const lines = ['line 1', 'line 2', 'line 3']

  using mockRpc = RendererWorker.registerMockRpc({
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

  const result = await GetText.getText()

  expect(result).toBe('line 1\nline 2\nline 3')
  expect(mockRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId']])
  expect(mockEditorRpc.invocations).toEqual([['Editor.getLines2', editorId]])
})

test('handles empty lines array', async () => {
  const editorId = 456
  const lines: string[] = []

  using mockRpc = RendererWorker.registerMockRpc({
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

  const result = await GetText.getText()

  expect(result).toBe('')
  expect(mockRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId']])
  expect(mockEditorRpc.invocations).toEqual([['Editor.getLines2', editorId]])
})

test('handles single line', async () => {
  const editorId = 789
  const lines = ['single line']

  using mockRpc = RendererWorker.registerMockRpc({
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

  const result = await GetText.getText()

  expect(result).toBe('single line')
  expect(mockRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId']])
  expect(mockEditorRpc.invocations).toEqual([['Editor.getLines2', editorId]])
})

test('handles lines with empty strings', async () => {
  const editorId = 101
  const lines = ['line 1', '', 'line 3', '']

  using mockRpc = RendererWorker.registerMockRpc({
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

  const result = await GetText.getText()

  expect(result).toBe('line 1\n\nline 3\n')
  expect(mockRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId']])
  expect(mockEditorRpc.invocations).toEqual([['Editor.getLines2', editorId]])
})

test('handles error from getActiveEditorId', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => {
      throw new Error('Failed to get active editor')
    },
  })

  using mockEditorRpc = EditorWorker.registerMockRpc({})

  await expect(GetText.getText()).rejects.toThrow('Failed to get active editor')
  expect(mockRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId']])
  expect(mockEditorRpc.invocations).toEqual([])
})

test('handles error from getLines', async () => {
  const editorId = 202

  using mockRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => editorId,
  })

  using mockEditorRpc = EditorWorker.registerMockRpc({
    'Editor.getLines2': (id: number) => {
      if (id === editorId) {
        throw new Error('Failed to get lines')
      }
      throw new Error(`unexpected editorId ${id}`)
    },
  })

  await expect(GetText.getText()).rejects.toThrow('Failed to get lines')
  expect(mockRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId']])
  expect(mockEditorRpc.invocations).toEqual([['Editor.getLines2', editorId]])
})

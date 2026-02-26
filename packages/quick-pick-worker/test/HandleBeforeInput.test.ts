import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleBeforeInput from '../src/parts/HandleBeforeInput/HandleBeforeInput.ts'
import * as InputEventType from '../src/parts/InputEventType/InputEventType.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

test('inserts text and updates state', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.getColorThemeNames': async () => [],
    'IconTheme.getFileIcon': async () => 'icon',
    'IconTheme.getFolderIcon': async () => 'icon',
  })

  const state = { ...CreateDefaultState.createDefaultState(), providerId: 0, value: 'hello' }
  const result = await HandleBeforeInput.handleBeforeInput(state, InputEventType.InsertText, ' world', 5, 5)

  expect(result.value).toBe('hello world')
  expect(result.cursorOffset).toBe(11)
  expect(result.inputSource).toBe(InputSource.User)
  expect(mockRpc.invocations).toEqual([['ColorTheme.getColorThemeNames', '', 0]])
})

test('replaces selected text', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.getColorThemeNames': async () => [],
    'IconTheme.getFileIcon': async () => 'icon',
    'IconTheme.getFolderIcon': async () => 'icon',
  })

  const state = { ...CreateDefaultState.createDefaultState(), providerId: 0, value: 'hello world' }
  const result = await HandleBeforeInput.handleBeforeInput(state, InputEventType.InsertText, 'hi', 0, 5)

  expect(result.value).toBe('hi world')
  expect(result.cursorOffset).toBe(2)
  expect(result.inputSource).toBe(InputSource.User)
  expect(mockRpc.invocations).toEqual([['ColorTheme.getColorThemeNames', '', 0]])
})

test('deletes character backward', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.getColorThemeNames': async () => [],
    'IconTheme.getFileIcon': async () => 'icon',
    'IconTheme.getFolderIcon': async () => 'icon',
  })

  const state = { ...CreateDefaultState.createDefaultState(), providerId: 0, value: 'hello' }
  const result = await HandleBeforeInput.handleBeforeInput(state, InputEventType.DeleteContentBackward, '', 5, 5)

  expect(result.value).toBe('hell')
  expect(result.cursorOffset).toBe(4)
  expect(result.inputSource).toBe(InputSource.User)
  expect(mockRpc.invocations).toEqual([['ColorTheme.getColorThemeNames', '', 0]])
})

test('deletes character forward', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.getColorThemeNames': async () => [],
    'IconTheme.getFileIcon': async () => 'icon',
    'IconTheme.getFolderIcon': async () => 'icon',
  })

  const state = { ...CreateDefaultState.createDefaultState(), providerId: 0, value: 'hello' }
  const result = await HandleBeforeInput.handleBeforeInput(state, InputEventType.DeleteContentForward, '', 0, 0)

  expect(result.value).toBe('ello')
  expect(result.cursorOffset).toBe(0)
  expect(result.inputSource).toBe(InputSource.User)
  expect(mockRpc.invocations).toEqual([['ColorTheme.getColorThemeNames', '', 0]])
})

test('deletes word backward', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.getColorThemeNames': async () => [],
    'IconTheme.getFileIcon': async () => 'icon',
    'IconTheme.getFolderIcon': async () => 'icon',
  })

  const state = { ...CreateDefaultState.createDefaultState(), providerId: 0, value: 'hello world' }
  const result = await HandleBeforeInput.handleBeforeInput(state, InputEventType.DeleteWordBackward, '', 11, 11)

  expect(result.value).toBe('hello')
  expect(result.cursorOffset).toBe(5)
  expect(result.inputSource).toBe(InputSource.User)
  expect(mockRpc.invocations).toEqual([['ColorTheme.getColorThemeNames', '', 0]])
})

test('deletes word forward', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.getColorThemeNames': async () => [],
    'IconTheme.getFileIcon': async () => 'icon',
    'IconTheme.getFolderIcon': async () => 'icon',
  })

  const state = { ...CreateDefaultState.createDefaultState(), providerId: 0, value: 'hello world' }
  const result = await HandleBeforeInput.handleBeforeInput(state, InputEventType.DeleteWordForward, '', 0, 0)

  expect(result.value).toBe(' world')
  expect(result.cursorOffset).toBe(0)
  expect(result.inputSource).toBe(InputSource.User)
  expect(mockRpc.invocations).toEqual([['ColorTheme.getColorThemeNames', '', 0]])
})

test('handles composition text', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.getColorThemeNames': async () => [],
    'IconTheme.getFileIcon': async () => 'icon',
    'IconTheme.getFolderIcon': async () => 'icon',
  })

  const state = { ...CreateDefaultState.createDefaultState(), providerId: 0, value: 'hello' }
  const result = await HandleBeforeInput.handleBeforeInput(state, InputEventType.InsertCompositionText, ' world', 5, 5)

  expect(result.value).toBe('hello world')
  expect(result.cursorOffset).toBe(11)
  expect(result.inputSource).toBe(InputSource.User)
  expect(mockRpc.invocations).toEqual([['ColorTheme.getColorThemeNames', '', 0]])
})

test('handles line break', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.getColorThemeNames': async () => [],
    'IconTheme.getFileIcon': async () => 'icon',
    'IconTheme.getFolderIcon': async () => 'icon',
  })

  const state = { ...CreateDefaultState.createDefaultState(), providerId: 0, value: 'hello\nworld' }
  const result = await HandleBeforeInput.handleBeforeInput(state, InputEventType.InsertLineBreak, '', 5, 5)

  expect(result.value).toBe('hello\nworld')
  expect(result.cursorOffset).toBe(5)
  expect(result.inputSource).toBe(InputSource.User)
  expect(mockRpc.invocations).toEqual([])
})

test('handles insert from paste', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.getColorThemeNames': async () => [],
    'IconTheme.getFileIcon': async () => 'icon',
    'IconTheme.getFolderIcon': async () => 'icon',
  })

  const state = { ...CreateDefaultState.createDefaultState(), value: 'hello' }
  const result = await HandleBeforeInput.handleBeforeInput(state, InputEventType.InsertFromPaste, ' world', 5, 5)

  expect(result.value).toBe('hello world')
  expect(result.cursorOffset).toBe(11)
  expect(result.inputSource).toBe(InputSource.User)
  expect(mockRpc.invocations).toEqual([['ColorTheme.getColorThemeNames', '', 0]])
})

test('preserves other state properties', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.getColorThemeNames': async () => [],
    'IconTheme.getFileIcon': async () => 'icon',
    'IconTheme.getFolderIcon': async () => 'icon',
  })

  const state = {
    ...CreateDefaultState.createDefaultState(),
    height: 500,
    providerId: 0,
    uid: 42,
    value: 'old',
  }
  const result = await HandleBeforeInput.handleBeforeInput(state, InputEventType.InsertText, 'new', 3, 3)

  expect(result.uid).toBe(42)
  expect(result.height).toBe(500)
  expect(result.value).toBe('oldnew')
  expect(result.inputSource).toBe(InputSource.User)
  expect(mockRpc.invocations).toEqual([['ColorTheme.getColorThemeNames', '', 0]])
})

test('throws error for invalid inputType', async () => {
  const state = { ...CreateDefaultState.createDefaultState(), providerId: 0, value: 'test' }
  await expect(async () => {
    await HandleBeforeInput.handleBeforeInput(state, undefined as unknown as string, '', 0, 0)
  }).rejects.toThrow()
})

test('throws error for invalid selectionStart', async () => {
  const state = { ...CreateDefaultState.createDefaultState(), providerId: 0, value: 'test' }
  await expect(async () => {
    await HandleBeforeInput.handleBeforeInput(state, InputEventType.InsertText, '', 'invalid' as unknown as number, 0)
  }).rejects.toThrow()
})

test('throws error for invalid selectionEnd', async () => {
  const state = { ...CreateDefaultState.createDefaultState(), providerId: 0, value: 'test' }
  await expect(async () => {
    await HandleBeforeInput.handleBeforeInput(state, InputEventType.InsertText, '', 0, 'invalid' as unknown as number)
  }).rejects.toThrow()
})

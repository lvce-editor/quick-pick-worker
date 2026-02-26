import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleInput from '../src/parts/HandleInput/HandleInput.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

test('updates cursorOffset and inputSource when value is the same', async () => {
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    cursorOffset: 0,
    inputSource: InputSource.Script,
    value: 'test',
  }
  const result = await HandleInput.handleInput(state, 'test', 5, InputSource.User)
  expect(result).not.toBe(state)
  expect(result.value).toBe('test')
  expect(result.cursorOffset).toBe(5)
  expect(result.inputSource).toBe(InputSource.User)
})

test('calls SetValue.setValue and updates cursorOffset and inputSource', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.getColorThemeNames': () => [],
    'GetQuickPickFileIcons.getQuickPickFileIcons': () => ({ icons: [], newFileIconCache: Object.create(null) }),
  })

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    value: 'old',
  }
  const newValue = 'new'
  const cursorOffset = 3
  const inputSource = InputSource.User

  const result = await HandleInput.handleInput(state, newValue, cursorOffset, inputSource)

  expect(result.value).toBe(newValue)
  expect(result.cursorOffset).toBe(cursorOffset)
  expect(result.inputSource).toBe(inputSource)
  expect(result).not.toBe(state)
  expect(mockRpc.invocations).toEqual([['ColorTheme.getColorThemeNames', '', 0]])
})

test('uses default inputSource when not provided', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.getColorThemeNames': () => [],
    'GetQuickPickFileIcons.getQuickPickFileIcons': () => ({ icons: [], newFileIconCache: Object.create(null) }),
  })

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    value: 'old',
  }
  const newValue = 'new'
  const cursorOffset = 2

  const result = await HandleInput.handleInput(state, newValue, cursorOffset)

  expect(result.value).toBe(newValue)
  expect(result.cursorOffset).toBe(cursorOffset)
  expect(result.inputSource).toBe(InputSource.Script)
  expect(mockRpc.invocations).toEqual([['ColorTheme.getColorThemeNames', '', 0]])
})

test('preserves other state properties from SetValue.setValue result', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.getColorThemeNames': () => [],
    'GetQuickPickFileIcons.getQuickPickFileIcons': () => ({ icons: [], newFileIconCache: Object.create(null) }),
  })

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    height: 500,
    uid: 42,
    value: 'old',
  }
  const newValue = 'new'
  const cursorOffset = 1

  const result = await HandleInput.handleInput(state, newValue, cursorOffset)

  expect(result.uid).toBe(42)
  expect(result.height).toBe(500)
  expect(result.value).toBe(newValue)
  expect(result.cursorOffset).toBe(cursorOffset)
  expect(mockRpc.invocations).toEqual([['ColorTheme.getColorThemeNames', '', 0]])
})

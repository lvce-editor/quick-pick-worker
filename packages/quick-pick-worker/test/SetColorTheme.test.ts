import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { setColorTheme } from '../src/parts/SetColorTheme/SetColorTheme.js'

test('setColorTheme should invoke ColorTheme.setColorTheme with the provided id', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.setColorTheme': () => {},
  })

  const colorThemeId = 'dark-plus'
  await setColorTheme(colorThemeId)

  expect(mockRpc.invocations).toEqual([['ColorTheme.setColorTheme', colorThemeId]])
})

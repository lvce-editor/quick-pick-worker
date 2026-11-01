import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { commandMap } from '../src/parts/CommandMap/CommandMap.ts'
import * as ViewletModuleId from '../src/parts/ViewletModuleId/ViewletModuleId.ts'

test.each([
  ['end-of-line', []],
  ['indentation', []],
  ['language-mode', []],
  ['go-to-line', [3, 5]],
])('opens the %s picker', async (picker, args) => {
  using rendererRpc = RendererWorker.registerMockRpc({
    'Viewlet.openWidget': async () => {},
  })

  await commandMap['QuickPick.openStatusBarPicker'](picker, ...args)

  expect(rendererRpc.invocations).toEqual([['Viewlet.openWidget', ViewletModuleId.QuickPick, picker, ...args]])
})

import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'
import { selectPick } from '../src/parts/SelectPickIndentation/SelectPickIndentation.ts'

test('changes the active editor indentation mode', async () => {
  using mockRendererRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => 7,
    'Viewlet.executeViewletCommand': () => {},
  })
  const pick = { value: false } as ProtoVisibleItem

  const result = await selectPick(pick)

  expect(mockRendererRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId'], ['Viewlet.executeViewletCommand', 7, 'setIndentation', false]])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'
import { selectPick } from '../src/parts/SelectPickLanguageMode/SelectPickLanguageMode.ts'

test('selectPick changes the active editor language id', async () => {
  using mockRendererRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => 7,
    'Viewlet.executeViewletCommand': () => {},
  })
  const pick: ProtoVisibleItem = {
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: 'xyz',
    matches: [],
    uri: '',
    value: {
      languageId: 'xyz',
      tokenizePath: '/extensions/test/tokenizeXyz.js',
    },
  }

  const result = await selectPick(pick)

  expect(mockRendererRpc.invocations).toEqual([
    ['GetActiveEditor.getActiveEditorId'],
    ['Viewlet.executeViewletCommand', 7, 'setLanguageId', 'xyz', '/extensions/test/tokenizeXyz.js'],
  ])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

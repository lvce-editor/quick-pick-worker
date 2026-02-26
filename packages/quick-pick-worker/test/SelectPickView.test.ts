import { expect, test } from '@jest/globals'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'
import * as SelectPickView from '../src/parts/SelectPickView/SelectPickView.ts'

test('selectPick returns Hide command', async () => {
  const pick = {
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: 'test-view',
    matches: [],
    uri: '/path/to/view',
  }

  const result = await SelectPickView.selectPick(pick)

  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick returns Hide command for different view labels', async () => {
  const pick = {
    description: 'View description',
    direntType: 1,
    fileIcon: 'file-icon',
    icon: 'icon',
    label: 'another-view',
    matches: [1, 2, 3],
    uri: '/another/path',
  }

  const result = await SelectPickView.selectPick(pick)

  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

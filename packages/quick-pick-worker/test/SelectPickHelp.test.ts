import { expect, test } from '@jest/globals'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'
import * as SelectPickHelp from '../src/parts/SelectPickHelp/SelectPickHelp.ts'

test('selectPick returns Hide command', async () => {
  const pick = {
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: 'Help',
    matches: [],
    uri: '',
  }

  const result = await SelectPickHelp.selectPick(pick)

  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick returns Hide command for different pick items', async () => {
  const pick = {
    description: 'Help description',
    direntType: 1,
    fileIcon: 'file-icon',
    icon: 'icon',
    label: 'Another Help Item',
    matches: [1, 2, 3],
    uri: '/some/uri',
  }

  const result = await SelectPickHelp.selectPick(pick)

  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

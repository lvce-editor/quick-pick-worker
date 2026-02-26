import { expect, test } from '@jest/globals'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'
import { selectPick } from '../src/parts/SelectPickWorkspaceSymbol/SelectPickWorkspaceSymbol.ts'

test('selectPick returns Hide command', async () => {
  const pick: ProtoVisibleItem = {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: 'test-symbol',
    matches: [],
    uri: '',
  }

  const result = await selectPick(pick)

  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick handles different pick properties', async () => {
  const pick: ProtoVisibleItem = {
    description: 'symbol description',
    direntType: 0,
    fileIcon: 'file-icon',
    icon: 'icon',
    label: 'another-symbol',
    matches: [],
    uri: '/path/to/file',
  }

  const result = await selectPick(pick)

  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick returns Hide command for all pick types', async () => {
  const picks: ProtoVisibleItem[] = [
    {
      description: '',
      direntType: 1,
      fileIcon: '',
      icon: '',
      label: 'symbol1',
      matches: [],
      uri: '',
    },
    {
      description: 'desc',
      direntType: 0,
      fileIcon: 'icon',
      icon: 'i',
      label: 'symbol2',
      matches: [],
      uri: '/path',
    },
  ]

  for (const pick of picks) {
    const result = await selectPick(pick)
    expect(result.command).toBe(QuickPickReturnValue.Hide)
  }
})

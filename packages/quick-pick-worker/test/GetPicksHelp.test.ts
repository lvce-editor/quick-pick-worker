import { expect, test } from '@jest/globals'
import * as Character from '../src/parts/Character/Character.ts'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import * as GetPicksHelp from '../src/parts/GetPicksHelp/GetPicksHelp.ts'
import * as QuickPickStrings from '../src/parts/QuickPickStrings/QuickPickStrings.ts'

test('getPicks returns all help items', async () => {
  const result = await GetPicksHelp.getPicks()

  expect(result).toHaveLength(6)
  expect(result[0]).toEqual({
    description: QuickPickStrings.goToFile(),
    direntType: DirentType.None,
    fileIcon: '',
    icon: '',
    label: Character.DotDotDot,
    matches: [],
    uri: '',
  })
  expect(result[1]).toEqual({
    description: QuickPickStrings.goToLineColumn(),
    direntType: DirentType.None,
    fileIcon: '',
    icon: '',
    label: ':',
    matches: [],
    uri: '',
  })
  expect(result[2]).toEqual({
    description: QuickPickStrings.goToSymbolInEditor(),
    direntType: DirentType.None,
    fileIcon: '',
    icon: '',
    label: Character.Colon,
    matches: [],
    uri: '',
  })
  expect(result[3]).toEqual({
    description: QuickPickStrings.searchForText(),
    direntType: DirentType.None,
    fileIcon: '',
    icon: '',
    label: Character.Percent,
    matches: [],
    uri: '',
  })
  expect(result[4]).toEqual({
    description: QuickPickStrings.showAndRunCommands(),
    direntType: DirentType.None,
    fileIcon: '',
    icon: '',
    label: Character.AngleBracket,
    matches: [],
    uri: '',
  })
  expect(result[5]).toEqual({
    description: QuickPickStrings.openView(),
    direntType: DirentType.None,
    fileIcon: '',
    icon: '',
    label: Character.View,
    matches: [],
    uri: '',
  })
})

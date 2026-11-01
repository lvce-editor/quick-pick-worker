import { expect, test } from '@jest/globals'
import * as GetQuickPickInputAriaLabel from '../src/parts/GetQuickPickInputAriaLabel/GetQuickPickInputAriaLabel.ts'
import * as QuickPickEntryId from '../src/parts/QuickPickEntryId/QuickPickEntryId.ts'

test.each([
  [QuickPickEntryId.ColorTheme, '', '', 'Select Color Theme'],
  [QuickPickEntryId.Commands, '', '', 'Type the name of a command to run.'],
  [QuickPickEntryId.Custom, '', 'Select a branch', 'Select a branch'],
  [QuickPickEntryId.Custom, '', '', 'Quick open'],
  [QuickPickEntryId.File, '', '', 'Go to file'],
  [QuickPickEntryId.EveryThing, ':', '', 'Go to Line / Column'],
  [QuickPickEntryId.EveryThing, '@', '', 'Go to Symbol in Editor'],
  [QuickPickEntryId.EveryThing, '#', '', 'Go to Symbol in Workspace'],
  [QuickPickEntryId.EveryThing, 'view ', '', 'Open View'],
  [QuickPickEntryId.LanguageMode, '', '', 'Select Language Mode'],
  [QuickPickEntryId.Recent, '', '', 'Select to open'],
  [QuickPickEntryId.Noop, '', '', 'Quick open'],
])('getQuickPickInputAriaLabel(%s, %s)', (providerId, value, placeholder, expected) => {
  expect(GetQuickPickInputAriaLabel.getQuickPickInputAriaLabel(providerId, value, placeholder)).toBe(expected)
})

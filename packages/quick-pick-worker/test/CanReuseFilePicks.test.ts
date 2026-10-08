import { expect, test } from '@jest/globals'
import * as CanReuseFilePicks from '../src/parts/CanReuseFilePicks/CanReuseFilePicks.ts'
import * as QuickPickEntryId from '../src/parts/QuickPickEntryId/QuickPickEntryId.ts'

test('allows narrowing complete file picks', () => {
  expect(CanReuseFilePicks.canReuseFilePicks(QuickPickEntryId.File, 'a', 'ab', 400)).toBe(true)
})

test('allows narrowing file picks from the everything provider', () => {
  expect(CanReuseFilePicks.canReuseFilePicks(QuickPickEntryId.EveryThing, 'a', 'ab', 400)).toBe(true)
})

test('does not reuse picks when the file search result limit was reached', () => {
  expect(CanReuseFilePicks.canReuseFilePicks(QuickPickEntryId.File, 'a', 'ab', 9_999_999)).toBe(false)
})

test('does not reuse picks when the query broadens or changes', () => {
  expect(CanReuseFilePicks.canReuseFilePicks(QuickPickEntryId.File, 'ab', 'a', 400)).toBe(false)
  expect(CanReuseFilePicks.canReuseFilePicks(QuickPickEntryId.File, 'a', 'bc', 400)).toBe(false)
})

test('does not reuse picks when input changes to a different provider', () => {
  expect(CanReuseFilePicks.canReuseFilePicks(QuickPickEntryId.EveryThing, 'a', '>ab', 400)).toBe(false)
})

test('does not reuse picks for providers other than file search', () => {
  expect(CanReuseFilePicks.canReuseFilePicks(QuickPickEntryId.Commands, 'a', 'ab', 400)).toBe(false)
})

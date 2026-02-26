import { expect, test } from '@jest/globals'
import * as GetDefaultValue from '../src/parts/GetDefaultValue/GetDefaultValue.ts'
import * as QuickPickEntryId from '../src/parts/QuickPickEntryId/QuickPickEntryId.ts'

test('returns > for quickPick://everything', () => {
  expect(GetDefaultValue.getDefaultValue(QuickPickEntryId.EveryThing)).toBe('>')
})

test('returns empty string for unknown uri', () => {
  expect(GetDefaultValue.getDefaultValue(999)).toBe('')
})

test('returns empty string for empty uri', () => {
  expect(GetDefaultValue.getDefaultValue(-1)).toBe('')
})

test('returns empty string for undefined uri', () => {
  // @ts-ignore
  expect(GetDefaultValue.getDefaultValue(undefined)).toBe('')
})

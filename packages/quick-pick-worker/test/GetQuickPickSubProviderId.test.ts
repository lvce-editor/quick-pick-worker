import { expect, test } from '@jest/globals'
import * as GetQuickPickSubProviderId from '../src/parts/GetQuickPickSubProviderId/GetQuickPickSubProviderId.ts'
import * as QuickPickEntryId from '../src/parts/QuickPickEntryId/QuickPickEntryId.ts'
import * as QuickPickPrefix from '../src/parts/QuickPickPrefix/QuickPickPrefix.ts'

test('returns id directly when id is not EveryThing', () => {
  const result = GetQuickPickSubProviderId.getQuickPickSubProviderId(QuickPickEntryId.File, QuickPickPrefix.Command)
  expect(result).toBe(QuickPickEntryId.File)
})

test('returns Commands when id is EveryThing and prefix is Command', () => {
  const result = GetQuickPickSubProviderId.getQuickPickSubProviderId(QuickPickEntryId.EveryThing, QuickPickPrefix.Command)
  expect(result).toBe(QuickPickEntryId.Commands)
})

test('returns GoToLine when id is EveryThing and prefix is GoToLine', () => {
  const result = GetQuickPickSubProviderId.getQuickPickSubProviderId(QuickPickEntryId.EveryThing, QuickPickPrefix.GoToLine)
  expect(result).toBe(QuickPickEntryId.GoToLine)
})

test('returns Help when id is EveryThing and prefix is Help', () => {
  const result = GetQuickPickSubProviderId.getQuickPickSubProviderId(QuickPickEntryId.EveryThing, QuickPickPrefix.Help)
  expect(result).toBe(QuickPickEntryId.Help)
})

test('returns Symbol when id is EveryThing and prefix is Symbol', () => {
  const result = GetQuickPickSubProviderId.getQuickPickSubProviderId(QuickPickEntryId.EveryThing, QuickPickPrefix.Symbol)
  expect(result).toBe(QuickPickEntryId.Symbol)
})

test('returns View when id is EveryThing and prefix is View', () => {
  const result = GetQuickPickSubProviderId.getQuickPickSubProviderId(QuickPickEntryId.EveryThing, QuickPickPrefix.View)
  expect(result).toBe(QuickPickEntryId.View)
})

test('returns WorkspaceSymbol when id is EveryThing and prefix is WorkspaceSymbol', () => {
  const result = GetQuickPickSubProviderId.getQuickPickSubProviderId(QuickPickEntryId.EveryThing, QuickPickPrefix.WorkspaceSymbol)
  expect(result).toBe(QuickPickEntryId.WorkspaceSymbol)
})

test('returns File when id is EveryThing and prefix is None', () => {
  const result = GetQuickPickSubProviderId.getQuickPickSubProviderId(QuickPickEntryId.EveryThing, QuickPickPrefix.None)
  expect(result).toBe(QuickPickEntryId.File)
})

test('returns File when id is EveryThing and prefix is unknown', () => {
  const result = GetQuickPickSubProviderId.getQuickPickSubProviderId(QuickPickEntryId.EveryThing, 'unknown-prefix')
  expect(result).toBe(QuickPickEntryId.File)
})

test('returns id when id is ColorTheme regardless of prefix', () => {
  const result = GetQuickPickSubProviderId.getQuickPickSubProviderId(QuickPickEntryId.ColorTheme, QuickPickPrefix.Command)
  expect(result).toBe(QuickPickEntryId.ColorTheme)
})

test('returns id when id is Custom regardless of prefix', () => {
  const result = GetQuickPickSubProviderId.getQuickPickSubProviderId(QuickPickEntryId.Custom, QuickPickPrefix.Symbol)
  expect(result).toBe(QuickPickEntryId.Custom)
})

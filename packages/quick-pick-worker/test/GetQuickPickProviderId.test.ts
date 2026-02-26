import { expect, test } from '@jest/globals'
import * as GetQuickPickProviderId from '../src/parts/GetQuickPickProviderId/GetQuickPickProviderId.ts'
import * as QuickPickEntryId from '../src/parts/QuickPickEntryId/QuickPickEntryId.ts'
import * as QuickPickEntryUri from '../src/parts/QuickPickEntryUri/QuickPickEntryUri.ts'

test('returns ColorTheme when prefix is ColorTheme', () => {
  const result = GetQuickPickProviderId.getQuickPickProviderId(QuickPickEntryUri.ColorTheme)
  expect(result).toBe(QuickPickEntryId.ColorTheme)
})

test('returns EveryThing when prefix is Commands', () => {
  const result = GetQuickPickProviderId.getQuickPickProviderId(QuickPickEntryUri.Commands)
  expect(result).toBe(QuickPickEntryId.EveryThing)
})

test('returns EveryThing when prefix is EveryThing', () => {
  const result = GetQuickPickProviderId.getQuickPickProviderId(QuickPickEntryUri.EveryThing)
  expect(result).toBe(QuickPickEntryId.EveryThing)
})

test('returns EveryThing when prefix is GoToLine', () => {
  const result = GetQuickPickProviderId.getQuickPickProviderId(QuickPickEntryUri.GoToLine)
  expect(result).toBe(QuickPickEntryId.EveryThing)
})

test('returns EveryThing when prefix is Help', () => {
  const result = GetQuickPickProviderId.getQuickPickProviderId(QuickPickEntryUri.Help)
  expect(result).toBe(QuickPickEntryId.EveryThing)
})

test('returns EveryThing when prefix is Symbol', () => {
  const result = GetQuickPickProviderId.getQuickPickProviderId(QuickPickEntryUri.Symbol)
  expect(result).toBe(QuickPickEntryId.EveryThing)
})

test('returns EveryThing when prefix is View', () => {
  const result = GetQuickPickProviderId.getQuickPickProviderId(QuickPickEntryUri.View)
  expect(result).toBe(QuickPickEntryId.EveryThing)
})

test('returns EveryThing when prefix is WorkspaceSymbol', () => {
  const result = GetQuickPickProviderId.getQuickPickProviderId(QuickPickEntryUri.WorkspaceSymbol)
  expect(result).toBe(QuickPickEntryId.EveryThing)
})

test('returns Custom when prefix is Custom', () => {
  const result = GetQuickPickProviderId.getQuickPickProviderId(QuickPickEntryUri.Custom)
  expect(result).toBe(QuickPickEntryId.Custom)
})

test('returns Recent when prefix is Recent', () => {
  const result = GetQuickPickProviderId.getQuickPickProviderId(QuickPickEntryUri.Recent)
  expect(result).toBe(QuickPickEntryId.Recent)
})

test('returns File when prefix is File', () => {
  const result = GetQuickPickProviderId.getQuickPickProviderId(QuickPickEntryUri.File)
  expect(result).toBe(QuickPickEntryId.File)
})

test('returns File when prefix is unknown', () => {
  const result = GetQuickPickProviderId.getQuickPickProviderId('unknown-prefix')
  expect(result).toBe(QuickPickEntryId.File)
})

test('returns File when prefix is CommandPalette', () => {
  const result = GetQuickPickProviderId.getQuickPickProviderId(QuickPickEntryUri.CommandPalette)
  expect(result).toBe(QuickPickEntryId.File)
})

test('returns File when prefix is Noop', () => {
  const result = GetQuickPickProviderId.getQuickPickProviderId(QuickPickEntryUri.Noop)
  expect(result).toBe(QuickPickEntryId.File)
})

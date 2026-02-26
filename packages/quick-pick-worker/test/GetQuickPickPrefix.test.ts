import { test, expect } from '@jest/globals'
import { getQuickPickPrefix } from '../src/parts/GetQuickPickPrefix/GetQuickPickPrefix.js'
import * as QuickPickPrefix from '../src/parts/QuickPickPrefix/QuickPickPrefix.js'

test('returns Command prefix for value starting with >', () => {
  expect(getQuickPickPrefix('>command')).toBe(QuickPickPrefix.Command)
})

test('returns Symbol prefix for value starting with @', () => {
  expect(getQuickPickPrefix('@symbol')).toBe(QuickPickPrefix.Symbol)
})

test('returns WorkspaceSymbol prefix for value starting with #', () => {
  expect(getQuickPickPrefix('#workspace')).toBe(QuickPickPrefix.WorkspaceSymbol)
})

test('returns GoToLine prefix for value starting with :', () => {
  expect(getQuickPickPrefix(':42')).toBe(QuickPickPrefix.GoToLine)
})

test('returns View prefix for value starting with view', () => {
  expect(getQuickPickPrefix('view something')).toBe(QuickPickPrefix.View)
})

test('returns None for value with no known prefix', () => {
  expect(getQuickPickPrefix('random')).toBe(QuickPickPrefix.None)
})

test('returns None for empty string', () => {
  expect(getQuickPickPrefix('')).toBe(QuickPickPrefix.None)
})

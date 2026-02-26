import { test, expect } from '@jest/globals'
import * as GetHelpEntries from '../src/parts/GetHelpEntries/GetHelpEntries.ts'
import * as QuickPickPrefix from '../src/parts/QuickPickPrefix/QuickPickPrefix.ts'

test('getHelpEntries returns command help entries for command provider', () => {
  const result = GetHelpEntries.getHelpEntries(QuickPickPrefix.Command)
  expect(result).toEqual([
    {
      category: 'global commands',
      description: 'Show And Run Commands',
    },
  ])
})

test('getHelpEntries returns file help entries for none provider', () => {
  const result = GetHelpEntries.getHelpEntries(QuickPickPrefix.None)
  expect(result).toEqual([
    {
      category: 'global commands',
      description: 'Go to file',
    },
  ])
})

test('getHelpEntries returns empty array for other providers', () => {
  const result = GetHelpEntries.getHelpEntries(QuickPickPrefix.Symbol)
  expect(result).toEqual([])
})

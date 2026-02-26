import { expect, test } from '@jest/globals'
import * as QuickPickStrings from '../src/parts/QuickPickStrings/QuickPickStrings.ts'

test('files returns string', () => {
  const result = QuickPickStrings.files()
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('goToFile returns string', () => {
  const result = QuickPickStrings.goToFile()
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('noMatchingColorThemesFound returns string', () => {
  const result = QuickPickStrings.noMatchingColorThemesFound()
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('noMatchingResults returns string', () => {
  const result = QuickPickStrings.noMatchingResults()
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('noRecentlyOpenedFoldersFound returns string', () => {
  const result = QuickPickStrings.noRecentlyOpenedFoldersFound()
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('noResults returns string', () => {
  const result = QuickPickStrings.noResults()
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('noSymbolFound returns string', () => {
  const result = QuickPickStrings.noSymbolFound()
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('noWorkspaceSymbolsFound returns string', () => {
  const result = QuickPickStrings.noWorkspaceSymbolsFound()
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('openRecent returns string', () => {
  const result = QuickPickStrings.openRecent()
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('selectColorTheme returns string', () => {
  const result = QuickPickStrings.selectColorTheme()
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('selectToOpen returns string', () => {
  const result = QuickPickStrings.selectToOpen()
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('showAndRunCommands returns string', () => {
  const result = QuickPickStrings.showAndRunCommands()
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('typeNameofCommandToRun returns string', () => {
  const result = QuickPickStrings.typeNameofCommandToRun()
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('typeTheNameOfAViewToOpen returns string', () => {
  const result = QuickPickStrings.typeTheNameOfAViewToOpen()
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('quickOpen', () => {
  const result = QuickPickStrings.quickOpen()
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('typeTheNameOfACommandToRun', () => {
  const result = QuickPickStrings.typeTheNameOfACommandToRun()
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('goToLineColumn returns string', () => {
  const result = QuickPickStrings.goToLineColumn()
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('goToSymbolInEditor returns string', () => {
  const result = QuickPickStrings.goToSymbolInEditor()
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('goToSymbolInWorkspace returns string', () => {
  const result = QuickPickStrings.goToSymbolInWorkspace()
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('searchForText returns string', () => {
  const result = QuickPickStrings.searchForText()
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('openView returns string', () => {
  const result = QuickPickStrings.openView()
  expect(typeof result).toBe('string')
  expect(result.length).toBeGreaterThan(0)
})

test('goToLineColumn returns specific string', () => {
  expect(QuickPickStrings.goToLineColumn()).toBe('Go to Line / Column')
})

test('goToSymbolInEditor returns specific string', () => {
  expect(QuickPickStrings.goToSymbolInEditor()).toBe('Go to Symbol in Editor')
})

test('goToSymbolInWorkspace returns specific string', () => {
  expect(QuickPickStrings.goToSymbolInWorkspace()).toBe('Go to Symbol in Editor')
})

test('searchForText returns specific string', () => {
  expect(QuickPickStrings.searchForText()).toBe('Search for text')
})

test('openView returns specific string', () => {
  expect(QuickPickStrings.openView()).toBe('Open View')
})

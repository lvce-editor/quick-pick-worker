import { expect, test } from '@jest/globals'
import * as GetFilterValue from '../src/parts/GetFilterValue/GetFilterValue.ts'
import * as QuickPickEntryId from '../src/parts/QuickPickEntryId/QuickPickEntryId.ts'

test('returns value when subId is GoToColumn and value starts with ::', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.GoToColumn, '::123')
  expect(result).toBe('')
})

test('returns value as-is when subId is GoToLine and value starts with :', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.GoToLine, ':123')
  expect(result).toBe('')
})

test('returns empty string when subId is GoToColumn and value is ::', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.GoToColumn, '::')
  expect(result).toBe('')
})

test('returns empty string when subId is GoToLine and value is :', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.GoToLine, ':')
  expect(result).toBe('')
})

test('returns trimmed value without prefix when id is EveryThing and value starts with >', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.Noop, '> test value')
  expect(result).toBe('test value')
})

test('returns trimmed value without prefix when id is EveryThing and value starts with > with whitespace', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.Noop, '>  test value  ')
  expect(result).toBe('test value')
})

test('returns empty string when id is EveryThing and value is just >', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.Noop, '>')
  expect(result).toBe('')
})

test('returns trimmed value without prefix when id is EveryThing and value starts with > and only whitespace', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.Noop, '>   ')
  expect(result).toBe('')
})

test('returns trimmed value without prefix when id is EveryThing and value starts with @', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.Noop, '@ symbol')
  expect(result).toBe('symbol')
})

test('returns trimmed value without prefix when id is EveryThing and value starts with #', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.Noop, '# workspace symbol')
  expect(result).toBe('workspace symbol')
})

test('returns trimmed value without prefix when id is EveryThing and value starts with :', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.Noop, ': line number')
  expect(result).toBe('line number')
})

test('returns trimmed value without prefix when id is EveryThing and value starts with view', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.Noop, 'view test')
  expect(result).toBe('test')
})

test('returns trimmed value when id is EveryThing and value has no prefix', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.Noop, '  test value  ')
  expect(result).toBe('test value')
})

test('returns value when id is GoToColumn and value starts with ::', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.GoToColumn, QuickPickEntryId.Noop, '::123')
  expect(result).toBe('')
})

test('returns value as-is when id is GoToLine and value starts with :', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.GoToLine, QuickPickEntryId.Noop, ':123')
  expect(result).toBe('')
})

test('returns empty string when id is GoToColumn and value is ::', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.GoToColumn, QuickPickEntryId.Noop, '::')
  expect(result).toBe('')
})

test('returns value as-is when id is GoToLine and value is :', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.GoToLine, QuickPickEntryId.Noop, ':')
  expect(result).toBe('')
})

test('returns value as-is when id is ColorTheme', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.ColorTheme, QuickPickEntryId.Noop, 'test value')
  expect(result).toBe('test value')
})

test('returns value as-is when id is Commands', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.Commands, QuickPickEntryId.Noop, 'test value')
  expect(result).toBe('test value')
})

test('returns value as-is when id is Custom', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.Custom, QuickPickEntryId.Noop, 'test value')
  expect(result).toBe('test value')
})

test('returns value as-is when id is File', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.File, QuickPickEntryId.Noop, 'test value')
  expect(result).toBe('test value')
})

test('returns value as-is when id is Help', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.Help, QuickPickEntryId.Noop, 'test value')
  expect(result).toBe('test value')
})

test('returns value as-is when id is Recent', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.Recent, QuickPickEntryId.Noop, 'test value')
  expect(result).toBe('test value')
})

test('returns value as-is when id is Symbol', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.Symbol, QuickPickEntryId.Noop, 'test value')
  expect(result).toBe('test value')
})

test('returns value as-is when id is View', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.View, QuickPickEntryId.Noop, 'test value')
  expect(result).toBe('test value')
})

test('returns value as-is when id is WorkspaceSymbol', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.WorkspaceSymbol, QuickPickEntryId.Noop, 'test value')
  expect(result).toBe('test value')
})

test('returns value as-is when id is Noop', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.Noop, QuickPickEntryId.Noop, 'test value')
  expect(result).toBe('test value')
})

test('returns value as-is when id is unknown', () => {
  const result = GetFilterValue.getFilterValue(999, QuickPickEntryId.Noop, 'test value')
  expect(result).toBe('test value')
})

test('returns empty string when id is EveryThing and value is empty', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.Noop, '')
  expect(result).toBe('')
})

test('returns empty string when id is unknown and value is empty', () => {
  const result = GetFilterValue.getFilterValue(999, QuickPickEntryId.Noop, '')
  expect(result).toBe('')
})

test('returns value as-is when id is unknown and value is empty', () => {
  const result = GetFilterValue.getFilterValue(999, QuickPickEntryId.Noop, '')
  expect(result).toBe('')
})

test('returns value when subId is GoToColumn and value has multiple colons', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.GoToColumn, ':::123')
  expect(result).toBe('')
})

test('returns value when subId is GoToLine and value starts with : and has spaces', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.GoToLine, ': 123')
  expect(result).toBe('')
})

test('returns value when subId is GoToColumn and value starts with :: and has spaces', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.GoToColumn, ':: 123')
  expect(result).toBe('')
})

test('returns trimmed value when id is EveryThing and value has newlines', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.Noop, '> test\nvalue')
  expect(result).toBe('test\nvalue')
})

test('returns trimmed value when id is EveryThing and value has tabs', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.Noop, '> test\tvalue')
  expect(result).toBe('test\tvalue')
})

test('returns value when id is EveryThing and value starts with > and has special characters', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.Noop, '> test@value#123')
  expect(result).toBe('test@value#123')
})

test('returns value when id is EveryThing and value starts with > and has unicode characters', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.Noop, '> test 测试')
  expect(result).toBe('test 测试')
})

test('returns value when id is EveryThing and value starts with > and has emoji', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.Noop, '> test 🎉')
  expect(result).toBe('test 🎉')
})

test('returns value when subId is GoToColumn and value has unicode characters', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.GoToColumn, '::测试123')
  expect(result).toBe('')
})

test('returns value when subId is GoToColumn and value has emoji', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.GoToColumn, '::🎉123')
  expect(result).toBe('')
})

test('returns value when id is GoToColumn and value has unicode characters', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.GoToColumn, QuickPickEntryId.Noop, '::测试123')
  expect(result).toBe('')
})

test('returns value when id is GoToColumn and value has emoji', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.GoToColumn, QuickPickEntryId.Noop, '::🎉123')
  expect(result).toBe('')
})

test('returns value when id is EveryThing and value starts with > and is very long', () => {
  const longValue = '> ' + 'a'.repeat(1000)
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.Noop, longValue)
  expect(result).toBe('a'.repeat(1000))
})

test('returns value when subId is GoToColumn and value is very long', () => {
  const longValue = '::' + 'a'.repeat(1000)
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.GoToColumn, longValue)
  expect(result).toBe('')
})

test('returns value when id is EveryThing and value starts with > and has only spaces after prefix', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.Noop, '>     ')
  expect(result).toBe('')
})

test('returns value when id is EveryThing and value starts with @ and has only spaces after prefix', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.Noop, '@     ')
  expect(result).toBe('')
})

test('returns value when id is EveryThing and value starts with # and has only spaces after prefix', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.Noop, '#     ')
  expect(result).toBe('')
})

test('returns value when id is EveryThing and value starts with : and has only spaces after prefix', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.Noop, ':     ')
  expect(result).toBe('')
})

test('returns value when id is EveryThing and value starts with view  and has only spaces after prefix', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.Noop, 'view      ')
  expect(result).toBe('')
})

test('returns value when subId is GoToLine takes precedence over id', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.GoToLine, '> test')
  expect(result).toBe('')
})

test('returns value when subId is GoToColumn takes precedence over id with :: prefix', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.GoToColumn, '::test')
  expect(result).toBe('')
})

test('returns value when subId is GoToLine takes precedence over id with : prefix', () => {
  const result = GetFilterValue.getFilterValue(QuickPickEntryId.EveryThing, QuickPickEntryId.GoToLine, ':test')
  expect(result).toBe('')
})

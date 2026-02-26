import { test, expect } from '@jest/globals'
import { getNewValueInsertLineBreak } from '../src/parts/GetNewValueInsertLineBreak/GetNewValueInsertLineBreak.ts'

test('preserves value and moves cursor to end of selection', () => {
  const result = getNewValueInsertLineBreak('hello world', 0, 5, '')
  expect(result).toEqual({
    cursorOffset: 5,
    newValue: 'hello world',
  })
})

test('handles empty string', () => {
  const result = getNewValueInsertLineBreak('', 0, 0, '')
  expect(result).toEqual({
    cursorOffset: 0,
    newValue: '',
  })
})

test('handles cursor at end', () => {
  const result = getNewValueInsertLineBreak('hello', 5, 5, '')
  expect(result).toEqual({
    cursorOffset: 5,
    newValue: 'hello',
  })
})

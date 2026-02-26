import { test, expect } from '@jest/globals'
import { getNewValueInsertText } from '../src/parts/GetNewValueInsertText/GetNewValueInsertText.ts'

test('inserts text at end', () => {
  const result = getNewValueInsertText('hello', 5, 5, ' world')
  expect(result).toEqual({
    cursorOffset: 11,
    newValue: 'hello world',
  })
})

test('inserts text in middle', () => {
  const result = getNewValueInsertText('hello world', 5, 5, ' beautiful')
  expect(result).toEqual({
    cursorOffset: 15,
    newValue: 'hello beautiful world',
  })
})

test('replaces selected text', () => {
  const result = getNewValueInsertText('hello world', 0, 5, 'hi')
  expect(result).toEqual({
    cursorOffset: 2,
    newValue: 'hi world',
  })
})

import { test, expect } from '@jest/globals'
import { getNewValueDeleteWordForward } from '../src/parts/GetNewValueDeleteWordForward/GetNewValueDeleteWordForward.ts'

test('deletes word after cursor', () => {
  const result = getNewValueDeleteWordForward('hello world', 0, 0, '')
  expect(result).toEqual({
    cursorOffset: 0,
    newValue: ' world',
  })
})

test('deletes selected text', () => {
  const result = getNewValueDeleteWordForward('hello beautiful world', 6, 15, '')
  expect(result).toEqual({
    cursorOffset: 6,
    newValue: 'hello  world',
  })
})

test('deletes partial word', () => {
  const result = getNewValueDeleteWordForward('hello world', 3, 3, '')
  expect(result).toEqual({
    cursorOffset: 3,
    newValue: 'hel world',
  })
})

test('handles end of string', () => {
  const result = getNewValueDeleteWordForward('hello', 5, 5, '')
  expect(result).toEqual({
    cursorOffset: 5,
    newValue: 'hello',
  })
})

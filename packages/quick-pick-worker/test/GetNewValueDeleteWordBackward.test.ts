import { test, expect } from '@jest/globals'
import { getNewValueDeleteWordBackward } from '../src/parts/GetNewValueDeleteWordBackward/GetNewValueDeleteWordBackward.ts'

test('deletes word before cursor', () => {
  const result = getNewValueDeleteWordBackward('hello world', 11, 11, '')
  expect(result).toEqual({
    cursorOffset: 5,
    newValue: 'hello',
  })
})

test('deletes selected text', () => {
  const result = getNewValueDeleteWordBackward('hello beautiful world', 6, 15, '')
  expect(result).toEqual({
    cursorOffset: 6,
    newValue: 'hello  world',
  })
})

test('deletes partial word', () => {
  const result = getNewValueDeleteWordBackward('hello world', 8, 8, '')
  expect(result).toEqual({
    cursorOffset: 5,
    newValue: 'hellorld',
  })
})

test('handles empty string', () => {
  const result = getNewValueDeleteWordBackward('', 0, 0, '')
  expect(result).toEqual({
    cursorOffset: 0,
    newValue: '',
  })
})

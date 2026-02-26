import { test, expect } from '@jest/globals'
import { getNewValueDeleteContentBackward } from '../src/parts/GetNewValueDeleteContentBackward/GetNewValueDeleteContentBackward.ts'

test('deletes character before cursor', () => {
  const result = getNewValueDeleteContentBackward('hello', 5, 5, '')
  expect(result).toEqual({
    cursorOffset: 4,
    newValue: 'hell',
  })
})

test('deletes selected text', () => {
  const result = getNewValueDeleteContentBackward('hello world', 0, 5, '')
  expect(result).toEqual({
    cursorOffset: 0,
    newValue: ' world',
  })
})

test('deletes character in middle', () => {
  const result = getNewValueDeleteContentBackward('hello world', 5, 5, '')
  expect(result).toEqual({
    cursorOffset: 4,
    newValue: 'hell world',
  })
})

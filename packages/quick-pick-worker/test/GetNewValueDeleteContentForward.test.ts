import { test, expect } from '@jest/globals'
import { getNewValueDeleteContentForward } from '../src/parts/GetNewValueDeleteContentForward/GetNewValueDeleteContentForward.ts'

test('deletes character after cursor', () => {
  const result = getNewValueDeleteContentForward('hello', 0, 0, '')
  expect(result).toEqual({
    cursorOffset: 0,
    newValue: 'ello',
  })
})

test('deletes selected text', () => {
  const result = getNewValueDeleteContentForward('hello world', 0, 5, '')
  expect(result).toEqual({
    cursorOffset: 0,
    newValue: ' world',
  })
})

test('deletes character in middle', () => {
  const result = getNewValueDeleteContentForward('hello world', 5, 5, '')
  expect(result).toEqual({
    cursorOffset: 5,
    newValue: 'helloworld',
  })
})

test('handles end of string', () => {
  const result = getNewValueDeleteContentForward('hello', 5, 5, '')
  expect(result).toEqual({
    cursorOffset: 5,
    newValue: 'hello',
  })
})

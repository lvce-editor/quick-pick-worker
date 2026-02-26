import { expect, test } from '@jest/globals'
import * as SplitLines from '../src/parts/SplitLines/SplitLines.ts'

test('empty', () => {
  const content = ''
  expect(SplitLines.splitLines(content)).toEqual([])
})

test('one line', () => {
  const content = 'a'
  expect(SplitLines.splitLines(content)).toEqual(['a'])
})

test('two lines', () => {
  const content = 'a\nb'
  expect(SplitLines.splitLines(content)).toEqual(['a', 'b'])
})

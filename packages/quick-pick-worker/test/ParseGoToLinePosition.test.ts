import { expect, test } from '@jest/globals'
import { parseGoToLinePosition } from '../src/parts/ParseGoToLinePosition/ParseGoToLinePosition.ts'

test('parses a line', () => {
  expect(parseGoToLinePosition(':3')).toEqual({ columnIndex: 0, rowIndex: 2 })
})

test('parses a line and column', () => {
  expect(parseGoToLinePosition(':3:5')).toEqual({ columnIndex: 4, rowIndex: 2 })
})

test('rejects invalid positions', () => {
  expect(parseGoToLinePosition(':0:1')).toBeUndefined()
  expect(parseGoToLinePosition(':1:0')).toBeUndefined()
  expect(parseGoToLinePosition(':one')).toBeUndefined()
})

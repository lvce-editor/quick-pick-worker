import { expect, test } from '@jest/globals'
import * as ListIndex from '../src/parts/ListIndex/ListIndex.ts'

test('first returns 0', () => {
  expect(ListIndex.first()).toBe(0)
})

test('last returns correct index', () => {
  const items = ['a', 'b', 'c']
  expect(ListIndex.last(items)).toBe(2)
})

test('last returns -1 for empty array', () => {
  const items: string[] = []
  expect(ListIndex.last(items)).toBe(-1)
})

test('next returns next index', () => {
  const items = ['a', 'b', 'c']
  expect(ListIndex.next(items, 0)).toBe(1)
  expect(ListIndex.next(items, 1)).toBe(2)
})

test('next cycles back to start', () => {
  const items = ['a', 'b', 'c']
  expect(ListIndex.next(items, 2)).toBe(0)
})

test('nextNoCycle returns next index', () => {
  const items = ['a', 'b', 'c']
  expect(ListIndex.nextNoCycle(items, 0)).toBe(1)
  expect(ListIndex.nextNoCycle(items, 1)).toBe(2)
})

test('nextNoCycle stays at end', () => {
  const items = ['a', 'b', 'c']
  expect(ListIndex.nextNoCycle(items, 2)).toBe(2)
})

test('previous returns previous index', () => {
  const items = ['a', 'b', 'c']
  expect(ListIndex.previous(items, 1)).toBe(0)
  expect(ListIndex.previous(items, 2)).toBe(1)
})

test('previous cycles to end', () => {
  const items = ['a', 'b', 'c']
  expect(ListIndex.previous(items, 0)).toBe(2)
})

test('previousNoCycle returns previous index', () => {
  const items = ['a', 'b', 'c']
  expect(ListIndex.previousNoCycle(items, 1)).toBe(0)
  expect(ListIndex.previousNoCycle(items, 2)).toBe(1)
})

test('previousNoCycle stays at start', () => {
  const items = ['a', 'b', 'c']
  expect(ListIndex.previousNoCycle(items, 0)).toBe(0)
})

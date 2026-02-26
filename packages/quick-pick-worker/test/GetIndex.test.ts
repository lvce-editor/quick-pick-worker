import { expect, test } from '@jest/globals'
import * as GetIndex from '../src/parts/GetIndex/GetIndex.ts'

test('calculates index for first item', () => {
  const top = 100
  const headerHeight = 50
  const itemHeight = 30
  const y = 150
  const result = GetIndex.getIndex(top, headerHeight, itemHeight, y)
  expect(result).toBe(0)
})

test('calculates index for second item', () => {
  const top = 100
  const headerHeight = 50
  const itemHeight = 30
  const y = 180
  const result = GetIndex.getIndex(top, headerHeight, itemHeight, y)
  expect(result).toBe(1)
})

test('calculates index for third item', () => {
  const top = 100
  const headerHeight = 50
  const itemHeight = 30
  const y = 210
  const result = GetIndex.getIndex(top, headerHeight, itemHeight, y)
  expect(result).toBe(2)
})

test('floors fractional results', () => {
  const top = 100
  const headerHeight = 50
  const itemHeight = 30
  const y = 195
  const result = GetIndex.getIndex(top, headerHeight, itemHeight, y)
  expect(result).toBe(1)
})

test('handles different item heights', () => {
  const top = 0
  const headerHeight = 20
  const itemHeight = 50
  const y = 120
  const result = GetIndex.getIndex(top, headerHeight, itemHeight, y)
  expect(result).toBe(2)
})

test('handles different header heights', () => {
  const top = 50
  const headerHeight = 100
  const itemHeight = 25
  const y = 200
  const result = GetIndex.getIndex(top, headerHeight, itemHeight, y)
  expect(result).toBe(2)
})

test('returns negative index when clicking above items', () => {
  const top = 100
  const headerHeight = 50
  const itemHeight = 30
  const y = 140
  const result = GetIndex.getIndex(top, headerHeight, itemHeight, y)
  expect(result).toBe(-1)
})

test('handles zero top position', () => {
  const top = 0
  const headerHeight = 40
  const itemHeight = 20
  const y = 60
  const result = GetIndex.getIndex(top, headerHeight, itemHeight, y)
  expect(result).toBe(1)
})

test('handles zero header height', () => {
  const top = 50
  const headerHeight = 0
  const itemHeight = 30
  const y = 80
  const result = GetIndex.getIndex(top, headerHeight, itemHeight, y)
  expect(result).toBe(1)
})

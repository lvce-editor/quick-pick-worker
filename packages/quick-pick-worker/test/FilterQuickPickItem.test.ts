import { expect, test } from '@jest/globals'
import * as FilterQuickPickItem from '../src/parts/FilterQuickPickItem/FilterQuickPickItem.ts'

test('returns empty array for empty pattern', () => {
  const result = FilterQuickPickItem.filterQuickPickItem('', 'test')
  expect(result).toEqual([])
})

test('returns empty array for empty word', () => {
  const result = FilterQuickPickItem.filterQuickPickItem('test', '')
  expect(result).toEqual([])
})

test('returns empty array for no match', () => {
  const result = FilterQuickPickItem.filterQuickPickItem('xyz', 'test')
  expect(result).toEqual([])
})

test('returns matches for exact match', () => {
  const result = FilterQuickPickItem.filterQuickPickItem('test', 'test')
  expect(result.length).toBeGreaterThan(0)
})

test('returns matches for partial match', () => {
  const result = FilterQuickPickItem.filterQuickPickItem('te', 'test')
  expect(result.length).toBeGreaterThan(0)
})

test('returns matches for case insensitive match', () => {
  const result = FilterQuickPickItem.filterQuickPickItem('TEST', 'test')
  expect(result.length).toBeGreaterThan(0)
})

test('returns matches for scattered characters', () => {
  const result = FilterQuickPickItem.filterQuickPickItem('ts', 'test')
  expect(result.length).toBeGreaterThan(0)
})

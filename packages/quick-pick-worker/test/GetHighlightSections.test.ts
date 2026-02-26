import { test, expect } from '@jest/globals'
import { emptyHighlightSections } from '../src/parts/EmptyHighlightSections/EmptyHighlightSections.ts'
import { getHighlightSections } from '../src/parts/GetHighlightSections/GetHighlightSections.ts'

test('returns empty sections when no highlights', () => {
  expect(getHighlightSections([], 'test')).toBe(emptyHighlightSections)
})

test('creates single highlight section', () => {
  const result = getHighlightSections([0, 4], 'test')
  expect(result).toEqual([{ highlighted: true, text: 'test' }])
})

test('creates highlight with text before and after', () => {
  const result = getHighlightSections([1, 3], 'test')
  expect(result).toEqual([
    { highlighted: false, text: 't' },
    { highlighted: true, text: 'es' },
    { highlighted: false, text: 't' },
  ])
})

test('creates multiple highlight sections', () => {
  const result = getHighlightSections([1, 3, 5, 7], 'testtest')
  expect(result).toEqual([
    { highlighted: false, text: 't' },
    { highlighted: true, text: 'es' },
    { highlighted: false, text: 'tt' },
    { highlighted: true, text: 'es' },
    { highlighted: false, text: 't' },
  ])
})

test('handles highlights at start and end', () => {
  const result = getHighlightSections([0, 2, 4, 6], 'testtest')
  expect(result).toEqual([
    { highlighted: true, text: 'te' },
    { highlighted: false, text: 'st' },
    { highlighted: true, text: 'te' },
    { highlighted: false, text: 'st' },
  ])
})

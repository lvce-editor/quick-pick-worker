import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetHighlights from '../src/parts/GetHighlights/GetHighlights.ts'
import { getHighlightSections } from '../src/parts/GetHighlightSections/GetHighlightSections.ts'

test('getHighlights - empty highlights', () => {
  const result = GetHighlights.getHighlights([], 'test')
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.QuickPickItemLabel,
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    text: 'test',
    type: 12,
  })
})

test('getHighlights - single highlight', () => {
  const sections = getHighlightSections([1, 3], 'test')
  const result = GetHighlights.getHighlights(sections, 'test')
  expect(result).toHaveLength(5)
  expect(result[0]).toEqual({
    childCount: 3,
    className: ClassNames.QuickPickItemLabel,
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    text: 't',
    type: 12,
  })
  expect(result[2]).toEqual({
    childCount: 1,
    className: ClassNames.QuickPickHighlight,
    type: VirtualDomElements.Span,
  })
  expect(result[3]).toEqual({
    childCount: 0,
    text: 'es',
    type: 12,
  })
  expect(result[4]).toEqual({
    childCount: 0,
    text: 't',
    type: 12,
  })
})

test('getHighlights - multiple highlights', () => {
  const sections = getHighlightSections([1, 3, 5, 7], 'testtest')
  const result = GetHighlights.getHighlights(sections, 'testtest')
  expect(result).toHaveLength(8)
  expect(result[0]).toEqual({
    childCount: 5,
    className: ClassNames.QuickPickItemLabel,
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    text: 't',
    type: 12,
  })
  expect(result[2]).toEqual({
    childCount: 1,
    className: ClassNames.QuickPickHighlight,
    type: VirtualDomElements.Span,
  })
  expect(result[3]).toEqual({
    childCount: 0,
    text: 'es',
    type: 12,
  })
  expect(result[4]).toEqual({
    childCount: 0,
    text: 'tt',
    type: 12,
  })
  expect(result[5]).toEqual({
    childCount: 1,
    className: ClassNames.QuickPickHighlight,
    type: VirtualDomElements.Span,
  })
  expect(result[6]).toEqual({
    childCount: 0,
    text: 'es',
    type: 12,
  })
  expect(result[7]).toEqual({
    childCount: 0,
    text: 't',
    type: 12,
  })
})

test('getHighlights - highlight at start', () => {
  const sections = getHighlightSections([0, 2], 'test')
  const result = GetHighlights.getHighlights(sections, 'test')
  expect(result).toHaveLength(4)
  expect(result[0]).toEqual({
    childCount: 2,
    className: ClassNames.QuickPickItemLabel,
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 1,
    className: ClassNames.QuickPickHighlight,
    type: VirtualDomElements.Span,
  })
  expect(result[2]).toEqual({
    childCount: 0,
    text: 'te',
    type: 12,
  })
  expect(result[3]).toEqual({
    childCount: 0,
    text: 'st',
    type: 12,
  })
})

test('getHighlights - highlight at end', () => {
  const sections = getHighlightSections([2, 4], 'test')
  const result = GetHighlights.getHighlights(sections, 'test')
  expect(result).toHaveLength(4)
  expect(result[0]).toEqual({
    childCount: 2,
    className: ClassNames.QuickPickItemLabel,
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    text: 'te',
    type: 12,
  })
  expect(result[2]).toEqual({
    childCount: 1,
    className: ClassNames.QuickPickHighlight,
    type: VirtualDomElements.Span,
  })
  expect(result[3]).toEqual({
    childCount: 0,
    text: 'st',
    type: 12,
  })
})

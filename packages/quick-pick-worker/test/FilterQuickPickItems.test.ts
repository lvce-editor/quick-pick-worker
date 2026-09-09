import { expect, test } from '@jest/globals'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import * as FilterQuickPickItems from '../src/parts/FilterQuickPickItems/FilterQuickPickItems.ts'

test('returns all items when value is empty', () => {
  const items: readonly ProtoVisibleItem[] = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: '/test/file.txt', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: '/test/other.txt', matches: [], uri: '' },
  ]
  const result = FilterQuickPickItems.filterQuickPickItems(items, '')
  expect(result).toEqual([
    { description: '', direntType: 1, fileIcon: '', icon: '', label: '/test/file.txt', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: '/test/other.txt', matches: [], uri: '' },
  ])
})

test('filters items based on label match', () => {
  const items: readonly ProtoVisibleItem[] = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file.txt', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'other.txt', matches: [], uri: '' },
  ]
  const result = FilterQuickPickItems.filterQuickPickItems(items, 'file')
  const expectedResult = [{ description: '', direntType: 1, fileIcon: '', icon: '', label: 'file.txt', matches: [38, 0, 4], uri: '' }]
  expect(result).toEqual(expectedResult)
})

test('handles no matches', () => {
  const items: readonly ProtoVisibleItem[] = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: '/test/file.txt', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: '/test/other.txt', matches: [], uri: '' },
  ]
  const result = FilterQuickPickItems.filterQuickPickItems(items, 'xyz')
  expect(result).toEqual([])
})

test('handles multiple matches', () => {
  const items: readonly ProtoVisibleItem[] = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file1.txt', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file2.txt', matches: [], uri: '' },
  ]
  const result = FilterQuickPickItems.filterQuickPickItems(items, 'file')
  const expectedResult = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file1.txt', matches: [38, 0, 4], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file2.txt', matches: [38, 0, 4], uri: '' },
  ]
  expect(result).toEqual(expectedResult)
})

test('handles empty items array', () => {
  const items: readonly ProtoVisibleItem[] = []
  const result = FilterQuickPickItems.filterQuickPickItems(items, 'test')
  expect(result).toEqual([])
})

test('handles case insensitive matching', () => {
  const items: readonly ProtoVisibleItem[] = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'File.txt', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'other.txt', matches: [], uri: '' },
  ]
  const result = FilterQuickPickItems.filterQuickPickItems(items, 'file')
  const expectedResult = [{ description: '', direntType: 1, fileIcon: '', icon: '', label: 'File.txt', matches: [38, 0, 4], uri: '' }]
  expect(result).toEqual(expectedResult)
})

const createItems = (labels: readonly string[]): readonly ProtoVisibleItem[] => {
  return labels.map((label) => ({ description: '', direntType: 0, fileIcon: '', icon: '', label, matches: [], uri: '' }))
}

test.each(['ssh', 'SSH', 'sSh'])('ranks exact and contiguous command matches above scattered matches for %s', (value) => {
  const items = createItems(['Focus: Search', 'Developer: Crash Shared Process', 'Remote SSH: Connect', 'SSH: Connect', 'ssh', 'No match'])
  const result = FilterQuickPickItems.filterQuickPickItems(items, value, true)
  expect(result.map((item) => item.label)).toEqual(['ssh', 'SSH: Connect', 'Remote SSH: Connect', 'Developer: Crash Shared Process', 'Focus: Search'])
  expect(result.find((item) => item.label === 'SSH: Connect')?.matches.slice(1)).toEqual([0, 3])
  expect(items.every((item) => item.matches.length === 0)).toBe(true)
})

test('preserves provider order for an empty command query', () => {
  const items = createItems(['Focus: Search', 'SSH: Connect'])
  expect(FilterQuickPickItems.filterQuickPickItems(items, '', true)).toBe(items)
})

test('preserves provider order for other pickers', () => {
  const items = createItems(['Focus: Search', 'SSH: Connect'])
  expect(FilterQuickPickItems.filterQuickPickItems(items, 'ssh').map((item) => item.label)).toEqual(['Focus: Search', 'SSH: Connect'])
})

test('preserves command order when match ranks and fuzzy scores tie', () => {
  const items = createItems(['Layout: Toggle Side Bar', 'Layout: Toggle Panel'])
  expect(FilterQuickPickItems.filterQuickPickItems(items, 'layout', true).map((item) => item.label)).toEqual(items.map((item) => item.label))
})

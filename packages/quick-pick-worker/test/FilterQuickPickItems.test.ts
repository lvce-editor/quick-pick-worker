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

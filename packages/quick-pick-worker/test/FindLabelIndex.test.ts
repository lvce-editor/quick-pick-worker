import { expect, test } from '@jest/globals'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import * as FindLabelIndex from '../src/parts/FindLabelIndex/FindLabelIndex.ts'

test('finds index of item with matching label', () => {
  const items: readonly ProtoVisibleItem[] = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'first', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'second', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'third', matches: [], uri: '' },
  ]
  const result = FindLabelIndex.findLabelIndex(items, 'second')
  expect(result).toBe(1)
})

test('returns -1 when label is not found', () => {
  const items: readonly ProtoVisibleItem[] = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'first', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'second', matches: [], uri: '' },
  ]
  const result = FindLabelIndex.findLabelIndex(items, 'nonexistent')
  expect(result).toBe(-1)
})

test('returns -1 for empty array', () => {
  const items: readonly ProtoVisibleItem[] = []
  const result = FindLabelIndex.findLabelIndex(items, 'test')
  expect(result).toBe(-1)
})

test('finds first occurrence when multiple items have same label', () => {
  const items: readonly ProtoVisibleItem[] = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'first', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'duplicate', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'duplicate', matches: [], uri: '' },
  ]
  const result = FindLabelIndex.findLabelIndex(items, 'duplicate')
  expect(result).toBe(1)
})

test('handles case-sensitive labels', () => {
  const items: readonly ProtoVisibleItem[] = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'Test', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'test', matches: [], uri: '' },
  ]
  const result = FindLabelIndex.findLabelIndex(items, 'test')
  expect(result).toBe(1)
})

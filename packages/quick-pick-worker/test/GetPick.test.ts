import { expect, jest, test } from '@jest/globals'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import * as GetPick from '../src/parts/GetPick/GetPick.ts'

test('returns pick at valid index', () => {
  const items: readonly ProtoVisibleItem[] = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item1', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item2', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item3', matches: [], uri: '' },
  ]
  const result = GetPick.getPick(items, 1)
  expect(result).toEqual({ description: '', direntType: 1, fileIcon: '', icon: '', label: 'item2', matches: [], uri: '' })
})

test('returns undefined for index out of bounds', () => {
  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
  const items: readonly ProtoVisibleItem[] = [{ description: '', direntType: 1, fileIcon: '', icon: '', label: 'item1', matches: [], uri: '' }]
  const result = GetPick.getPick(items, 5)
  expect(result).toBeUndefined()
  expect(consoleSpy).toHaveBeenCalledWith('no pick matching index', 5)
  consoleSpy.mockRestore()
})

test('throws error if items is not an array', () => {
  expect(() => GetPick.getPick('not an array' as unknown as readonly ProtoVisibleItem[], 0)).toThrow()
})

test('throws error if index is not a number', () => {
  const items: readonly ProtoVisibleItem[] = [{ description: '', direntType: 1, fileIcon: '', icon: '', label: 'item1', matches: [], uri: '' }]
  expect(() => GetPick.getPick(items, 'not a number' as unknown as number)).toThrow()
})

test('handles empty array', () => {
  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
  const result = GetPick.getPick([], 0)
  expect(result).toBeUndefined()
  expect(consoleSpy).toHaveBeenCalledWith('no pick matching index', 0)
  consoleSpy.mockRestore()
})

test('returns undefined for negative index', () => {
  const items: readonly ProtoVisibleItem[] = [{ description: '', direntType: 1, fileIcon: '', icon: '', label: 'item1', matches: [], uri: '' }]
  const result = GetPick.getPick(items, -1)
  expect(result).toBeUndefined()
})

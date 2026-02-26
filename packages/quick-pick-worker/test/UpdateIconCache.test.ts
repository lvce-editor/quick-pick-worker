import { test, expect } from '@jest/globals'
import type { FileIconCache } from '../src/parts/FileIconCache/FileIconCache.ts'
import type { IconRequest } from '../src/parts/IconRequest/IconRequest.ts'
import { updateIconCache } from '../src/parts/UpdateIconCache/UpdateIconCache.ts'

test('should return original cache when no missing requests', () => {
  const iconCache: FileIconCache = {
    '/path/to/file1.ts': 'file-icon-1',
    '/path/to/file2.ts': 'file-icon-2',
  }
  const missingRequests: readonly IconRequest[] = []
  const newIcons: readonly string[] = []

  const result = updateIconCache(iconCache, missingRequests, newIcons)

  expect(result).toBe(iconCache)
  expect(result).toEqual({
    '/path/to/file1.ts': 'file-icon-1',
    '/path/to/file2.ts': 'file-icon-2',
  })
})

test('should update cache with new icons for missing requests', () => {
  const iconCache: FileIconCache = {
    '/path/to/file1.ts': 'file-icon-1',
  }
  const missingRequests: readonly IconRequest[] = [
    { name: 'file2.ts', path: '/path/to/file2.ts', type: 1 },
    { name: 'file3.ts', path: '/path/to/file3.ts', type: 1 },
  ]
  const newIcons: readonly string[] = ['new-icon-2', 'new-icon-3']

  const result = updateIconCache(iconCache, missingRequests, newIcons)

  expect(result).toEqual({
    '/path/to/file1.ts': 'file-icon-1',
    '/path/to/file2.ts': 'new-icon-2',
    '/path/to/file3.ts': 'new-icon-3',
  })
})

test('should not modify original cache object', () => {
  const iconCache: FileIconCache = {
    '/path/to/file1.ts': 'file-icon-1',
  }
  const missingRequests: readonly IconRequest[] = [{ name: 'file2.ts', path: '/path/to/file2.ts', type: 1 }]
  const newIcons: readonly string[] = ['new-icon-2']

  const result = updateIconCache(iconCache, missingRequests, newIcons)

  expect(result).not.toBe(iconCache)
  expect(iconCache).toEqual({
    '/path/to/file1.ts': 'file-icon-1',
  })
})

test('should handle empty cache with new requests', () => {
  const iconCache: FileIconCache = {}
  const missingRequests: readonly IconRequest[] = [
    { name: 'file1.ts', path: '/path/to/file1.ts', type: 1 },
    { name: 'file2.ts', path: '/path/to/file2.ts', type: 1 },
  ]
  const newIcons: readonly string[] = ['icon-1', 'icon-2']

  const result = updateIconCache(iconCache, missingRequests, newIcons)

  expect(result).toEqual({
    '/path/to/file1.ts': 'icon-1',
    '/path/to/file2.ts': 'icon-2',
  })
})

test('should handle single request and icon', () => {
  const iconCache: FileIconCache = {}
  const missingRequests: readonly IconRequest[] = [{ name: 'file.ts', path: '/path/to/file.ts', type: 1 }]
  const newIcons: readonly string[] = ['single-icon']

  const result = updateIconCache(iconCache, missingRequests, newIcons)

  expect(result).toEqual({
    '/path/to/file.ts': 'single-icon',
  })
})

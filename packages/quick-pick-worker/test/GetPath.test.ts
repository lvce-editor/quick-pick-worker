import { test, expect } from '@jest/globals'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import { getPath } from '../src/parts/GetPath/GetPath.ts'

test('getPath', () => {
  const dirent = {
    name: 'file.txt',
    path: '/test/file.txt',
    type: DirentType.File,
  }

  const result = getPath(dirent)

  expect(result).toBe('/test/file.txt')
})
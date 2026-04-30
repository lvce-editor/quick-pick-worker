import { test, expect } from '@jest/globals'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import { toDirent } from '../src/parts/ToDirent/ToDirent.ts'

test('toDirent', () => {
  const pick = {
    description: '',
    direntType: DirentType.File,
    fileIcon: '',
    icon: '',
    label: 'file.txt',
    matches: [],
    uri: '/test/file.txt',
  }

  const result = toDirent(pick)

  expect(result).toEqual({
    name: 'file.txt',
    path: '/test/file.txt',
    type: DirentType.File,
  })
})
import { expect, test } from '@jest/globals'
import * as GetFileSearchRipGrepArgs from '../src/parts/GetFileSearchRipGrepArgs/GetFileSearchRipGrepArgs.ts'

test('getFileSearchRipGrepArgs', () => {
  const args = GetFileSearchRipGrepArgs.getFileSearchRipGrepArgs()
  expect(args).toEqual(['--files', '--sort-files', '--hidden', '--glob', '!.git'])
})

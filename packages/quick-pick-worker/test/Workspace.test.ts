import { expect, test } from '@jest/globals'
import * as Workspace from '../src/parts/Workspace/Workspace.ts'

test('pathBaseName - returns file name from path', () => {
  expect(Workspace.pathBaseName('/test/file.txt')).toBe('file.txt')
})

test('pathBaseName - returns file name from nested path', () => {
  expect(Workspace.pathBaseName('/test/folder/subfolder/file.txt')).toBe('file.txt')
})

test('pathBaseName - returns entire string when no separator', () => {
  expect(Workspace.pathBaseName('file.txt')).toBe('file.txt')
})

test('pathDirName - returns directory path', () => {
  expect(Workspace.pathDirName('/test/file.txt')).toBe('/test')
})

test('pathDirName - returns empty string when no separator', () => {
  expect(Workspace.pathDirName('file.txt')).toBe('')
})

test('pathDirName - returns nested directory path', () => {
  expect(Workspace.pathDirName('/test/folder/subfolder/file.txt')).toBe('/test/folder/subfolder')
})

import { expect, test } from '@jest/globals'
import * as GetProtocol from '../src/parts/GetProtocol/GetProtocol.ts'

test('extracts protocol from uri with protocol', () => {
  expect(GetProtocol.getProtocol('file:///test.txt')).toBe('file')
})

test('extracts protocol from uri with different protocol', () => {
  expect(GetProtocol.getProtocol('memfs:///test.txt')).toBe('memfs')
})

test('handles uri without protocol', () => {
  expect(GetProtocol.getProtocol('test.txt')).toBe('')
})

test('handles empty string', () => {
  expect(GetProtocol.getProtocol('')).toBe('')
})

test('handles protocol with hyphens', () => {
  expect(GetProtocol.getProtocol('custom-protocol:///test.txt')).toBe('custom-protocol')
})

test('handles protocol without slashes', () => {
  expect(GetProtocol.getProtocol('file:')).toBe('')
})

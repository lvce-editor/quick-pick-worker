import { expect, test } from '@jest/globals'
import * as GetListHeight from '../src/parts/GetListHeight/GetListHeight.ts'

test('returns itemHeight when itemsLength is 0', () => {
  const itemHeight = 20
  const maxHeight = 100
  expect(GetListHeight.getListHeight(0, itemHeight, maxHeight)).toBe(itemHeight)
})

test('returns totalHeight when totalHeight is less than maxHeight', () => {
  const itemsLength = 3
  const itemHeight = 20
  const maxHeight = 100
  const expectedHeight = itemsLength * itemHeight
  expect(GetListHeight.getListHeight(itemsLength, itemHeight, maxHeight)).toBe(expectedHeight)
})

test('returns maxHeight when totalHeight is greater than maxHeight', () => {
  const itemsLength = 10
  const itemHeight = 20
  const maxHeight = 100
  expect(GetListHeight.getListHeight(itemsLength, itemHeight, maxHeight)).toBe(maxHeight)
})

test('returns maxHeight when totalHeight equals maxHeight', () => {
  const itemsLength = 5
  const itemHeight = 20
  const maxHeight = 100
  expect(GetListHeight.getListHeight(itemsLength, itemHeight, maxHeight)).toBe(maxHeight)
})

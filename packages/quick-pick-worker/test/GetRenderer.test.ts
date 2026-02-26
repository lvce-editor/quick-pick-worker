import { expect, test } from '@jest/globals'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as GetRenderer from '../src/parts/GetRenderer/GetRenderer.ts'
import * as RenderCursorOffset from '../src/parts/RenderCursorOffset/RenderCursorOffset.ts'
import * as RenderFocus from '../src/parts/RenderFocus/RenderFocus.ts'
import * as RenderFocusedIndex from '../src/parts/RenderFocusedIndex/RenderFocusedIndex.ts'
import * as RenderHeight from '../src/parts/RenderHeight/RenderHeight.ts'
import * as RenderItems from '../src/parts/RenderItems/RenderItems.ts'
import * as RenderValue from '../src/parts/RenderValue/RenderValue.ts'

test('returns correct renderer for RenderValue', () => {
  const renderer = GetRenderer.getRenderer(DiffType.RenderValue)
  expect(renderer).toBe(RenderValue.renderValue)
})

test('returns correct renderer for RenderCursorOffset', () => {
  const renderer = GetRenderer.getRenderer(DiffType.RenderCursorOffset)
  expect(renderer).toBe(RenderCursorOffset.renderCursorOffset)
})

test('returns correct renderer for RenderItems', () => {
  const renderer = GetRenderer.getRenderer(DiffType.RenderItems)
  expect(renderer).toBe(RenderItems.renderItems)
})

test('returns correct renderer for RenderFocusedIndex', () => {
  const renderer = GetRenderer.getRenderer(DiffType.RenderFocusedIndex)
  expect(renderer).toBe(RenderFocusedIndex.renderFocusedIndex)
})

test('returns correct renderer for Height', () => {
  const renderer = GetRenderer.getRenderer(DiffType.Height)
  expect(renderer).toBe(RenderHeight.renderHeight)
})

test('returns correct renderer for RenderFocus', () => {
  const renderer = GetRenderer.getRenderer(DiffType.RenderFocus)
  expect(renderer).toBe(RenderFocus.renderFocus)
})

test('throws error for unknown renderer type', () => {
  expect(() => GetRenderer.getRenderer(999)).toThrow('unknown renderer')
})

import { expect, test } from '@jest/globals'
import * as GetScrollBarSize from '../src/parts/GetScrollBarSize/GetScrollBarSize.ts'

test('returns 0 when size equals contentSize', () => {
  const size = 100
  const contentSize = 100
  const minimumSliderSize = 10
  expect(GetScrollBarSize.getScrollBarSize(size, contentSize, minimumSliderSize)).toBe(0)
})

test('returns 0 when size is greater than contentSize', () => {
  const size = 150
  const contentSize = 100
  const minimumSliderSize = 10
  expect(GetScrollBarSize.getScrollBarSize(size, contentSize, minimumSliderSize)).toBe(0)
})

test('returns calculated size when it is greater than minimumSliderSize', () => {
  const size = 100
  const contentSize = 200
  const minimumSliderSize = 10
  const expected = Math.round(size ** 2 / contentSize)
  expect(GetScrollBarSize.getScrollBarSize(size, contentSize, minimumSliderSize)).toBe(expected)
  expect(expected).toBe(50)
})

test('returns minimumSliderSize when calculated size is less than minimumSliderSize', () => {
  const size = 50
  const contentSize = 1000
  const minimumSliderSize = 20
  const calculated = Math.round(size ** 2 / contentSize)
  expect(calculated).toBeLessThan(minimumSliderSize)
  expect(GetScrollBarSize.getScrollBarSize(size, contentSize, minimumSliderSize)).toBe(minimumSliderSize)
})

test('returns minimumSliderSize when calculated size equals minimumSliderSize', () => {
  const size = 100
  const contentSize = 500
  const minimumSliderSize = 20
  const calculated = Math.round(size ** 2 / contentSize)
  expect(calculated).toBe(minimumSliderSize)
  expect(GetScrollBarSize.getScrollBarSize(size, contentSize, minimumSliderSize)).toBe(minimumSliderSize)
})

test('handles small values correctly', () => {
  const size = 10
  const contentSize = 100
  const minimumSliderSize = 5
  const calculated = Math.round(size ** 2 / contentSize)
  expect(calculated).toBe(1)
  expect(calculated).toBeLessThan(minimumSliderSize)
  expect(GetScrollBarSize.getScrollBarSize(size, contentSize, minimumSliderSize)).toBe(minimumSliderSize)
})

test('handles large values correctly', () => {
  const size = 1000
  const contentSize = 2000
  const minimumSliderSize = 50
  const expected = Math.round(size ** 2 / contentSize)
  expect(GetScrollBarSize.getScrollBarSize(size, contentSize, minimumSliderSize)).toBe(expected)
  expect(expected).toBe(500)
})

test('handles minimumSliderSize of 0', () => {
  const size = 50
  const contentSize = 100
  const minimumSliderSize = 0
  const expected = Math.round(size ** 2 / contentSize)
  expect(GetScrollBarSize.getScrollBarSize(size, contentSize, minimumSliderSize)).toBe(expected)
  expect(expected).toBe(25)
})

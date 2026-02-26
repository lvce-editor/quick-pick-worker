import { expect, test } from '@jest/globals'
import * as ShouldHide from '../src/parts/ShouldHide/ShouldHide.ts'

test('returns false for AutoUpdater.checkForUpdates', () => {
  const result = ShouldHide.shouldHide({ id: 'AutoUpdater.checkForUpdates' })
  expect(result).toBe(false)
})

test('returns false for Viewlet.openWidget with QuickPick arg', () => {
  const result = ShouldHide.shouldHide({
    args: ['QuickPick'],
    id: 'Viewlet.openWidget',
  })
  expect(result).toBe(false)
})

test('returns true for Viewlet.openWidget with different arg', () => {
  const result = ShouldHide.shouldHide({
    args: ['OtherWidget'],
    id: 'Viewlet.openWidget',
  })
  expect(result).toBe(true)
})

test('returns true for Viewlet.openWidget with no args', () => {
  const result = ShouldHide.shouldHide({
    id: 'Viewlet.openWidget',
  })
  expect(result).toBe(true)
})

test('returns true for Viewlet.openWidget with empty args', () => {
  const result = ShouldHide.shouldHide({
    args: [],
    id: 'Viewlet.openWidget',
  })
  expect(result).toBe(true)
})

test('returns true for other id', () => {
  const result = ShouldHide.shouldHide({ id: 'SomeOtherCommand' })
  expect(result).toBe(true)
})

test('returns true for item with no id', () => {
  const result = ShouldHide.shouldHide({})
  expect(result).toBe(true)
})

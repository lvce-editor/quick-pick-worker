import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RenderFocusedIndex from '../src/parts/RenderFocusedIndex/RenderFocusedIndex.ts'
import * as RenderMethod from '../src/parts/RenderMethod/RenderMethod.ts'

test('renders focused index', () => {
  const oldState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    minLineY: 0,
  }
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 1,
    minLineY: 0,
  }
  expect(RenderFocusedIndex.renderFocusedIndex(oldState, newState)).toEqual(['Viewlet.send', 1, RenderMethod.SetFocusedIndex, 0, 1])
})

test('handles negative focused index', () => {
  const oldState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: -1,
    minLineY: 0,
  }
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    minLineY: 0,
  }
  expect(RenderFocusedIndex.renderFocusedIndex(oldState, newState)).toEqual(['Viewlet.send', 1, RenderMethod.SetFocusedIndex, -1, 0])
})

test('handles different uid', () => {
  const oldState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 1,
    minLineY: 0,
  }
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 2,
    minLineY: 0,
    uid: 2,
  }
  expect(RenderFocusedIndex.renderFocusedIndex(oldState, newState)).toEqual(['Viewlet.send', 2, RenderMethod.SetFocusedIndex, 1, 2])
})

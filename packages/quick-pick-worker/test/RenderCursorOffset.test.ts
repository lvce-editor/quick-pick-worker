import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RenderCursorOffset from '../src/parts/RenderCursorOffset/RenderCursorOffset.ts'
import * as RenderMethod from '../src/parts/RenderMethod/RenderMethod.ts'

test('renders cursor offset', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    cursorOffset: 5,
  }

  expect(RenderCursorOffset.renderCursorOffset(oldState, newState)).toEqual(['Viewlet.send', 1, RenderMethod.SetCursorOffset, 5])
})

test('renders cursor offset of 0', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    cursorOffset: 0,
  }

  expect(RenderCursorOffset.renderCursorOffset(oldState, newState)).toEqual(['Viewlet.send', 1, RenderMethod.SetCursorOffset, 0])
})

test('handles different uid', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    cursorOffset: 10,
    uid: 2,
  }

  expect(RenderCursorOffset.renderCursorOffset(oldState, newState)).toEqual(['Viewlet.send', 2, RenderMethod.SetCursorOffset, 10])
})

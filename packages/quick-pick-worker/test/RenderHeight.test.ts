import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RenderHeight from '../src/parts/RenderHeight/RenderHeight.ts'
import * as RenderMethod from '../src/parts/RenderMethod/RenderMethod.ts'

test('renders height', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    height: 100,
  }
  expect(RenderHeight.renderHeight(oldState, newState)).toEqual(['Viewlet.send', 1, RenderMethod.SetItemsHeight, 100])
})

test('renders default height when height is 0', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    height: 0,
  }
  expect(RenderHeight.renderHeight(oldState, newState)).toEqual(['Viewlet.send', 1, RenderMethod.SetItemsHeight, 20])
})

test('handles different uid', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    height: 200,
    uid: 2,
  }
  expect(RenderHeight.renderHeight(oldState, newState)).toEqual(['Viewlet.send', 2, RenderMethod.SetItemsHeight, 200])
})

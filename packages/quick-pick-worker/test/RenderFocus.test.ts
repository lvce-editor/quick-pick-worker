import { test, expect } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as RenderFocus from '../src/parts/RenderFocus/RenderFocus.ts'

test('renderFocus', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    focused: true,
  }

  const result = RenderFocus.renderFocus(oldState, newState)

  expect(result).toEqual(['Viewlet.focusElementByName', InputName.QuickPickInput])
})

test('renders focus when focused is true', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    focused: true,
  }

  const result = RenderFocus.renderFocus(oldState, newState)

  expect(result).toEqual(['Viewlet.focusElementByName', InputName.QuickPickInput])
})

test('renders focus when focused is false', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    focused: false,
  }

  const result = RenderFocus.renderFocus(oldState, newState)

  expect(result).toEqual(['Viewlet.focusElementByName', InputName.QuickPickInput])
})

test('handles different uid', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    focused: true,
    uid: 2,
  }

  const result = RenderFocus.renderFocus(oldState, newState)

  expect(result).toEqual(['Viewlet.focusElementByName', InputName.QuickPickInput])
})

import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as RenderValue from '../src/parts/RenderValue/RenderValue.ts'

test('renders value', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    value: 'test value',
  }

  expect(RenderValue.renderValue(oldState, newState)).toEqual(['Viewlet.setValueByName', InputName.QuickPickInput, 'test value'])
})

test('renders empty value', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    value: '',
  }

  expect(RenderValue.renderValue(oldState, newState)).toEqual(['Viewlet.setValueByName', InputName.QuickPickInput, ''])
})

test('handles different values', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    value: 'another value',
  }

  expect(RenderValue.renderValue(oldState, newState)).toEqual(['Viewlet.setValueByName', InputName.QuickPickInput, 'another value'])
})

test('handles special characters in value', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    value: 'test@example.com',
  }

  expect(RenderValue.renderValue(oldState, newState)).toEqual(['Viewlet.setValueByName', InputName.QuickPickInput, 'test@example.com'])
})

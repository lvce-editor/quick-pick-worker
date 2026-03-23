import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RenderItems from '../src/parts/RenderItems/RenderItems.ts'

const getItem = (
  label: string,
): { description: string; direntType: number; fileIcon: string; icon: string; label: string; matches: number[]; uri: string } => {
  return {
    description: `${label} description`,
    direntType: 0,
    fileIcon: '',
    icon: '',
    label,
    matches: [0],
    uri: `file:///test/${label}`,
  }
}

test('renders items with virtual dom', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    items: [getItem('item-1')],
    maxLineY: 1,
  }
  const result = RenderItems.renderItems(oldState, newState)
  expect(result[0]).toBe('Viewlet.setDom2')
  expect(result[1]).toBeDefined()
})

test('renders empty items state', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    items: [],
  }
  const result = RenderItems.renderItems(oldState, newState)
  expect(result[0]).toBe('Viewlet.setDom2')
  expect(result[1]).toBeDefined()
})

test('renders items with scroll bar', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const items = Array.from({ length: 100 }, (_, index) => getItem(`item-${index}`))
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    items,
    maxLineY: 10,
  }
  const result = RenderItems.renderItems(oldState, newState)
  expect(result[0]).toBe('Viewlet.setDom2')
  expect(result[1]).toBeDefined()
})

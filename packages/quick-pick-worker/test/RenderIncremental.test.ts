import { expect, test } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RenderIncremental from '../src/parts/RenderIncremental/RenderIncremental.ts'

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

test('returns patches for changed items', () => {
  const oldState = {
    ...CreateDefaultState.createDefaultState(),
    items: [getItem('before')],
    maxLineY: 1,
    uid: 1,
  }
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    items: [getItem('after')],
    maxLineY: 1,
    uid: 1,
  }

  const result = RenderIncremental.renderIncremental(oldState, newState)

  expect(result[0]).toBe(ViewletCommand.SetPatches)
  expect(result[1]).toBe(1)
  expect(Array.isArray(result[2])).toBe(true)
  expect((result[2] as readonly unknown[]).length).toBeGreaterThan(0)
})

test('returns empty patches for same state', () => {
  const oldState = {
    ...CreateDefaultState.createDefaultState(),
    items: [getItem('same')],
    maxLineY: 1,
    uid: 1,
  }
  const newState = {
    ...oldState,
  }

  const result = RenderIncremental.renderIncremental(oldState, newState)

  expect(result[0]).toBe(ViewletCommand.SetPatches)
  expect(result[1]).toBe(1)
  expect(result[2]).toEqual([])
})

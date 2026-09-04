import { expect, test } from '@jest/globals'
import * as CollectWarnings from '../src/parts/CollectWarnings/CollectWarnings.ts'

test('returns no warnings for valid items', () => {
  expect(CollectWarnings.collectWarnings([{ id: 'git.openFile', label: 'Git: Open File' }])).toEqual([])
})

test('collects a warning for one missing label', () => {
  expect(CollectWarnings.collectWarnings([{ id: 'git.openFile' }])).toEqual(['command git.openFile has missing label'])
})

test('collects one warning for multiple missing labels', () => {
  const items = [{ id: 'git.openFile' }, { id: 'git.stage' }, { id: 'git.unstage' }]

  expect(CollectWarnings.collectWarnings(items)).toEqual(['command git.openFile and 2 other commands have missing label'])
})

test('uses singular command for one other command', () => {
  const items = [{ id: 'git.openFile' }, { id: 'git.stage' }]

  expect(CollectWarnings.collectWarnings(items)).toEqual(['command git.openFile and 1 other command have missing label'])
})

test('collects a warning for missing ids', () => {
  const items = [{ label: 'Git: Open File' }, { label: 'Git: Stage' }]

  expect(CollectWarnings.collectWarnings(items)).toEqual(['command Git: Open File and 1 other command have missing id'])
})

test('collects label and id warnings separately', () => {
  expect(CollectWarnings.collectWarnings([{}])).toEqual(['command <unknown> has missing label', 'command <unknown> has missing id'])
})

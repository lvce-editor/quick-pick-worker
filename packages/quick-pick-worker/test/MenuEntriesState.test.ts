import { beforeEach, expect, test } from '@jest/globals'
import * as MenuEntriesState from '../src/parts/MenuEntriesState/MenuEntriesState.ts'

beforeEach(() => {
  MenuEntriesState.clear()
})

test.skip('getAll - returns empty array by default', () => {
  expect(MenuEntriesState.getAll()).toEqual([])
})

test.skip('add - adds menu entries to state', () => {
  const menuEntries = [
    { id: 1, label: 'Entry 1' },
    { id: 2, label: 'Entry 2' },
  ]
  MenuEntriesState.add(menuEntries)
  expect(MenuEntriesState.getAll()).toEqual(menuEntries)
})

test.skip('add - preserves existing entries when adding new ones', () => {
  const firstEntries = [{ id: 1, label: 'Entry 1' }]
  const secondEntries = [{ id: 2, label: 'Entry 2' }]

  MenuEntriesState.add(firstEntries)
  MenuEntriesState.add(secondEntries)

  expect(MenuEntriesState.getAll()).toEqual([...firstEntries, ...secondEntries])
})

test.skip('add - handles empty array', () => {
  const menuEntries = [{ id: 1, label: 'Entry 1' }]
  MenuEntriesState.add(menuEntries)
  MenuEntriesState.add([])
  expect(MenuEntriesState.getAll()).toEqual(menuEntries)
})

test.skip('getAll - returns readonly array', () => {
  const menuEntries = [{ id: 1, label: 'Entry 1' }]
  MenuEntriesState.add(menuEntries)
  const result = MenuEntriesState.getAll()
  expect(Object.isFrozen(result)).toBe(true)
})

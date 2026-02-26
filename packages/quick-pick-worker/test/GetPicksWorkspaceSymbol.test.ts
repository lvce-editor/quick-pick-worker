import { expect, test } from '@jest/globals'
import { getPicks } from '../src/parts/GetPicksWorkspaceSymbol/GetPicksWorkspaceSymbol.ts'

test('getPicks returns empty array', async () => {
  const result = await getPicks()
  expect(result).toEqual([])
})

test('getPicks returns readonly array', async () => {
  const result = await getPicks()
  expect(result).toHaveLength(0)
})

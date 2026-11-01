import { expect, test } from '@jest/globals'
import { getPicks } from '../src/parts/GetPicksIndentation/GetPicksIndentation.ts'

test('returns spaces and tabs choices', async () => {
  await expect(getPicks()).resolves.toEqual([
    expect.objectContaining({ label: 'Indent Using Spaces', value: true }),
    expect.objectContaining({ label: 'Indent Using Tabs', value: false }),
  ])
})

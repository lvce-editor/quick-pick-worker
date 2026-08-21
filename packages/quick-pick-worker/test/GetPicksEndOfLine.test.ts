import { expect, test } from '@jest/globals'
import { getPicks } from '../src/parts/GetPicksEndOfLine/GetPicksEndOfLine.ts'

test('returns LF and CRLF choices', async () => {
  await expect(getPicks()).resolves.toEqual([
    expect.objectContaining({ label: 'LF', value: 'lf' }),
    expect.objectContaining({ label: 'CRLF', value: 'crlf' }),
  ])
})

import { expect, test } from '@jest/globals'
import * as GetPicksCustom from '../src/parts/GetPicksCustom/GetPicksCustom.ts'

test('getPicks returns custom items from args', async () => {
  const customItems = [{ label: 'Custom Item 1' }, { label: 'Custom Item 2' }, { label: 'Custom Item 3' }]
  const args: readonly unknown[] = ['search', customItems]

  const result = await GetPicksCustom.getPicks('search', args)

  expect(result).toHaveLength(3)
  expect(result[0]).toEqual({
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: 'Custom Item 1',
    matches: [],
    uri: '',
  })
  expect(result[1].label).toBe('Custom Item 2')
  expect(result[2].label).toBe('Custom Item 3')
})

test('getPicks returns empty array when args[1] is missing', async () => {
  const args: readonly unknown[] = ['search']

  const result = await GetPicksCustom.getPicks('search', args)

  expect(result).toEqual([])
})

test('getPicks returns empty array when args[1] is empty', async () => {
  const args: readonly unknown[] = ['search', []]

  const result = await GetPicksCustom.getPicks('search', args)

  expect(result).toEqual([])
})

test('getPicks handles items without label', async () => {
  const customItems = [{ label: 'Item 1' }, {}, { label: 'Item 3' }]
  const args: readonly unknown[] = ['search', customItems]

  const result = await GetPicksCustom.getPicks('search', args)

  expect(result).toHaveLength(3)
  expect(result[0].label).toBe('Item 1')
  expect(result[1].label).toBeUndefined()
  expect(result[2].label).toBe('Item 3')
})

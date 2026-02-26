import { expect, test } from '@jest/globals'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import * as GetProtoVisibleQuickPickItems from '../src/parts/GetProtoVisibleQuickPickItems/GetProtoVisibleQuickPickItems.ts'

test('returns empty array when items is empty', () => {
  const items: readonly unknown[] = []
  const icons: readonly string[] = []
  const result = GetProtoVisibleQuickPickItems.getVisible(items, 0, 0, icons)
  expect(result).toEqual([])
})

test('slices items correctly with matching icons', () => {
  const items: readonly unknown[] = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item1', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item2', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item3', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item4', matches: [], uri: '' },
  ]
  const icons: readonly string[] = ['icon1', 'icon2', 'icon3', 'icon4']
  const result = GetProtoVisibleQuickPickItems.getVisible(items, 1, 3, icons)
  expect(result).toHaveLength(2)
  expect(result[0].label).toBe('item2')
  expect(result[0].fileIcon).toBe('icon1')
  expect(result[1].label).toBe('item3')
  expect(result[1].fileIcon).toBe('icon2')
})

test('handles minLineY at start', () => {
  const items: readonly unknown[] = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item1', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item2', matches: [], uri: '' },
  ]
  const icons: readonly string[] = ['icon1', 'icon2']
  const result = GetProtoVisibleQuickPickItems.getVisible(items, 0, 2, icons)
  expect(result).toHaveLength(2)
  expect(result[0].label).toBe('item1')
  expect(result[0].fileIcon).toBe('icon1')
  expect(result[1].label).toBe('item2')
  expect(result[1].fileIcon).toBe('icon2')
})

test('handles maxLineY at end', () => {
  const items: readonly unknown[] = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item1', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item2', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item3', matches: [], uri: '' },
  ]
  const icons: readonly string[] = ['icon1', 'icon2', 'icon3']
  const result = GetProtoVisibleQuickPickItems.getVisible(items, 1, 3, icons)
  expect(result).toHaveLength(2)
  expect(result[0].label).toBe('item2')
  expect(result[1].label).toBe('item3')
})

test('handles minLineY equals maxLineY', () => {
  const items: readonly unknown[] = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item1', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item2', matches: [], uri: '' },
  ]
  const icons: readonly string[] = ['icon1']
  const result = GetProtoVisibleQuickPickItems.getVisible(items, 1, 1, icons)
  expect(result).toEqual([])
})

test('handles icons array shorter than slice', () => {
  const items: readonly unknown[] = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item1', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item2', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item3', matches: [], uri: '' },
  ]
  const icons: readonly string[] = ['icon1']
  const result = GetProtoVisibleQuickPickItems.getVisible(items, 0, 3, icons)
  expect(result).toHaveLength(3)
  expect(result[0].fileIcon).toBe('icon1')
  expect(result[1].fileIcon).toBeUndefined()
  expect(result[2].fileIcon).toBeUndefined()
})

test('handles icons array longer than slice', () => {
  const items: readonly unknown[] = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item1', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item2', matches: [], uri: '' },
  ]
  const icons: readonly string[] = ['icon1', 'icon2', 'icon3', 'icon4']
  const result = GetProtoVisibleQuickPickItems.getVisible(items, 0, 2, icons)
  expect(result).toHaveLength(2)
  expect(result[0].fileIcon).toBe('icon1')
  expect(result[1].fileIcon).toBe('icon2')
})

test('preserves all item properties', () => {
  const items: readonly unknown[] = [
    {
      description: 'desc1',
      direntType: 2,
      extraProp: 'extra',
      fileIcon: 'oldIcon',
      icon: 'icon1',
      label: 'item1',
      matches: [1, 2],
      uri: 'uri1',
    },
  ]
  const icons: readonly string[] = ['newIcon']
  const result = GetProtoVisibleQuickPickItems.getVisible(items, 0, 1, icons)
  expect(result).toHaveLength(1)
  expect(result[0].label).toBe('item1')
  expect(result[0].description).toBe('desc1')
  expect(result[0].direntType).toBe(2)
  expect(result[0].fileIcon).toBe('newIcon')
  expect(result[0].icon).toBe('icon1')
  expect(result[0].matches).toEqual([1, 2])
  expect(result[0].uri).toBe('uri1')
  expect((result[0] as ProtoVisibleItem & { readonly extraProp: string }).extraProp).toBe('extra')
})

test('handles empty icons array', () => {
  const items: readonly unknown[] = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item1', matches: [], uri: '' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item2', matches: [], uri: '' },
  ]
  const icons: readonly string[] = []
  const result = GetProtoVisibleQuickPickItems.getVisible(items, 0, 2, icons)
  expect(result).toHaveLength(2)
  expect(result[0].fileIcon).toBeUndefined()
  expect(result[1].fileIcon).toBeUndefined()
})

test('handles single item', () => {
  const items: readonly unknown[] = [{ description: '', direntType: 1, fileIcon: '', icon: '', label: 'item1', matches: [], uri: '' }]
  const icons: readonly string[] = ['icon1']
  const result = GetProtoVisibleQuickPickItems.getVisible(items, 0, 1, icons)
  expect(result).toHaveLength(1)
  expect(result[0].label).toBe('item1')
  expect(result[0].fileIcon).toBe('icon1')
})

test('handles large range', () => {
  const items: readonly unknown[] = Array.from({ length: 100 }, (_, i) => ({
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: `item${i}`,
    matches: [],
    uri: '',
  }))
  const icons: readonly string[] = Array.from({ length: 50 }, (_, i) => `icon${i}`)
  const result = GetProtoVisibleQuickPickItems.getVisible(items, 10, 60, icons)
  expect(result).toHaveLength(50)
  expect(result[0].label).toBe('item10')
  expect(result[0].fileIcon).toBe('icon0')
  expect(result[49].label).toBe('item59')
  expect(result[49].fileIcon).toBe('icon49')
})

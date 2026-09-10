import { beforeEach, expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as VirtualList from '../src/parts/VirtualList/VirtualList.ts'

beforeEach(() => {
  RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': () => '',
    'IconTheme.getFolderIcon': () => '',
  })
})

test('create returns virtual list with default values', () => {
  const result = VirtualList.create({
    headerHeight: 38,
    itemHeight: 30,
    minimumSliderSize: 20,
  })
  expect(result.deltaY).toBe(0)
  expect(result.finalDeltaY).toBe(0)
  expect(result.focusedIndex).toBe(-1)
  expect(result.headerHeight).toBe(38)
  expect(result.itemHeight).toBe(30)
  expect(result.items).toEqual([])
  expect(result.maxLineY).toBe(0)
  expect(result.minimumSliderSize).toBe(20)
  expect(result.minLineY).toBe(0)
  expect(result.scrollBarActive).toBe(false)
  expect(result.scrollBarHeight).toBe(0)
  expect(result.touchDifference).toBe(0)
  expect(result.touchOffsetY).toBe(0)
  expect(result.touchTimeStamp).toBe(0)
})

test('create uses default headerHeight when not provided', () => {
  const result = VirtualList.create({
    itemHeight: 30,
    minimumSliderSize: 20,
  })
  expect(result.headerHeight).toBe(0)
})

test('create uses default minimumSliderSize when not provided', () => {
  const result = VirtualList.create({
    headerHeight: 38,
    itemHeight: 30,
  })
  expect(result.minimumSliderSize).toBe(20)
})

test('setDeltaY returns same state when deltaY is unchanged', async () => {
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 0,
    headerHeight: 38,
    height: 300,
    itemHeight: 30,
    items: [],
  }
  const result = await VirtualList.setDeltaY(state, 0)
  expect(result).toBe(state)
})

test('setDeltaY sets deltaY and calculates minLineY and maxLineY', async () => {
  const items = Array.from({ length: 20 }, (_, i) => ({
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: `item${i}`,
    matches: [],
    uri: `/item${i}`,
  }))
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 0,
    headerHeight: 38,
    height: 300,
    itemHeight: 30,
    items,
  }
  const result = await VirtualList.setDeltaY(state, 30)
  expect(result.deltaY).toBe(30)
  expect(result.minLineY).toBe(1)
  expect(result.maxLineY).toBeGreaterThan(1)
})

test('setDeltaY clamps deltaY to 0 when negative', async () => {
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 0,
    headerHeight: 38,
    height: 300,
    itemHeight: 30,
    items: [{ description: '', direntType: 1, fileIcon: '', icon: '', label: 'item1', matches: [], uri: '/item1' }],
  }
  const result = await VirtualList.setDeltaY(state, -10)
  expect(result.deltaY).toBe(0)
  expect(result.minLineY).toBe(0)
})

test('setDeltaY clamps deltaY to finalDeltaY when exceeding maximum', async () => {
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 0,
    headerHeight: 38,
    height: 300,
    itemHeight: 30,
    items: [
      { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item1', matches: [], uri: '/item1' },
      { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item2', matches: [], uri: '/item2' },
    ],
  }
  const listHeight = 300 - 38
  const finalDeltaY = 2 * 30 - listHeight
  const result = await VirtualList.setDeltaY(state, finalDeltaY + 100)
  expect(result.deltaY).toBe(Math.max(finalDeltaY, 0))
})

test('setDeltaY handles empty items list', async () => {
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 0,
    headerHeight: 38,
    height: 300,
    itemHeight: 30,
    items: [],
  }
  const result = await VirtualList.setDeltaY(state, 50)
  expect(result.deltaY).toBe(0)
  expect(result.minLineY).toBe(0)
  expect(result.maxLineY).toBeGreaterThanOrEqual(0)
})

test('setDeltaY calculates correct minLineY and maxLineY for many items', async () => {
  const items = Array.from({ length: 100 }, (_, i) => ({
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: `item${i}`,
    matches: [],
    uri: `/item${i}`,
  }))
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 0,
    headerHeight: 38,
    height: 300,
    itemHeight: 30,
    items,
  }
  const result = await VirtualList.setDeltaY(state, 150)
  expect(result.deltaY).toBe(150)
  expect(result.minLineY).toBe(5)
  expect(result.maxLineY).toBeGreaterThan(result.minLineY)
})

test('setDeltaY handles zero headerHeight', async () => {
  const items = Array.from({ length: 20 }, (_, i) => ({
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: `item${i}`,
    matches: [],
    uri: `/item${i}`,
  }))
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 0,
    headerHeight: 0,
    height: 300,
    itemHeight: 30,
    items,
  }
  const result = await VirtualList.setDeltaY(state, 30)
  expect(result.deltaY).toBe(30)
  expect(result.minLineY).toBeGreaterThanOrEqual(0)
})

test('setDeltaY handles very small height', async () => {
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 0,
    headerHeight: 40,
    height: 50,
    itemHeight: 30,
    items: [
      { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item1', matches: [], uri: '/item1' },
      { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item2', matches: [], uri: '/item2' },
    ],
  }
  const result = await VirtualList.setDeltaY(state, 30)
  expect(result.deltaY).toBeGreaterThanOrEqual(0)
  expect(result.minLineY).toBeGreaterThanOrEqual(0)
})

test('setDeltaY handles large itemHeight', async () => {
  const items = Array.from({ length: 10 }, (_, i) => ({
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: `item${i}`,
    matches: [],
    uri: `/item${i}`,
  }))
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 0,
    headerHeight: 38,
    height: 300,
    itemHeight: 100,
    items,
  }
  const result = await VirtualList.setDeltaY(state, 50)
  expect(result.deltaY).toBe(50)
  expect(result.minLineY).toBe(Math.round(50 / 100))
})

test('setDeltaY handles deltaY at exact finalDeltaY', async () => {
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 0,
    headerHeight: 38,
    height: 300,
    itemHeight: 30,
    items: [
      { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item1', matches: [], uri: '/item1' },
      { description: '', direntType: 1, fileIcon: '', icon: '', label: 'item2', matches: [], uri: '/item2' },
    ],
  }
  const listHeight = 300 - 38
  const finalDeltaY = 2 * 30 - listHeight
  const result = await VirtualList.setDeltaY(state, finalDeltaY)
  expect(result.deltaY).toBe(Math.max(finalDeltaY, 0))
})

test('handleWheel adds deltaY to current deltaY', async () => {
  const items = Array.from({ length: 20 }, (_, i) => ({
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: `item${i}`,
    matches: [],
    uri: `/item${i}`,
  }))
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 10,
    headerHeight: 38,
    height: 300,
    itemHeight: 30,
    items,
  }
  const result = await VirtualList.handleWheel(state, 0, 20)
  expect(result.deltaY).toBe(30)
})

test('handleWheel handles negative deltaY', async () => {
  const items = Array.from({ length: 20 }, (_, i) => ({
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: `item${i}`,
    matches: [],
    uri: `/item${i}`,
  }))
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 50,
    headerHeight: 38,
    height: 300,
    itemHeight: 30,
    items,
  }
  const result = await VirtualList.handleWheel(state, 0, -20)
  expect(result.deltaY).toBe(30)
})

test('handleWheel clamps result when exceeding bounds', async () => {
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 0,
    headerHeight: 38,
    height: 300,
    itemHeight: 30,
    items: [{ description: '', direntType: 1, fileIcon: '', icon: '', label: 'item1', matches: [], uri: '/item1' }],
  }
  const result = await VirtualList.handleWheel(state, 0, 1000)
  const listHeight = 300 - 38
  const finalDeltaY = 1 * 30 - listHeight
  expect(result.deltaY).toBe(Math.max(finalDeltaY, 0))
})

test('handleWheel handles different deltaMode values', async () => {
  const items = Array.from({ length: 20 }, (_, i) => ({
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: `item${i}`,
    matches: [],
    uri: `/item${i}`,
  }))
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 10,
    headerHeight: 38,
    height: 300,
    itemHeight: 30,
    items,
  }
  const result1 = await VirtualList.handleWheel(state, 0, 20)
  const result2 = await VirtualList.handleWheel(state, 1, 20)
  const result3 = await VirtualList.handleWheel(state, 2, 20)
  expect(result1.deltaY).toBe(30)
  expect(result2.deltaY).toBe(30)
  expect(result3.deltaY).toBe(30)
})

test('handleWheel with zero deltaY returns updated state', async () => {
  const items = Array.from({ length: 20 }, (_, i) => ({
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: `item${i}`,
    matches: [],
    uri: `/item${i}`,
  }))
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 10,
    headerHeight: 38,
    height: 300,
    itemHeight: 30,
    items,
  }
  const result = await VirtualList.handleWheel(state, 0, 0)
  expect(result.deltaY).toBe(10)
})

test('setDeltaY preserves other state properties', async () => {
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 0,
    focusedIndex: 5,
    headerHeight: 38,
    height: 300,
    itemHeight: 30,
    items: [{ description: '', direntType: 1, fileIcon: '', icon: '', label: 'item1', matches: [], uri: '/item1' }],
    value: 'test',
  }
  const result = await VirtualList.setDeltaY(state, 30)
  expect(result.focusedIndex).toBe(5)
  expect(result.value).toBe('test')
  expect(result.height).toBe(300)
  expect(result.headerHeight).toBe(38)
  expect(result.itemHeight).toBe(30)
})

test('handleWheel preserves other state properties', async () => {
  const items = Array.from({ length: 20 }, (_, i) => ({
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: `item${i}`,
    matches: [],
    uri: `/item${i}`,
  }))
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 10,
    focusedIndex: 3,
    headerHeight: 38,
    height: 300,
    itemHeight: 30,
    items,
    value: 'search',
  }
  const result = await VirtualList.handleWheel(state, 0, 20)
  expect(result.focusedIndex).toBe(3)
  expect(result.value).toBe('search')
  expect(result.height).toBe(300)
})

test('setDeltaY handles fractional itemHeight correctly', async () => {
  const items = Array.from({ length: 20 }, (_, i) => ({
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: `item${i}`,
    matches: [],
    uri: `/item${i}`,
  }))
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 0,
    headerHeight: 38,
    height: 300,
    itemHeight: 30.5,
    items,
  }
  const result = await VirtualList.setDeltaY(state, 30.5)
  expect(result.deltaY).toBe(30.5)
  expect(result.minLineY).toBeGreaterThanOrEqual(0)
})

test('setDeltaY handles very large number of items', async () => {
  const items = Array.from({ length: 1000 }, (_, i) => ({
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: `item${i}`,
    matches: [],
    uri: `/item${i}`,
  }))
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 0,
    headerHeight: 38,
    height: 300,
    itemHeight: 30,
    items,
  }
  const result = await VirtualList.setDeltaY(state, 5000)
  const listHeight = 300 - 38
  const finalDeltaY = 1000 * 30 - listHeight
  expect(result.deltaY).toBe(Math.min(5000, Math.max(finalDeltaY, 0)))
  expect(result.minLineY).toBeGreaterThanOrEqual(0)
  expect(result.deltaY).toBeLessThanOrEqual(Math.max(finalDeltaY, 0))
})

test('setDeltaY handles headerHeight equal to height', async () => {
  const items = Array.from({ length: 20 }, (_, i) => ({
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: `item${i}`,
    matches: [],
    uri: `/item${i}`,
  }))
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 0,
    headerHeight: 300,
    height: 300,
    itemHeight: 30,
    items,
  }
  const listHeight = 0
  const finalDeltaY = items.length * 30 - listHeight
  const result = await VirtualList.setDeltaY(state, 30)
  expect(result.deltaY).toBe(Math.min(30, Math.max(finalDeltaY, 0)))
})

test('setDeltaY handles headerHeight greater than height', async () => {
  const items = Array.from({ length: 20 }, (_, i) => ({
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: `item${i}`,
    matches: [],
    uri: `/item${i}`,
  }))
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 0,
    headerHeight: 300,
    height: 200,
    itemHeight: 30,
    items,
  }
  const listHeight = 200 - 300
  const finalDeltaY = items.length * 30 - listHeight
  const result = await VirtualList.setDeltaY(state, 30)
  expect(result.deltaY).toBe(Math.min(30, Math.max(finalDeltaY, 0)))
})

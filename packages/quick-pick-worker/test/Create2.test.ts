import { expect, test } from '@jest/globals'
import * as Create2 from '../src/parts/Create2/Create2.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as MinimumSliderSize from '../src/parts/MinimumSliderSize/MinimumSliderSize.ts'
import * as QuickPickOpenState from '../src/parts/QuickPickOpenState/QuickPickOpenState.ts'
import * as QuickPickStates from '../src/parts/QuickPickStates/QuickPickStates.ts'

test('create calls QuickPickStates.set with correct state', () => {
  const uid = 123
  const uri = 'file:///test/path'
  const listItemHeight = 40
  const x = 100
  const y = 200
  const width = 800
  const height = 400
  const platform = 1
  const args = ['arg1', 'arg2']
  const workspaceUri = 'file:///workspace'

  Create2.create(uid, uri, listItemHeight, x, y, width, height, platform, args, workspaceUri, '')

  const { newState } = QuickPickStates.get(uid)
  expect(newState).toBeDefined()
  expect(newState?.uid).toBe(uid)
  expect(newState?.uri).toBe(uri)
  expect(newState?.workspaceUri).toBe(workspaceUri)
  expect(newState?.args).toBe(args)
  expect(newState?.platform).toBe(platform)
  expect(newState?.itemHeight).toBe(listItemHeight)
  expect(newState?.headerHeight).toBe(38)
  expect(newState?.minimumSliderSize).toBe(MinimumSliderSize.minimumSliderSize)
  expect(newState?.inputSource).toBe(InputSource.User)
  expect(newState?.state).toBe(QuickPickOpenState.Default)
  expect(newState?.cursorOffset).toBe(0)
  expect(newState?.height).toBe(300)
  expect(newState?.width).toBe(600)
  expect(newState?.top).toBe(50)
  expect(newState?.focused).toBe(false)
  expect(newState?.value).toBe('')
  expect(newState?.picks).toEqual([])
  expect(newState?.recentPicks).toEqual([])
  expect(newState?.icons).toEqual([])
  expect(newState?.warned).toEqual([])
  expect(newState?.versionId).toBe(0)
  expect(newState?.maxVisibleItems).toBe(12)
  expect(newState?.fileIconCache).toEqual(Object.create(null))
  expect(newState?.recentPickIds).toEqual(Object.create(null))
})

test('create sets virtual list properties correctly', () => {
  const uid = 456
  const listItemHeight = 50

  Create2.create(uid, '', listItemHeight, 0, 0, 0, 0, 0, [], '', '')

  const { newState } = QuickPickStates.get(uid)
  expect(newState).toBeDefined()
  expect(newState?.itemHeight).toBe(listItemHeight)
  expect(newState?.headerHeight).toBe(38)
  expect(newState?.minimumSliderSize).toBe(MinimumSliderSize.minimumSliderSize)
  expect(newState?.deltaY).toBe(0)
  expect(newState?.finalDeltaY).toBe(0)
  expect(newState?.focusedIndex).toBe(-1)
  expect(newState?.items).toEqual([])
  expect(newState?.maxLineY).toBe(0)
  expect(newState?.minLineY).toBe(0)
  expect(newState?.scrollBarActive).toBe(false)
  expect(newState?.scrollBarHeight).toBe(0)
  expect(newState?.touchDifference).toBe(0)
  expect(newState?.touchOffsetY).toBe(0)
  expect(newState?.touchTimeStamp).toBe(0)
})

test('create handles different uid values', () => {
  const uid1 = 789
  const uid2 = 790

  Create2.create(uid1, 'uri1', 30, 0, 0, 0, 0, 0, [], 'workspace1', '')
  Create2.create(uid2, 'uri2', 30, 0, 0, 0, 0, 0, [], 'workspace2', '')

  const { newState: state1 } = QuickPickStates.get(uid1)
  const { newState: state2 } = QuickPickStates.get(uid2)

  expect(state1).toBeDefined()
  expect(state1?.uid).toBe(uid1)
  expect(state1?.uri).toBe('uri1')
  expect(state1?.workspaceUri).toBe('workspace1')

  expect(state2).toBeDefined()
  expect(state2?.uid).toBe(uid2)
  expect(state2?.uri).toBe('uri2')
  expect(state2?.workspaceUri).toBe('workspace2')
})
